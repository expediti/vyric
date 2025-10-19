import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Download, Eye, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  id?: string;
  title: string;
  editor: string;
  image?: string; // Thumbnail
  videoPreview?: string; // Video preview URL
  downloads?: number;
  likes?: number;
  duration?: string;
  tags?: string[];
}

const TemplateCard = ({
  id = '1',
  title,
  editor,
  image,
  videoPreview,
  downloads = 0,
  likes = 0,
  duration = "0:15",
  tags = []
}: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoPreview) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card
      className="relative group hover:shadow-xl transition-shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video preview if available */}
      {videoPreview ? (
        <video
          ref={videoRef}
          src={videoPreview}
          poster={image}
          className="w-full aspect-video object-cover rounded-t mb-2"
          muted={isMuted}
          controls={false}
        />
      ) : (
        // Fallback image if no video
        image ? (
          <img
            src={image}
            alt={title}
            className="w-full aspect-video object-cover rounded-t mb-2"
          />
        ) : (
          // Fallback if neither
          <div className="w-full aspect-video flex items-center justify-center bg-gray-900 text-white">
            No preview available
          </div>
        )
      )}

      {/* Overlay controls on hover for video */}
      {isHovered && videoPreview && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
        </div>
      )}

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge>{editor}</Badge>
        </div>
        <div className="flex gap-2 items-center text-muted-foreground text-xs mb-2">
          {duration && <span>{duration}</span>}
          {tags && tags.slice(0, 2).map(t => <Badge key={t}>{t}</Badge>)}
        </div>
        <div className="flex gap-2 items-center mb-2">
          <Download className="h-4 w-4" /> {downloads}
          <Heart className="h-4 w-4 ml-3" /> {likes}
        </div>
        <Button asChild className="w-full">
          <Link to={`/template/${id}`}>
            <Eye className="mr-2 h-4 w-4" /> View Template
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default TemplateCard;
