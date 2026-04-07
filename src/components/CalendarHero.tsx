import heroImage from "@/assets/calendar-hero.jpg";

interface CalendarHeroProps {
  month: string;
  year: number;
}

const CalendarHero = ({ month, year }: CalendarHeroProps) => {
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
