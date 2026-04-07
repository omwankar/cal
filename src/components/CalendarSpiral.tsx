const CalendarSpiral = () => {
  return (
    <div className="relative flex justify-center items-end gap-[18px] sm:gap-[22px] pt-1 pb-3 bg-gradient-to-b from-muted/60 to-transparent">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Wire going up */}
          <div className="calendar-spiral-wire w-[2px] h-4 rounded-t-full" />
          {/* Hole */}
          <div className="calendar-spiral-hole border border-border/50" />
          {/* Wire going down behind */}
          <div className="calendar-spiral-wire w-[2px] h-2 rounded-b-full opacity-40" />
        </div>
      ))}
    </div>
  );
};

export default CalendarSpiral;
