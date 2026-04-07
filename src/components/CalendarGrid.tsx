import { useMemo } from "react";

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed
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
  const { days, startOffset, prevMonthDays, nextMonthDays } = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    // Convert Sunday=0 to Monday-based: Mon=0, Sun=6
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonth = new Date(year, month, 0).getDate();
    const prevDays = Array.from({ length: offset }, (_, i) => prevMonth - offset + 1 + i);
    const totalCells = offset + daysInMonth;
    const nextDays = Array.from({ length: (7 - (totalCells % 7)) % 7 }, (_, i) => i + 1);
    return {
      days: daysInMonth,
      startOffset: offset,
      prevMonthDays: prevDays,
      nextMonthDays: nextDays,
    };
  }, [year, month]);

  const isInRange = (day: number) => {
    if (rangeStart === null) return false;
    const end = rangeEnd ?? hoveredDay;
    if (end === null) return false;
    const lo = Math.min(rangeStart, end);
    const hi = Math.max(rangeStart, end);
    return day >= lo && day <= hi;
  };

  const isEdge = (day: number) => day === rangeStart || day === rangeEnd;

  const isToday =
    today.getFullYear() === year && today.getMonth() === month
      ? today.getDate()
      : null;

  const isWeekend = (index: number) => {
    const col = index % 7;
    return col >= 5; // Sat=5, Sun=6
  };

  const allCells = [
    ...prevMonthDays.map((d) => ({ day: d, type: "prev" as const })),
    ...Array.from({ length: days }, (_, i) => ({ day: i + 1, type: "current" as const })),
    ...nextMonthDays.map((d) => ({ day: d, type: "next" as const })),
  ];

  return (
    <div className="px-3 sm:px-4 pb-4">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`text-center text-xs font-semibold font-body py-1 ${
              i >= 5 ? "text-calendar-weekend" : "text-muted-foreground"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7">
        {allCells.map((cell, index) => {
          const isCurrent = cell.type === "current";
          const inRange = isCurrent && isInRange(cell.day);
          const edge = isCurrent && isEdge(cell.day);
          const todayMark = isCurrent && cell.day === isToday;
          const weekend = isWeekend(index);
          const holidayKey = isCurrent
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`
            : null;
          const holiday = holidayKey ? holidays[holidayKey] : null;

          return (
            <button
              key={`${cell.type}-${cell.day}`}
              className={`
                relative flex items-center justify-center py-2 text-sm font-body transition-all duration-150
                ${!isCurrent ? "text-muted-foreground/40 cursor-default" : "cursor-pointer"}
                ${isCurrent && !inRange && !edge ? "hover:bg-muted rounded" : ""}
                ${inRange && !edge ? "bg-calendar-range" : ""}
                ${edge ? "bg-calendar-range-edge text-primary-foreground rounded-md font-semibold z-10" : ""}
                ${todayMark && !edge ? "font-bold" : ""}
                ${weekend && isCurrent && !edge ? "text-calendar-weekend" : ""}
              `}
              onClick={() => isCurrent && onDayClick(cell.day)}
              onMouseEnter={() => isCurrent && onDayHover(cell.day)}
              onMouseLeave={() => onDayHover(null)}
              disabled={!isCurrent}
              title={holiday || undefined}
            >
              {todayMark && !edge && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-7 h-7 rounded-full border-2 border-calendar-today" />
                </span>
              )}
              <span className="relative z-10">{cell.day}</span>
              {holiday && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
