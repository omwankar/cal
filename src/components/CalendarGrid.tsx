import { useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  selectionNotes: string;
  notedDays: Record<number, string>;
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
  selectionNotes,
  notedDays,
}: CalendarGridProps) => {
  const isMobile = useIsMobile();
  const [activeMobileNoteDay, setActiveMobileNoteDay] = useState<number | null>(null);

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
  const getRangeBounds = () => {
    if (rangeStart === null) return null;
    const end = rangeEnd ?? hoveredDay;
    if (end === null) return { lo: rangeStart, hi: rangeStart };
    return { lo: Math.min(rangeStart, end), hi: Math.max(rangeStart, end) };
  };
  const bounds = getRangeBounds();

  const todayDate =
    today.getFullYear() === year && today.getMonth() === month ? today.getDate() : null;

  const allCells = [
    ...prevMonthDays.map((d) => ({ day: d, type: "prev" as const })),
    ...Array.from({ length: days }, (_, i) => ({ day: i + 1, type: "current" as const })),
    ...nextMonthDays.map((d) => ({ day: d, type: "next" as const })),
  ];

  return (
    <div>
      {/* Header row */}
      <div className="grid grid-cols-7 border-b border-border/60">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`text-center text-[10px] sm:text-xs font-bold font-body tracking-wider py-2 uppercase
              ${i === 5 ? "text-[hsl(var(--cal-blue))]" : ""}
              ${i === 6 ? "text-[hsl(var(--cal-red))]" : ""}
              ${i < 5 ? "text-foreground" : ""}
            `}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {allCells.map((cell, index) => {
          const isCurrent = cell.type === "current";
          const inRange = isCurrent && isInRange(cell.day);
          const edge = isCurrent && isEdge(cell.day);
          const start = isCurrent && isStart(cell.day);
          const end = isCurrent && isEnd(cell.day);
          const isSingleDaySelection = start && rangeEnd === null;
          const isMiddle = isCurrent && inRange && !start && !end;
          const connectLeft =
            !!bounds && isCurrent && cell.day > bounds.lo && cell.day <= bounds.hi;
          const connectRight =
            !!bounds && isCurrent && cell.day >= bounds.lo && cell.day < bounds.hi;
          const todayMark = isCurrent && cell.day === todayDate;
          const col = index % 7;
          const isSat = col === 5;
          const isSun = col === 6;
          const holidayKey = isCurrent
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`
            : null;
          const holiday = holidayKey ? holidays[holidayKey] : null;
          const dayNote = isCurrent ? notedDays[cell.day] : undefined;
          const notePreview = selectionNotes.trim();
          const showSelectionNoteOnHover = inRange && notePreview.length > 0;
          const visibleNote = dayNote || (showSelectionNoteOnHover ? notePreview : "");
          const noteTooltip = visibleNote.length > 120 ? `${visibleNote.slice(0, 120)}...` : visibleNote;
          const hoverText = holiday || undefined;

          const showTooltip = isMobile ? activeMobileNoteDay === cell.day : false;

          const handleDayPress = () => {
            if (!isCurrent) return;
            onDayClick(cell.day);
            if (!isMobile) return;
            if (visibleNote) {
              setActiveMobileNoteDay((prev) => (prev === cell.day ? null : cell.day));
            } else {
              setActiveMobileNoteDay(null);
            }
          };

          return (
            <button
              key={`${cell.type}-${cell.day}`}
              data-calendar-day="true"
              className={`
                group relative flex flex-col items-center justify-center
                py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-body
                transition-all duration-150 select-none border-b border-border/20
                ${!isCurrent ? "text-muted-foreground/25 cursor-default" : "cursor-pointer"}
                ${isCurrent && !inRange && !edge ? "hover:bg-muted/50" : ""}
                ${inRange && !edge ? "cal-range-bg" : ""}
                ${edge ? "z-10" : ""}
              `}
              onClick={handleDayPress}
              onMouseEnter={() => !isMobile && isCurrent && onDayHover(cell.day)}
              onMouseLeave={() => !isMobile && onDayHover(null)}
              disabled={!isCurrent}
              title={hoverText}
            >
              {visibleNote && (
                <span
                  className={`pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-30 w-[160px] -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[10px] leading-snug text-background shadow-lg transition-opacity duration-150 ${
                    showTooltip ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {noteTooltip}
                </span>
              )}
              {isMiddle && <span className="absolute inset-0 cal-range-bg" />}
              {connectLeft && !isSingleDaySelection && <span className="absolute left-0 top-0 bottom-0 w-1/2 cal-range-bg" />}
              {connectRight && !isSingleDaySelection && <span className="absolute right-0 top-0 bottom-0 w-1/2 cal-range-bg" />}
              {/* Edge pill */}
              {edge && (
                <span
                  className={`absolute inset-x-1 inset-y-0.5 rounded-md ${
                    start ? "bg-[hsl(var(--cal-range-start))]" : "bg-[hsl(var(--cal-range-end))]"
                  }`}
                  style={{
                    boxShadow: `0 3px 10px -2px ${
                      start ? "hsl(var(--cal-range-start) / 0.35)" : "hsl(var(--cal-range-end) / 0.35)"
                    }`,
                  }}
                />
              )}

              {/* Today ring */}
              {todayMark && !edge && (
                <span className="absolute inset-x-2 inset-y-0.5 rounded-md border-2 border-[hsl(var(--cal-today))] animate-pulse-ring" />
              )}

              <span
                className={`relative z-10 font-medium
                  ${edge ? "text-primary-foreground font-bold" : ""}
                  ${todayMark && !edge ? "font-bold text-foreground" : ""}
                  ${isSat && isCurrent && !edge ? "text-[hsl(var(--cal-blue))] font-semibold" : ""}
                  ${isSun && isCurrent && !edge ? "text-[hsl(var(--cal-red))] font-semibold" : ""}
                `}
              >
                {cell.day}
              </span>

              {(holiday || dayNote) && (
                <span className="relative z-10 mt-0.5 flex items-center gap-0.5">
                  {holiday && (
                    <span className={`w-1 h-1 rounded-full ${edge ? "bg-primary-foreground/70" : "bg-[hsl(var(--cal-red))]"}`} />
                  )}
                  {dayNote && (
                    <span className={`w-1 h-1 rounded-full ${edge ? "bg-primary-foreground/70" : "bg-[hsl(var(--cal-blue))]"}`} />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
