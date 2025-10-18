import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import TemplateCard from "./TemplateCard";
import { getSelectedCategory } from "./Categories";

const TemplateGrid = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(getSelectedCategory());

  useEffect(() => {
    const onCatChange = () => setCategory(getSelectedCategory());
    window.addEventListener("vyric_category", onCatChange);
    return () => window.removeEventListener("vyric_category", onCatChange);
  }, []);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      let query = supabase.from('templates').select('*').order('created_at', { ascending: false });
      if (category && category !== "") {
        // match in either tags or title/category fields
        query = query.ilike('tags', `%${category}%`).or(`title.ilike.%${category}%,description.ilike.%${category}%`);
      }
      const { data, error } = await query;
      if (error) {
        setTemplates([]);
      } else {
        setTemplates(data ?? []);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading your templates...</p>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">No templates found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          slug={template.slug}
          title={template.title}
          editor="CapCut"
          image={template.thumbnail_url || "/api/placeholder/400/225"}
          videoPreview={template.video_preview_url}
          downloads={template.downloads_count || 0}
          likes={template.likes_count || 0}
          duration={template.duration_seconds 
            ? `${Math.floor(template.duration_seconds / 60)}:${(template.duration_seconds % 60).toString().padStart(2, '0')}`
            : '0:15'
          }
          tags={template.tags || []}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
