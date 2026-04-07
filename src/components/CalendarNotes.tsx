import { useState, useEffect } from "react";
import { StickyNote, CalendarDays } from "lucide-react";

interface CalendarNotesProps {
  monthKey: string;
  rangeLabel: string | null;
}

const CalendarNotes = ({ monthKey, rangeLabel }: CalendarNotesProps) => {
  const storageKey = `calendar-notes-${monthKey}`;
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setNotes(saved || "");
  }, [storageKey]);

  const handleChange = (val: string) => {
    setNotes(val);
    localStorage.setItem(storageKey, val);
  };

  return (
    <div className="calendar-card rounded-xl p-5 flex flex-col h-full min-h-[200px] lg:min-h-[420px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-calendar-range flex items-center justify-center">
          <StickyNote className="w-4 h-4 text-calendar-range-edge" />
        </div>
        <h3 className="font-display text-base font-semibold text-foreground">Notes</h3>
      </div>

      {/* Range indicator */}
      {rangeLabel && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-calendar-range/50 border border-calendar-range-edge/20">
          <CalendarDays className="w-3.5 h-3.5 text-calendar-range-edge flex-shrink-0" />
          <p className="text-xs text-calendar-range-edge font-medium font-body truncate">
            {rangeLabel}
          </p>
        </div>
      )}

      {/* Lined textarea */}
      <div className="flex-1 relative rounded-lg bg-calendar-notes-bg p-3 overflow-hidden">
        {/* Red margin line */}
        <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-accent/20" />
        <textarea
          value={notes}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-full min-h-[140px] bg-transparent resize-none text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none leading-8 notes-lined pl-5"
        />
      </div>

      {/* Character count */}
      <p className="text-[10px] text-muted-foreground/50 font-mono text-right mt-2">
        {notes.length} chars
      </p>
    </div>
  );
};

export default CalendarNotes;
