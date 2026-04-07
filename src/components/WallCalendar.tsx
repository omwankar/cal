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
      if (day < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(day);
      } else if (day === rangeStart) {
        setRangeStart(null);
      } else {
        setRangeEnd(day);
      }
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 animate-fade-up">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          My Calendar
        </h1>
        <p className="font-body text-sm text-muted-foreground mt-1">
          Select a date range · Jot down notes · Stay organized
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch">
        {/* Notes panel */}
        <div className="w-full lg:w-72 order-2 lg:order-1 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <CalendarNotes monthKey={monthKey} rangeLabel={rangeLabel} />
        </div>

        {/* Calendar panel */}
        <div
          className={`flex-1 order-1 lg:order-2 calendar-card rounded-xl overflow-hidden animate-fade-up ${
            flipping ? "animate-page-flip" : ""
          }`}
          style={{ animationDelay: "0.05s" }}
        >
          {/* Spiral */}
          <CalendarSpiral />

          {/* Hero */}
          <CalendarHero month={MONTH_NAMES[month]} year={year} />

          {/* Navigation bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/40">
            <button onClick={() => goMonth(-1)} className="nav-button" aria-label="Previous month">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex items-center gap-3">
              <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                {MONTH_NAMES[month]}{" "}
                <span className="text-muted-foreground font-normal">{year}</span>
              </h2>
              {!isCurrentMonth && (
                <button
                  onClick={goToday}
                  className="flex items-center gap-1 text-xs font-medium text-calendar-range-edge hover:text-primary transition-colors"
                  title="Go to today"
                >
                  <RotateCcw className="w-3 h-3" />
                  Today
                </button>
              )}
            </div>

            <button onClick={() => goMonth(1)} className="nav-button" aria-label="Next month">
              <ChevronRight className="w-5 h-5 text-foreground" />
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

          {/* Footer legend */}
          <div className="flex flex-wrap items-center justify-center gap-5 px-4 pb-4 text-[11px] text-muted-foreground font-body">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border-2 border-calendar-today" /> Today
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-calendar-range-edge shadow-sm" /> Start
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-calendar-range-edge-end shadow-sm" /> End
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded range-gradient border border-calendar-range-edge/20" /> Range
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" /> Holiday
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
