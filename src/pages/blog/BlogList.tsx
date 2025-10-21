import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User } from "lucide-react";

const blogData = [
  {
    id: "top-10-capcut-templates-for-viral-videos",
    title: "Top 10 CapCut Templates for Viral Videos",
    date: "October 15, 2025",
    author: "VYRIC Team",
    image: "/blog/top-10-capcut-templates-for-viral-videos.jpg",
    content: `
      CapCut has become one of the most powerful tools for creators — offering endless templates
      to create viral videos fast. In this post, we explore the top 10 templates from VYRIC that
      helped creators reach millions of views on YouTube Shorts, Instagram Reels, TikTok, and more.

      1. Cinematic Transitions: Smooth, professional-grade effects timed to music beats.
      2. Beat-Synced Effects: Visuals pulsing perfectly with trending audio.
      3. Glitch & VHS Styles: Add vintage flair and dynamic distortions.
      4. Kinetic Typography: Engaging animated text for tutorials & quotes.
      5. Looping Clips: Hypnotic loops to extend engagement.
      6. Light Leaks & Lens Flares: Warmth and mood lighting effects.
      7. Multi-Frame Layouts: Showcase multiple angles simultaneously.
      8. Animated Stickers: Trending, fun overlays to attract youth audiences.
      9. Color Grading Presets: Cinematic tones to enhance storytelling.
      10. Countdown Effects: Build suspense for giveaways and events.

      Start using these ready-made templates from VYRIC and watch your videos explode in popularity!
    `,
  },
  {
    id: "how-to-edit-videos-like-a-pro-using-vyric-templates",
    title: "How to Edit Videos Like a Pro Using VYRIC Templates",
    date: "October 12, 2025",
    author: "Editor’s Desk",
    image: "/blog/how-to-edit-videos-like-a-pro-using-vyric-templates.jpg",
    content: `
      Editing like a pro requires creativity paired with the right tools. Our VYRIC templates
      let you easily apply cinematic effects, color grading, and smooth cuts—even on mobile.
      Learn powerful tips to enhance storytelling and create professional videos fast.
    `,
  },
  {
    id: "top-creator-tips-grow-faster-with-video-trends",
    title: "Top Creator Tips: Grow Faster with Video Trends",
    date: "October 5, 2025",
    author: "VYRIC Insights",
    image: "/blog/top-creator-tips-grow-faster-with-video-trends.jpg",
    content: `
      Staying ahead of video trends is essential to viral success. Leverage AI remixes,
      trending sound design, and use VYRIC’s real-time templates to catch waves early.
      Grow your audience quickly by aligning content with the ever-changing social media landscape.
    `,
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogData.find((b) => b.id === id);

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

        <section className="py-10 container mx-auto px-4 max-w-3xl whitespace-pre-line prose prose-invert text-muted-foreground leading-relaxed">
          {post.content}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
