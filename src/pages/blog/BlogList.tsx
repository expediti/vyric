import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: "Top 10 CapCut Templates for Viral Videos",
    title: "Top 10 CapCut Templates for Viral Videos",
    excerpt:
      "Discover the ultimate power of CapCut templates to skyrocket your video views and engagement in 2025!",
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
                    src={`/blog/${encodeURIComponent(post.id)}.jpg`}
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
