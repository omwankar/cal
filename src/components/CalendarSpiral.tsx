const CalendarSpiral = () => {
  return (
    <div className="flex justify-center gap-3 py-2">
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-1 h-3 bg-calendar-spiral rounded-b-full" />
          <div className="calendar-spiral-hole" />
        </div>
      ))}
    </div>
  );
};

export default CalendarSpiral;
