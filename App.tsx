
import React, { useState, useEffect, useCallback } from 'react';
import { TeamMember, AttendanceStatus, TeamInsight } from './types';
import { INITIAL_MEMBERS } from './constants';
import Clock from './components/Clock';
import MemberCard from './components/MemberCard';
import { getTeamInsight } from './services/geminiService';

const App: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('team-attendance');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [insight, setInsight] = useState<TeamInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  // 로컬 스토리지 저장
  useEffect(() => {
    localStorage.setItem('team-attendance', JSON.stringify(members));
  }, [members]);

  const fetchInsight = useCallback(async () => {
    setIsLoadingInsight(true);
    const result = await getTeamInsight(members);
    setInsight(result);
    setIsLoadingInsight(false);
  }, [members]);

  // 최초 렌더링 시 AI 인사이트 가져오기
  useEffect(() => {
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = (id: number, newStatus: AttendanceStatus) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        const now = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
        return {
          ...m,
          status: newStatus,
          records: {
            ...m.records,
            checkIn: newStatus === AttendanceStatus.AT_WORK ? now : m.records.checkIn,
            checkOut: newStatus === AttendanceStatus.OFF ? now : m.records.checkOut
          }
        };
      }
      return m;
    }));
  };

  const totalAtWork = members.filter(m => m.status === AttendanceStatus.AT_WORK).length;
  const totalAway = members.filter(m => m.status === AttendanceStatus.AWAY || m.status === AttendanceStatus.BREAK).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-12 transition-all">
      {/* 상단 네비게이션 */}
      <header className="sticky top-0 z-10 glass-morphism border-b border-slate-200 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Team-Hub</h1>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Attendance System</p>
            </div>
          </div>
          <Clock />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-8">
        {/* 요약 통계 섹션 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium mb-1">근무 중인 팀원</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-emerald-600">{totalAtWork}</span>
              <span className="text-slate-400 mb-1 font-medium">/ 10명</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium mb-1">자리비움/휴식</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-amber-500">{totalAway}</span>
              <span className="text-slate-400 mb-1 font-medium">명</span>
            </div>
          </div>
          
          {/* AI 인사이트 박스 */}
          <div className="col-span-1 sm:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM16.464 16.464a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">AI 팀 인사이트</span>
                </div>
                <button 
                  onClick={fetchInsight}
                  disabled={isLoadingInsight}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isLoadingInsight ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              {insight ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <p className="text-sm font-bold leading-tight">{insight.summary}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 bg-white/20 rounded-full font-medium">{insight.mood}</span>
                    <p className="text-xs opacity-90 italic">"{insight.tip}"</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm opacity-60">오늘의 팀 분위기를 분석하는 중입니다...</p>
              )}
            </div>
            {/* 배경 데코레이션 */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </section>

        {/* 팀원 리스트 섹션 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">팀원 근무 현황</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Real-time status</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {members.map(member => (
              <MemberCard 
                key={member.id} 
                member={member} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-200 pt-8 pb-12 text-center px-6">
        <p className="text-slate-400 text-sm font-medium">© 2024 Team-Hub Korea. Designed for the most beautiful 10 people.</p>
        <p className="text-slate-300 text-xs mt-1">Responsive Interface • Gemini AI Engine • Web Standard Compliant</p>
      </footer>
    </div>
  );
};

export default App;
