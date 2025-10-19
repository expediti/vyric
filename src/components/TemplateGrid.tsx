import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Use named import, not default
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  selectedCategory?: string;
}

const TemplateGrid = ({ selectedCategory }: TemplateGridProps) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      let query = supabase
        .from('templates')
        .select('*')
        .order('createdat', { ascending: false });
      if (selectedCategory && selectedCategory !== "All Templates") {
        query = query.ilike('editor', `%${selectedCategory}%`);
      }
      const { data, error } = await query;
      if (error) {
        console.error("Database error", error);
        setTemplates([]);
      } else {
        setTemplates(data || []);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
        <p className="text-muted-foreground mt-4">Loading your templates...</p>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No templates found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title}
          editor={template.editor}
          image={template.thumbnailurl} // matches your DB, not "image"
          videoPreview={template.videopreviewurl}
          downloads={template.downloadscount || 0}
          likes={template.likescount || 0}
          duration={template.duration || "0:15"}
          tags={template.tags}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
