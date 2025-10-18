import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Heart, Save, Share2, ArrowLeft, Play, Pause, Maximize, Minimize } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Template {
  id: string;
  title: string;
  slug?: string; // Optional for backward compatibility
  description: string;
  thumbnail_url: string;
  video_preview_url: string;
  capcut_url: string;
  editor: string;
  duration_seconds: number;
  downloads_count: number;
  likes_count: number;
  created_at: string;
}

const TemplateDetail = () => {
  const { id, slug } = useParams(); // Get both parameters
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState('16/9');
  const [inWishlist, setInWishlist] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const identifier = slug || id; // Use slug if available, fallback to id
      if (!identifier) return;
      
      try {
        let query = supabase.from('templates').select('*');
        
        // 🔥 Smart query: try slug first, then ID
        if (slug) {
          query = query.eq('slug', slug);
        } else if (id) {
          query = query.eq('id', id);
        }
        
        const { data, error } = await query.single();

        if (error) {
          console.error('Error fetching template:', error);
          throw error;
        }

        setTemplate(data);

        // Update page title with template name
        if (data) {
          document.title = `${data.title} - CapCut Template | VYRIC`;
        }
        
        // Check if in wishlist
        if (user && data) {
          const { data: wishlistData } = await supabase
            .from('user_wishlist')
            .select('id')
            .eq('user_id', user.id)
            .eq('template_id', data.id)
            .single();
          
          setInWishlist(!!wishlistData);
        }
      } catch (error) {
        console.error('Error fetching template:', error);
        setTemplate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, slug, user]);

  const getEditorInfo = (editor: string) => {
    switch (editor?.toLowerCase()) {
      case 'vn':
        return {
          name: 'VN Video Editor',
          buttonText: 'Edit in VN',
          color: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'aftereffects':
        return {
          name: 'After Effects',
          buttonText: 'Edit in AE',
          color: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          name: 'CapCut',
          buttonText: 'Edit in CapCut',
          color: 'bg-black hover:bg-gray-800'
        };
    }
  };

  const handleDownload = async () => {
    if (!template?.capcut_url) {
      toast({
        title: "No CapCut Link",
        description: "This template doesn't have a CapCut link available.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Track download in database
      if (user) {
        await supabase
          .from('template_downloads')
          .insert([
            { 
              user_id: user.id, 
              template_id: template.id,
              downloaded_at: new Date().toISOString()
            }
          ]);
      }

      // Open CapCut URL
      window.open(template.capcut_url, '_blank');
      
      toast({
        title: "Opening in CapCut",
        description: "Template is being opened in the CapCut app.",
      });
    } catch (error) {
      console.error('Error:', error);
      window.open(template.capcut_url, '_blank');
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save templates to your wishlist.",
        variant: "destructive",
      });
      return;
    }

    if (!template) return;

    try {
      if (inWishlist) {
        await supabase
          .from('user_wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('template_id', template.id);
        
        setInWishlist(false);
        toast({
          title: "Removed from wishlist",
          description: "Template removed from your wishlist.",
        });
      } else {
        await supabase
          .from('user_wishlist')
          .insert([
            { user_id: user.id, template_id: template.id }
          ]);
        
        setInWishlist(true);
        toast({
          title: "Added to wishlist",
          description: "Template saved to your wishlist.",
        });
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (container) {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleVideoLoad = () => {
    const video = videoRef.current;
    if (video) {
      const ratio = video.videoWidth / video.videoHeight;
      if (ratio > 1.7) {
        setVideoAspectRatio('16/9');
      } else if (ratio > 1.2) {
        setVideoAspectRatio('4/3');
      } else if (ratio < 0.8) {
        setVideoAspectRatio('9/16');
      } else {
        setVideoAspectRatio('1/1');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: template?.title,
          text: `Check out this ${template?.editor} template: ${template?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Template link copied to clipboard.",
        });
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Templates
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const editorInfo = getEditorInfo(template.editor);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div 
                ref={containerRef}
                className="relative bg-black flex items-center justify-center"
                style={{ aspectRatio: videoAspectRatio }}
              >
                {template.video_preview_url ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain"
                      poster={template.thumbnail_url}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onLoadedMetadata={handleVideoLoad}
                      controls={false}
                      loop
                      style={{ aspectRatio: videoAspectRatio }}
                    >
                      <source src={template.video_preview_url} type="video/mp4" />
                    </video>
                    
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={toggleVideo}
                          size="lg"
                          className="bg-black/70 hover:bg-black/90 text-white rounded-full p-4"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </Button>
                        
                        <Button
                          onClick={toggleFullscreen}
                          size="lg"
                          className="bg-black/70 hover:bg-black/90 text-white rounded-full p-4"
                        >
                          {isFullscreen ? (
                            <Minimize className="h-4 w-4" />
                          ) : (
                            <Maximize className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={template.thumbnail_url}
                    alt={template.title}
                    className="w-full h-full object-contain"
                    style={{ aspectRatio: videoAspectRatio }}
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Template Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{template.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="px-2 py-1 bg-secondary rounded">{editorInfo.name}</span>
                <span>Duration: {Math.floor((template.duration_seconds || 15) / 60)}:{((template.duration_seconds || 15) % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Download Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Free Download</h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Download className="mr-1 h-4 w-4" />
                    {(template.downloads_count || 0).toLocaleString()}
                  </div>
                </div>
                
                <Button 
                  onClick={handleDownload}
                  className={`w-full h-12 text-lg text-white ${editorInfo.color}`}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {editorInfo.buttonText}
                </Button>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${inWishlist ? 'fill-current text-red-500' : ''}`} />
                    {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                  </Button>
                  
                  <Button variant="outline" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Like ({template.likes_count || 0})
                  </Button>
                  
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {template.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Creator Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Creator</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    V
                  </div>
                  <div>
                    <div className="font-medium">VYRIC</div>
                    <div className="text-sm text-muted-foreground">Template Creator</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TemplateDetail;
