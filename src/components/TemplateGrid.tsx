import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import TemplateCard from "./TemplateCard";

interface TemplateGridProps {
  selectedCategory?: string;
}

const TemplateGrid = ({ selectedCategory = 'All Templates' }: TemplateGridProps) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setError(null);
        setLoading(true);
        
        let query = supabase
          .from('templates')
          .select('*')
          .order('created_at', { ascending: false });

        if (selectedCategory !== 'All Templates') {
          if (['CapCut', 'After Effects', 'VN Editor'].includes(selectedCategory)) {
            query = query.ilike('editor', `%${selectedCategory}%`);
          } else {
            query = query.or(`title.ilike.%${selectedCategory}%,description.ilike.%${selectedCategory}%`);
          }
        }

        const { data, error } = await query;

        if (error) {
          console.error('Database error:', error);
          setError('Failed to load templates');
          return;
        }

        console.log('Loaded templates from database:', data);
        setTemplates(data || []);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setError('Failed to load templates');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading templates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg mb-4">{error}</p>
        <p className="text-sm text-muted-foreground">Please check your database connection.</p>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">
          {selectedCategory === 'All Templates' 
            ? 'No templates found' 
            : `No ${selectedCategory} templates found`
          }
        </p>
        <p className="text-sm text-muted-foreground">
          {selectedCategory === 'All Templates'
            ? 'Upload your first template via the admin panel!'
            : 'Try selecting a different category or upload templates for this category.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            title={template.title}
            editor={template.editor || 'CapCut'}
            image={template.thumbnail_url || "/placeholder.jpg"}
            videoPreview={template.video_preview_url}
            downloads={template.downloads_count || 0}
            likes={template.likes_count || 0}
            duration={template.duration_seconds 
              ? `${Math.floor(template.duration_seconds / 60)}:${(template.duration_seconds % 60).toString().padStart(2, '0')}`
              : '0:15'
            }
            tags={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
