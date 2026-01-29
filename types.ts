
export enum AttendanceStatus {
  AT_WORK = '업무중',
  AWAY = '자리비움',
  OFF = '퇴근/미출근',
  BREAK = '휴식중'
}

export interface AttendanceRecord {
  checkIn?: string;
  checkOut?: string;
  totalHours?: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: AttendanceStatus;
  avatar: string;
  records: AttendanceRecord;
}

export interface TeamInsight {
  summary: string;
  mood: string;
  tip: string;
}
