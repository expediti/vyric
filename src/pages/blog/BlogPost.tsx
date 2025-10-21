import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User } from "lucide-react";

const blogData = [
  {
    id: "Top 10 CapCut Templates for Viral Videos",
    title: "Top 10 CapCut Templates for Viral Videos",
    date: "October 15, 2025",
    author: "VYRIC Team",
    image: "/blog/Top%2010%20CapCut%20Templates%20for%20Viral%20Videos.jpg",
    content: `
      CapCut has become one of the most powerful tools for creators — offering endless templates
      to create viral videos fast. In this post, we explore the top 10 templates from VYRIC that
      helped creators reach millions of views on YouTube Shorts, Instagram Reels, TikTok, and more.
      ...
      [Long engaging blog content here.]
    `,
  },
  // More posts...
];

const BlogPost = () => {
  const { id } = useParams();
  const decodedId = id ? decodeURIComponent(id) : "";
  const post = blogData.find((b) => b.id === decodedId);

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
