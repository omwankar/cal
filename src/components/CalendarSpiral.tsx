const CalendarSpiral = () => {
  return (
    <div className="flex justify-center items-end gap-[14px] sm:gap-[18px] md:gap-[22px] py-2 bg-gradient-to-b from-muted/40 to-transparent">
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="spiral-wire h-5" />
          <div className="spiral-ring" />
          <div className="spiral-wire h-2 opacity-30" />
        </div>
      ))}
    </div>
  );
};

export default CalendarSpiral;
