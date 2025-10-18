import { useState } from 'react';
import Navigation from "@/components/Navigation";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Templates');
  const [showMore, setShowMore] = useState(false);

  const mainCategories = [
    'All Templates',
    'CapCut', 
    'Viral',
    'Phonk',
    'Insta Story'
  ];

  const additionalCategories = [
    'Post',
    'Viral Types',
    'Reels',
    'TikTok',
    'YouTube',
    'Podcast',
    'Aesthetic',
    'After Effects',
    'VN Editor'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Filter Categories */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {mainCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`text-xs sm:text-sm whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <>
                    Less
                    <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    More
                    <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </Button>
            </div>

            {showMore && (
              <div className="flex flex-wrap items-center gap-2 animate-in slide-in-from-top-2 duration-200">
                {additionalCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={`text-xs sm:text-sm whitespace-nowrap ${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            {selectedCategory !== 'All Templates' && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-muted-foreground">
                  {selectedCategory} Templates
                </h2>
              </div>
            )}
            
            <TemplateGrid selectedCategory={selectedCategory} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

