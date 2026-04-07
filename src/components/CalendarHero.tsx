import heroImage from "@/assets/calendar-hero.jpg";

interface CalendarHeroProps {
  month: string;
  year: number;
}

const CalendarHero = ({ month, year }: CalendarHeroProps) => {
  return (
    <div className="relative w-full overflow-hidden rounded-t-sm">
      <img
        src={heroImage}
        alt={`${month} ${year}`}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
        width={1024}
        height={680}
      />
      <div className="absolute bottom-0 right-0 p-4 text-right">
        <p className="font-display text-2xl font-bold text-primary-foreground drop-shadow-lg">
          {year}
        </p>
        <p className="font-display text-xl font-semibold tracking-widest uppercase text-primary-foreground drop-shadow-lg">
          {month}
        </p>
      </div>
    </div>
  );
};

export default CalendarHero;
