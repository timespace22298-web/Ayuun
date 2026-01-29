
import React from 'react';
import { TeamMember, AttendanceStatus } from '../types';

interface MemberCardProps {
  member: TeamMember;
  onStatusChange: (id: number, newStatus: AttendanceStatus) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onStatusChange }) => {
  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.AT_WORK: return 'bg-emerald-500';
      case AttendanceStatus.AWAY: return 'bg-amber-500';
      case AttendanceStatus.BREAK: return 'bg-sky-500';
      case AttendanceStatus.OFF: return 'bg-slate-300';
      default: return 'bg-slate-300';
    }
  };

  const getStatusTextClass = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.AT_WORK: return 'text-emerald-700 bg-emerald-50';
      case AttendanceStatus.AWAY: return 'text-amber-700 bg-amber-50';
      case AttendanceStatus.BREAK: return 'text-sky-700 bg-sky-50';
      case AttendanceStatus.OFF: return 'text-slate-500 bg-slate-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-indigo-100 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-50" />
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 truncate">{member.name}</h3>
          <p className="text-xs text-slate-500 truncate">{member.role}</p>
        </div>
        <div className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusTextClass(member.status)}`}>
          {member.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button 
          onClick={() => onStatusChange(member.id, AttendanceStatus.AT_WORK)}
          className="text-xs py-2 px-3 rounded-lg border border-slate-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-colors font-medium"
        >
          출근
        </button>
        <button 
          onClick={() => onStatusChange(member.id, AttendanceStatus.OFF)}
          className="text-xs py-2 px-3 rounded-lg border border-slate-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-colors font-medium"
        >
          퇴근
        </button>
        <button 
          onClick={() => onStatusChange(member.id, AttendanceStatus.AWAY)}
          className="text-xs py-2 px-3 rounded-lg border border-slate-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-colors font-medium"
        >
          외출
        </button>
        <button 
          onClick={() => onStatusChange(member.id, AttendanceStatus.BREAK)}
          className="text-xs py-2 px-3 rounded-lg border border-slate-200 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors font-medium"
        >
          휴식
        </button>
      </div>

      {member.records.checkIn && (
        <div className="text-[10px] text-slate-400 text-center border-t pt-2 mt-1">
          최근 체크인: {member.records.checkIn}
        </div>
      )}
    </div>
  );
};

export default MemberCard;
