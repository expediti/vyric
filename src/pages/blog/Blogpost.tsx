import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User } from "lucide-react";

const blogData = [
  {
    id: 1,
    title: "Top 10 CapCut Templates for Viral Videos",
    date: "October 15, 2025",
    author: "VYRIC Team",
    image: "/blog/blog1.jpg",
    content: `
      CapCut has become one of the most powerful tools for creators — offering endless template options 
      that let you make viral videos in record time. In this post, we explore the top 10 templates from 
      VYRIC that helped creators reach millions of views across YouTube Shorts, Instagram Reels, and TikTok. 

      From cinematic transitions to trending beat syncs, these templates are designed to boost engagement 
      while saving hours of editing. Start using these ready-made effects and watch your content go viral!`,
  },
  {
    id: 2,
    title: "How to Edit Videos Like a Pro Using VYRIC Templates",
    date: "October 12, 2025",
    author: "Editor’s Desk",
    image: "/blog/blog2.jpg",
    content: `
      Editing like a pro doesn't require expensive software anymore — just creativity, story sense, and the 
      right templates. In this quick guide, we show how you can enhance your videos using layered effects, 
      timing cuts, and LUT color presets directly from VYRIC’s CapCut collections.`,
  },
  {
    id: 3,
    title: "Top Creator Tips: Grow Faster with Video Trends",
    date: "October 5, 2025",
    author: "VYRIC Insights",
    image: "/blog/blog3.jpg",
    content: `
      Video trends evolve fast. Whether it’s AI-generated remixes or storytelling shorts, staying early to 
      trends helps creators reach wider audiences. Use VYRIC’s trending templates section to find real-time 
      hits based on what’s going viral right now.`,
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogData.find((b) => b.id.toString() === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex items-center justify-center flex-1">
          <p className="text-muted-foreground">Blog post not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="relative w-full h-60 sm:h-80 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" /> {post.author}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 container mx-auto px-4 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <div className="prose prose-invert max-w-none leading-loose text-muted-foreground whitespace-pre-line">
            {post.content}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
