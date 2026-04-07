interface CalendarHeroProps {
  month: string;
  monthIndex: number;
  year: number;
}

const MONTH_HERO_IMAGES: string[] = [
  // Jan – Dec (royalty-free Unsplash photos)
  "https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&w=1600&q=80", // winter
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80", // winter mountains
  "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&w=1600&q=80", // spring blossoms
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80", // spring flowers
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80", // early summer
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80", // ocean
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80", // green valley
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80", // mountains
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80", // autumn leaves
  "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1600&q=80", // autumn forest
  "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=1600&q=80", // cozy lights
  "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=1600&q=80", // festive
];

const CalendarHero = ({ month, monthIndex, year }: CalendarHeroProps) => {
  const heroImage = MONTH_HERO_IMAGES[monthIndex] ?? MONTH_HERO_IMAGES[0];
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16/11" }}
    >
      {/* Hero image */}
      <img
        src={heroImage}
        alt={`${month} ${year}`}
        className="w-full h-full object-cover"
        loading="lazy"
        width={1024}
        height={680}
      />

      {/* Blue diagonal wave overlay */}
      <div className="absolute inset-0 hero-wave opacity-90" />

      {/* Year + Month on the blue section */}
      <div className="absolute bottom-2 right-3 sm:bottom-5 sm:right-6 text-right z-10">
        <p className="font-mono text-xl sm:text-3xl md:text-4xl font-semibold text-primary-foreground leading-none tracking-tight">
          {year}
        </p>
        <p className="font-display text-lg sm:text-2xl md:text-3xl font-black text-primary-foreground uppercase tracking-wide leading-tight mt-0.5">
          {month}
        </p>
      </div>
    </div>
  );
};

export default CalendarHero;
