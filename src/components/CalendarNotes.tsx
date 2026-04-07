import { useState, useEffect } from "react";

interface CalendarNotesProps {
  monthKey: string;
  rangeLabel: string | null;
  rangeStorageKey: string | null;
  onSelectionNotesChange?: (value: string) => void;
  onRangeNotesSaved?: () => void;
}

const CalendarNotes = ({
  monthKey,
  rangeLabel,
  rangeStorageKey,
  onSelectionNotesChange,
  onRangeNotesSaved,
}: CalendarNotesProps) => {
  const monthStorageKey = `calendar-notes-month-${monthKey}`;
  const rangeNotesKey = rangeStorageKey ? `calendar-notes-range-${monthKey}-${rangeStorageKey}` : null;
  const [mode, setMode] = useState<"month" | "selection">("month");
  const [notes, setNotes] = useState("");
  const activeStorageKey = mode === "month" ? monthStorageKey : rangeNotesKey;

  useEffect(() => {
    if (!activeStorageKey) {
      setNotes("");
      return;
    }
    const saved = localStorage.getItem(activeStorageKey);
    setNotes(saved || "");
  }, [activeStorageKey]);

  useEffect(() => {
    if (!rangeNotesKey && mode === "selection") {
      setMode("month");
    }
  }, [mode, rangeNotesKey]);

  useEffect(() => {
    if (!onSelectionNotesChange) return;
    if (!rangeNotesKey) {
      onSelectionNotesChange("");
      return;
    }
    const saved = localStorage.getItem(rangeNotesKey) || "";
    onSelectionNotesChange(saved);
  }, [onSelectionNotesChange, rangeNotesKey]);

  const handleChange = (val: string) => {
    setNotes(val);
    if (!activeStorageKey) return;
    localStorage.setItem(activeStorageKey, val);
    if (activeStorageKey === rangeNotesKey) {
      onSelectionNotesChange?.(val);
      onRangeNotesSaved?.();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <p className="text-xs font-body font-medium text-muted-foreground mb-2 tracking-wide">
        Notes
      </p>
      <div className="mb-2 flex items-center gap-1 rounded-md bg-muted/70 p-0.5">
        <button
          onClick={() => setMode("month")}
          className={`flex-1 rounded px-1.5 py-1 text-[10px] font-semibold tracking-wide transition-colors ${
            mode === "month" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
          type="button"
        >
          Month
        </button>
        <button
          onClick={() => rangeNotesKey && setMode("selection")}
          className={`flex-1 rounded px-1.5 py-1 text-[10px] font-semibold tracking-wide transition-colors ${
            mode === "selection"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          } ${!rangeNotesKey ? "cursor-not-allowed opacity-45" : ""}`}
          type="button"
          disabled={!rangeNotesKey}
        >
          Selection
        </button>
      </div>
      <p className="text-[10px] font-medium font-body mb-1 truncate text-[hsl(var(--cal-blue))]">
        {mode === "selection" ? rangeLabel || "Pick a day or range first" : "Month memo"}
      </p>
      <div className="flex-1 relative">
        <textarea
          value={notes}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={mode === "selection" ? "Add notes for this selected date range..." : "Write general notes for this month..."}
          className="w-full h-full min-h-[84px] sm:min-h-[120px] bg-transparent resize-none text-xs font-body text-foreground placeholder:text-muted-foreground/30 focus:outline-none leading-[24px] sm:leading-[30px] cal-notes-lines"
          disabled={!activeStorageKey}
        />
      </div>
    </div>
  );
};

export default CalendarNotes;
