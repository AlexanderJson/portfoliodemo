

import { Button } from "../Buttons/Button";
import './Schedules.css';
export const ScheduleComponent: React.FC<{ title: string; events: any[] }> = ({ title, events }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h3 style={{margin:0}}>{title}</h3>
        <div style={{display:'flex', gap:'0.5rem'}}>
          <Button title="Prev" variant="secondary" onClick={() => {}} />
          <Button title="Next" variant="secondary" onClick={() => {}} />
        </div>
      </div>
      <div className="schedule-grid">
        {weekDays.map(d => <div key={d} className="schedule-day-label">{d}</div>)}
        {days.map(d => (
          <div key={d} className="schedule-cell">
            <span style={{fontSize:'0.8rem', color: '#94a3b8'}}>{d}</span>
            {events.filter(e => e.day === d).map((e, idx) => (
              <div key={idx} className="schedule-event">{e.title}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
