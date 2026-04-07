import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarSpiral from "./CalendarSpiral";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";
import CalendarNotes from "./CalendarNotes";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Sample holidays (US)
const HOLIDAYS: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-01-19": "MLK Jr. Day",
  "2026-02-14": "Valentine's Day",
  "2026-07-04": "Independence Day",
  "2026-12-25": "Christmas Day",
  "2026-04-07": "Today",
};

const WallCalendar = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [rangeStart, setRangeStart] = useState<number | null>(null);
  const [rangeEnd, setRangeEnd] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [flipping, setFlipping] = useState(false);

  const goMonth = useCallback(
    (dir: -1 | 1) => {
      setFlipping(true);
      setTimeout(() => setFlipping(false), 500);
      setRangeStart(null);
      setRangeEnd(null);
      setHoveredDay(null);
      const newMonth = month + dir;
      if (newMonth < 0) {
        setMonth(11);
        setYear((y) => y - 1);
      } else if (newMonth > 11) {
        setMonth(0);
        setYear((y) => y + 1);
      } else {
        setMonth(newMonth);
      }
    },
    [month]
  );

  const handleDayClick = (day: number) => {
    if (rangeStart === null || rangeEnd !== null) {
      setRangeStart(day);
      setRangeEnd(null);
    } else {
      if (day < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(day);
      } else {
        setRangeEnd(day);
      }
    }
  };

  const rangeLabel =
    rangeStart !== null
      ? rangeEnd !== null
        ? `${MONTH_NAMES[month]} ${rangeStart} – ${rangeEnd}, ${year}`
        : `${MONTH_NAMES[month]} ${rangeStart}, ${year} (select end date)`
      : null;

  const monthKey = `${year}-${month}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10">
      {/* Desktop: side-by-side | Mobile: stacked */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Notes panel – left on desktop, below on mobile */}
        <div className="w-full lg:w-64 order-2 lg:order-1">
          <CalendarNotes monthKey={monthKey} rangeLabel={rangeLabel} />
        </div>

        {/* Calendar panel */}
        <div
          className={`flex-1 order-1 lg:order-2 bg-calendar-bg rounded-lg shadow-xl shadow-calendar-shadow/30 overflow-hidden ${
            flipping ? "animate-page-flip" : ""
          }`}
        >
          {/* Spiral binding */}
          <CalendarSpiral />

          {/* Hero image */}
          <CalendarHero month={MONTH_NAMES[month]} year={year} />

          {/* Navigation */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => goMonth(-1)}
              className="p-1.5 rounded-full hover:bg-muted transition-colors text-foreground"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-display text-lg font-semibold text-foreground">
              {MONTH_NAMES[month]} {year}
            </h2>
            <button
              onClick={() => goMonth(1)}
              className="p-1.5 rounded-full hover:bg-muted transition-colors text-foreground"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Grid */}
          <CalendarGrid
            year={year}
            month={month}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            hoveredDay={hoveredDay}
            today={now}
            onDayClick={handleDayClick}
            onDayHover={setHoveredDay}
            holidays={HOLIDAYS}
          />

          {/* Legend */}
          <div className="flex flex-wrap gap-4 px-4 pb-4 text-xs text-muted-foreground font-body">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full border-2 border-calendar-today" /> Today
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-calendar-range-edge" /> Selected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-calendar-range" /> Range
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent" /> Holiday
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
