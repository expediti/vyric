import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Clean Search Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h1 className="text-3xl font-bold">
                Professional <span className="text-primary">CapCut Templates</span>
              </h1>
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <Categories />
          </div>
        </section>

        {/* Templates Grid */}
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
