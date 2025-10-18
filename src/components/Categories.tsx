const categories = [
  { label: "All Templates", value: "" },
  { label: "Phonk", value: "phonk" },
  { label: "Insta Story", value: "insta story" },
  { label: "Post", value: "post" },
  { label: "Viral Types", value: "viral" },
  { label: "Reels", value: "reels" },
  { label: "TikTok", value: "tiktok" },
  { label: "YouTube", value: "youtube" },
  { label: "Podcast", value: "podcast" },
  { label: "Aesthetic", value: "aesthetic" }
];

// state lifting: we use localStorage for persistence, or context/provider for a real app.
export function getSelectedCategory() {
  return localStorage.getItem("vyric_category") || "";
}
export function setSelectedCategory(category) {
  localStorage.setItem("vyric_category", category);
  window.dispatchEvent(new Event("vyric_category")); // trigger update
}

const Categories = () => {
  const [selected, setSelected] = useState(getSelectedCategory());

  useEffect(() => {
    const listener = () => setSelected(getSelectedCategory());
    window.addEventListener("vyric_category", listener);
    return () => window.removeEventListener("vyric_category", listener);
  }, []);

  const handleClick = (value: string) => {
    setSelected(value);
    setSelectedCategory(value);
  };

  return (
    <nav className="flex flex-wrap gap-3 items-center">
      {categories.map(cat => (
        <button
          key={cat.value}
          className={`px-4 py-2 rounded-full font-medium ${
            selected === cat.value
              ? "bg-primary text-white"
              : "bg-muted text-foreground hover:bg-primary/20"
          }`}
          onClick={() => handleClick(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
};
export default Categories;
