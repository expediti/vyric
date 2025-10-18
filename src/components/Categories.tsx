const categories = [
  "All Templates",
  "Phonk",
  "Insta Story", 
  "Post",
  "Viral Types",
  "Reels",
  "TikTok",
  "YouTube",
  "Podcast",
  "Aesthetic"
];

// Add `selected` and `onSelect` props to handle selection
const Categories = ({ selected, onSelect }) => {
  return (
    <section className="py-6 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition hover:scale-105
                ${selected === category ? 'bg-foreground text-background shadow-elegant' : 'bg-secondary text-secondary-foreground hover:bg-accent border border-border shadow-card hover:shadow-elegant'}
              `}
              onClick={() => onSelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 
