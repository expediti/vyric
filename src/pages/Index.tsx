import Navigation from "@/components/Navigation";
import Categories from "@/components/Categories";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-12 border-b">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Professional CapCut Templates
            </h1>
            <p className="text-muted-foreground mb-4">Hand-picked templates for viral edits</p>
          </div>
        </section>
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <Categories />
          </div>
        </section>
        <section className="py-8">
          <div className="container mx-auto px-4">
            <TemplateGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
