import { useState, useEffect } from "react";

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
    <div className="h-full flex flex-col">
      <p className="text-xs font-body font-medium text-muted-foreground mb-1 tracking-wide">
        Notes
      </p>
      {rangeLabel && (
        <p className="text-[10px] text-[hsl(var(--cal-blue))] font-medium font-body mb-1 truncate">
          {rangeLabel}
        </p>
      )}
      <div className="flex-1 relative">
        <textarea
          value={notes}
          onChange={(e) => handleChange(e.target.value)}
          placeholder=""
          className="w-full h-full min-h-[120px] bg-transparent resize-none text-xs font-body text-foreground placeholder:text-muted-foreground/30 focus:outline-none leading-[30px] cal-notes-lines"
        />
      </div>
    </div>
  );
};

export default CalendarNotes;
