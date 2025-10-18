import Navigation from "@/components/Navigation";
import Categories from "@/components/Categories";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navigation />
      <main>
        <h1 className="text-center text-4xl font-bold mt-12 mb-6">
          Professional CapCut Templates
        </h1>
        {/* No <SearchBar /> here */}
        <Categories />
        <TemplateGrid />
      </main>
      <Footer />
    </>
  );
};

export default Index;
