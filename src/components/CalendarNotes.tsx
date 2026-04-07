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
    if (saved) setNotes(saved);
    else setNotes("");
  }, [storageKey]);

  const handleChange = (val: string) => {
    setNotes(val);
    localStorage.setItem(storageKey, val);
  };

  return (
    <div className="bg-calendar-notes-bg rounded-md p-4 flex flex-col h-full min-h-[180px]">
      <h3 className="font-display text-sm font-semibold text-foreground mb-1">Notes</h3>
      {rangeLabel && (
        <p className="text-xs text-muted-foreground mb-2 font-body">{rangeLabel}</p>
      )}
      <div className="flex-1 relative">
        <textarea
          value={notes}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-full min-h-[120px] bg-transparent resize-none text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none leading-7"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 27px, hsl(var(--calendar-notes-line)) 27px, hsl(var(--calendar-notes-line)) 28px)",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarNotes;
