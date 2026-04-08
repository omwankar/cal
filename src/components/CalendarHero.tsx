interface CalendarHeroProps {
  month: string;
  monthIndex: number;
  year: number;
}

const MONTH_HERO_IMAGES: string[] = [
  // Jan – Dec (season-wise Unsplash images, one per month)
  "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=2000&q=80", // Jan - winter
  "https://images.unsplash.com/photo-1455156218388-5e61b526818b?auto=format&fit=crop&w=2000&q=80", // Feb - late winter
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=2000&q=80", // Mar - spring bloom
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=2000&q=80", // Apr - spring field
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2000&q=80", // May - early summer
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80", // Jun - monsoon onset
  "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=2000&q=80", // Jul - rainy green season
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80", // Aug - lush mountains
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2000&q=80", // Sep - post-monsoon clarity
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=80", // Oct - autumn tones
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2000&q=80", // Nov - festive city lights
  "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2000&q=80", // Dec - winter festive
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
        referrerPolicy="no-referrer"
        onError={(e) => {
          const img = e.currentTarget;
          if (!img.dataset.fallbackApplied) {
            img.dataset.fallbackApplied = "true";
            img.src = "/placeholder.svg";
          }
        }}
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
