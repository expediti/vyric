import Navigation from "@/components/Navigation";
import Categories from "@/components/Categories";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      {/* Single navigation bar only at top */}
      <Navigation />
      <main>
        
        {/* Category filter chips */}
        <Categories />
        {/* Template grid */}
        <TemplateGrid />
      </main>
      <Footer />
    </>
  );
};

export default Index;
