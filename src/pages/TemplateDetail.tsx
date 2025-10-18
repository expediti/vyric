import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const TemplateDetail = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setTemplate(null);
      } else {
        setTemplate(data);
      }
      setLoading(false);
    };
    fetchTemplate();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }
  if (!template) {
    return <div className="text-center py-12">Template not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">{template.title}</h2>
      <div className="mb-6">{template.description}</div>
      {/* Add template preview, video, links, etc. here */}
    </div>
  );
};

export default TemplateDetail;
