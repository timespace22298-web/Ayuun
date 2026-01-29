
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end">
      <div className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums">
        {time.toLocaleTimeString('ko-KR', { hour12: false })}
      </div>
      <div className="text-sm text-slate-500 font-medium">
        {time.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
      </div>
    </div>
  );
};

export default Clock;
