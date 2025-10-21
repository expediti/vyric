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
     Discover the ultimate power of CapCut templates to skyrocket your video views and engagement in 2025! As videos dominate social media, creators are constantly looking for ways to make viral, attention-grabbing content effortlessly. CapCut provides a wealth of ready-made templates that make editing seamless and fun. Here’s an in-depth look at the Top 10 CapCut Templates on VYRIC that will help you create trending videos for YouTube Shorts, Instagram Reels, TikTok, and more.

1. Cinematic Transitions
  - Add professional-grade swipe, zoom, and blur effects that deliver a movie-like visual story.
  - Keeps the viewer hooked with smooth scene changes perfectly timed to music beats.
  - Ideal for travel vlogs, storytelling, and dynamic product unveilings.

2. Beat-Synced Effects
  - Templates that automatically sync visuals with the beats of trending songs.
  - Includes flash, color glows, and shaking effects for energy-packed content.
  - Boosts video discoverability by matching viral audio trends.

3. Glitch & VHS Styles
  - Vintage-inspired distorted visuals add nostalgic aesthetics.
  - Popular in tech reviews, gaming clips, and retro-themed videos.
  - Easy to customize with color overlays and flicker speeds.

4. Kinetic Typography
  - Captivating moving text effects highlight key phrases and calls to action.
  - Works great for quotes, announcements, and tutorials.
  - Enhances message delivery visually without overwhelming visuals.

5. Looping & Repeating Clips
  - Creates hypnotic loops that extend video length while sustaining interest.
  - Attention grabber on platforms with short video time limits.
  - Perfect for showcasing products, skills, or funny moments.

6. Light Leaks and Lens Flares
  - Subtle overlays that add warmth and sophistication.
  - Popular in lifestyle and fashion videos to add mood lighting.
  - Elevate video quality quickly without complex editing.

7. Split Screen & Multi-Frame Layouts
  - Display multiple clips or angles simultaneously.
  - Great for challenges, reactions, and before/after comparisons.
  - Increases storytelling depth without extra filming.

8. Animated Stickers & Emojis
  - Fun overlays that attract younger audiences.
  - Use trending stickers to boost relatability and humor.
  - Simple drag-and-drop customization included.

9. Color Grading Presets
  - Instantly enhance your video’s mood with cinematic color tones.
  - Includes warm, cool, pastel, and dramatic themes.
  - Helps maintain consistent branding across your channel.

10. Countdown & Timer Effects
  - Creates suspense and urgency, driving viewers to watch till the end.
  - Ideal for giveaways, event announcements, and tutorials.
  - Engages viewers with visual progress bars or number animations.

**Why Use VYRIC’s CapCut Templates?**

- Saves hours of tedious editing.
- Easy for beginners and pros alike.
- Updated regularly with the latest trends.
- Compatible with mobile editing, enabling creation on-the-go
`,
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
