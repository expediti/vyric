import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import TemplateCard from "./TemplateCard";
import Categories from "./Categories";

const categoryToTag = (category) => {
  switch (category) {
    case "Phonk": return "phonk";
    case "Insta Story": return "insta";
    case "Post": return "post";
    case "Viral Types": return "viral";
    case "Reels": return "reels";
    case "TikTok": return "tiktok";
    case "YouTube": return "youtube";
    case "Podcast": return "podcast";
    case "Aesthetic": return "aesthetic";
    default: return "";
  }
};

const TemplateGrid = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Templates");

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });
      setTemplates(data || []);
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const filteredTemplates = selectedCategory === "All Templates"
    ? templates
    : templates.filter(template => {
        const tag = categoryToTag(selectedCategory);
        return (
          template.tags?.map((t) => t.toLowerCase()).includes(tag) ||
          template.title?.toLowerCase().includes(tag)
        );
      });

  if (loading) {
    return (
      <div className="text-center py-12">Loading your templates...</div>
    );
  }

  if (filteredTemplates.length === 0) {
    return (
      <div className="text-center py-12">No templates found</div>
    );
  }

  return (
    <>
      <Categories selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </div>
    </>
  );
};

export default TemplateGrid;
