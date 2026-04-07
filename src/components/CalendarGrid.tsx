import { useMemo } from "react";

interface CalendarGridProps {
  year: number;
  month: number;
  rangeStart: number | null;
  rangeEnd: number | null;
  hoveredDay: number | null;
  today: Date;
  onDayClick: (day: number) => void;
  onDayHover: (day: number | null) => void;
  holidays: Record<string, string>;
}

const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const CalendarGrid = ({
  year,
  month,
  rangeStart,
  rangeEnd,
  hoveredDay,
  today,
  onDayClick,
  onDayHover,
  holidays,
}: CalendarGridProps) => {
  const { days, prevMonthDays, nextMonthDays } = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonth = new Date(year, month, 0).getDate();
    const prevDays = Array.from({ length: offset }, (_, i) => prevMonth - offset + 1 + i);
    const totalCells = offset + daysInMonth;
    const nextDays = Array.from({ length: (7 - (totalCells % 7)) % 7 }, (_, i) => i + 1);
    return { days: daysInMonth, prevMonthDays: prevDays, nextMonthDays: nextDays };
  }, [year, month]);

  const isInRange = (day: number) => {
    if (rangeStart === null) return false;
    const end = rangeEnd ?? hoveredDay;
    if (end === null) return false;
    const lo = Math.min(rangeStart, end);
    const hi = Math.max(rangeStart, end);
    return day >= lo && day <= hi;
  };

  const isStart = (day: number) => day === rangeStart;
  const isEnd = (day: number) => day === rangeEnd;
  const isEdge = (day: number) => isStart(day) || isEnd(day);

  const todayDate =
    today.getFullYear() === year && today.getMonth() === month ? today.getDate() : null;

  const allCells = [
    ...prevMonthDays.map((d) => ({ day: d, type: "prev" as const })),
    ...Array.from({ length: days }, (_, i) => ({ day: i + 1, type: "current" as const })),
    ...nextMonthDays.map((d) => ({ day: d, type: "next" as const })),
  ];

  return (
    <div className="px-4 sm:px-6 pb-5">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2 border-b border-border/50 pb-2">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`text-center text-[11px] font-semibold font-body tracking-wider uppercase ${
              i >= 5 ? "text-calendar-weekend" : "text-muted-foreground"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {allCells.map((cell, index) => {
          const isCurrent = cell.type === "current";
          const inRange = isCurrent && isInRange(cell.day);
          const edge = isCurrent && isEdge(cell.day);
          const start = isCurrent && isStart(cell.day);
          const end = isCurrent && isEnd(cell.day);
          const todayMark = isCurrent && cell.day === todayDate;
          const weekend = index % 7 >= 5;
          const holidayKey = isCurrent
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`
            : null;
          const holiday = holidayKey ? holidays[holidayKey] : null;

          return (
            <button
              key={`${cell.type}-${cell.day}`}
              className={`
                group relative flex flex-col items-center justify-center py-2.5 sm:py-3 text-sm font-body
                transition-all duration-200 ease-out select-none
                ${!isCurrent ? "text-muted-foreground/30 cursor-default" : "cursor-pointer"}
                ${isCurrent && !inRange && !edge ? "hover:bg-calendar-day-hover rounded-lg" : ""}
                ${inRange && !edge ? "range-gradient" : ""}
                ${start ? "rounded-l-lg" : ""}
                ${end ? "rounded-r-lg" : ""}
                ${edge ? "z-10" : ""}
              `}
              onClick={() => isCurrent && onDayClick(cell.day)}
              onMouseEnter={() => isCurrent && onDayHover(cell.day)}
              onMouseLeave={() => onDayHover(null)}
              disabled={!isCurrent}
              title={holiday || undefined}
            >
              {/* Edge marker (selected start/end) */}
              {edge && (
                <span
                  className={`absolute inset-1 rounded-lg ${
                    start
                      ? "bg-calendar-range-edge"
                      : "bg-calendar-range-edge-end"
                  } shadow-lg`}
                  style={{
                    boxShadow: start
                      ? "0 4px 14px -3px hsl(var(--calendar-range-edge) / 0.4)"
                      : "0 4px 14px -3px hsl(var(--calendar-range-edge-end) / 0.4)",
                  }}
                />
              )}

              {/* Today ring */}
              {todayMark && !edge && (
                <span className="absolute inset-1.5 rounded-lg border-2 border-calendar-today animate-pulse-ring" />
              )}

              {/* Day number */}
              <span
                className={`relative z-10 text-sm font-medium transition-colors
                  ${edge ? "text-primary-foreground font-bold" : ""}
                  ${todayMark && !edge ? "text-foreground font-bold" : ""}
                  ${weekend && isCurrent && !edge ? "text-calendar-weekend" : ""}
                `}
              >
                {cell.day}
              </span>

              {/* Holiday dot */}
              {holiday && (
                <span
                  className={`relative z-10 w-1.5 h-1.5 rounded-full mt-0.5 ${
                    edge ? "bg-primary-foreground/70" : "bg-accent"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
