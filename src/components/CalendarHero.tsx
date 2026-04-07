import heroImage from "@/assets/calendar-hero.jpg";

interface CalendarHeroProps {
  month: string;
  year: number;
}

const CalendarHero = ({ month, year }: CalendarHeroProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={heroImage}
        alt={`${month} ${year}`}
        className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover"
        width={1024}
        height={680}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 hero-bottom-overlay" />
      <div className="absolute inset-0 hero-gradient-overlay opacity-40" />

      {/* Month & Year */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between">
        <div>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary-foreground tracking-tight drop-shadow-lg leading-none">
            {month}
          </p>
          <p className="font-body text-sm text-primary-foreground/80 tracking-[0.3em] uppercase mt-1 drop-shadow">
            Monthly Planner
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-4xl sm:text-5xl font-bold text-primary-foreground/90 drop-shadow-lg leading-none">
            {year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarHero;
