import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import CalendarSpiral from "./CalendarSpiral";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";
import CalendarNotes from "./CalendarNotes";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const HOLIDAYS: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-01-19": "MLK Jr. Day",
  "2026-02-14": "Valentine's Day",
  "2026-04-03": "Good Friday",
  "2026-05-25": "Memorial Day",
  "2026-07-04": "Independence Day",
  "2026-09-07": "Labor Day",
  "2026-11-26": "Thanksgiving",
  "2026-12-25": "Christmas Day",
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
      if (newMonth < 0) { setMonth(11); setYear((y) => y - 1); }
      else if (newMonth > 11) { setMonth(0); setYear((y) => y + 1); }
      else setMonth(newMonth);
    },
    [month]
  );

  const goToday = () => {
    setMonth(now.getMonth());
    setYear(now.getFullYear());
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleDayClick = (day: number) => {
    if (rangeStart === null || rangeEnd !== null) {
      setRangeStart(day);
      setRangeEnd(null);
    } else {
      if (day < rangeStart) { setRangeEnd(rangeStart); setRangeStart(day); }
      else if (day === rangeStart) { setRangeStart(null); }
      else setRangeEnd(day);
    }
  };

  const rangeLabel =
    rangeStart !== null
      ? rangeEnd !== null
        ? `${MONTH_NAMES[month]} ${rangeStart} – ${rangeEnd}, ${year}`
        : `${MONTH_NAMES[month]} ${rangeStart}, ${year}`
      : null;

  const monthKey = `${year}-${month}`;
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  return (
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 py-6 sm:py-10 lg:py-14 animate-fade-up">
      {/* Single vertical calendar card */}
      <div className={`cal-card rounded-lg overflow-hidden ${flipping ? "animate-page-flip" : ""}`}>
        {/* Spiral binding */}
        <CalendarSpiral />

        {/* Hero image with wave */}
        <CalendarHero month={MONTH_NAMES[month]} year={year} />

        {/* Bottom section: Notes + Grid */}
        <div className="flex flex-col sm:flex-row">
          {/* Notes column */}
          <div className="w-full sm:w-[140px] md:w-[170px] border-b sm:border-b-0 sm:border-r border-border/40 p-3 sm:p-4 flex-shrink-0">
            <CalendarNotes monthKey={monthKey} rangeLabel={rangeLabel} />
          </div>

          {/* Grid column */}
          <div className="flex-1 min-w-0">
            {/* Month nav */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border/40">
              <button
                onClick={() => goMonth(-1)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-2">
                <span className="font-body text-sm font-semibold text-foreground">
                  {MONTH_NAMES[month]} {year}
                </span>
                {!isCurrentMonth && (
                  <button
                    onClick={goToday}
                    className="text-[10px] font-medium text-[hsl(var(--cal-blue))] hover:underline flex items-center gap-0.5"
                  >
                    <RotateCcw className="w-2.5 h-2.5" /> Today
                  </button>
                )}
              </div>

              <button
                onClick={() => goMonth(1)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Calendar grid */}
            <div className="px-1 sm:px-2">
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
            </div>
          </div>
        </div>

        {/* Footer legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-2.5 border-t border-border/30 bg-muted/20">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
            <span className="w-2.5 h-2.5 rounded-sm border-2 border-[hsl(var(--cal-today))]" /> Today
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
            <span className="w-2.5 h-2.5 rounded-sm bg-[hsl(var(--cal-range-start))]" /> Start
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
            <span className="w-2.5 h-2.5 rounded-sm bg-[hsl(var(--cal-range-end))]" /> End
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
            <span className="w-2.5 h-2.5 rounded-sm cal-range-bg" /> Range
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--cal-red))]" /> Holiday
          </span>
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
