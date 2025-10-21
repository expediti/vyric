import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: "Top 10 CapCut Templates for Viral Videos",
    title: "Top 10 CapCut Templates for Viral Videos",
    excerpt:
      "Discover the ultimate power of CapCut templates to skyrocket your video views and engagement in 2025! As videos dominate social media, creators are constantly looking for ways to make viral, attention-grabbing content effortlessly. CapCut provides a wealth of ready-made templates that make editing seamless and fun. Here’s an in-depth look at the Top 10 CapCut Templates on VYRIC that will help you create trending videos for YouTube Shorts, Instagram Reels, TikTok, and more.

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
- Compatible with mobile editing, enabling creation on-the-go.
",
    date: "October 15, 2025",
    author: "VYRIC Team",
  },
  {
    id: "How to Edit Videos Like a Pro Using VYRIC Templates",
    title: "How to Edit Videos Like a Pro Using VYRIC Templates",
    excerpt:
      "A complete guide to making cinematic edits in minutes using the VYRIC CapCut template library.",
    date: "October 12, 2025",
    author: "Editor’s Desk",
  },
  {
    id: "Top Creator Tips Grow Faster with Video Trends",
    title: "Top Creator Tips: Grow Faster with Video Trends",
    excerpt:
      "Learn how top creators are leveraging trends, sound design, and templates for explosive growth.",
    date: "October 5, 2025",
    author: "VYRIC Insights",
  },
];

const BlogList = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-black py-16 text-center border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">VYRIC Blog</h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Explore the latest insights, trends, and tutorials for video creators and editors.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-10 sm:py-16 bg-background">
          <div className="container mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all bg-card"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`/blog/${post.id}.jpg`}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${encodeURIComponent(post.id)}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> {post.author}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
