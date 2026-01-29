
import { TeamMember, AttendanceStatus } from './types';

export const INITIAL_MEMBERS: TeamMember[] = [
  { id: 1, name: '김민준', role: '프론트엔드 리드', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p1/200/200', records: {} },
  { id: 2, name: '이서연', role: 'UI/UX 디자이너', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p2/200/200', records: {} },
  { id: 3, name: '박지훈', role: '백엔드 엔지니어', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p3/200/200', records: {} },
  { id: 4, name: '최윤서', role: '프로덕트 매니저', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p4/200/200', records: {} },
  { id: 5, name: '정현우', role: 'QA 엔지니어', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p5/200/200', records: {} },
  { id: 6, name: '강지혜', role: '마케팅 리드', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p6/200/200', records: {} },
  { id: 7, name: '조민지', role: '데이터 분석가', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p7/200/200', records: {} },
  { id: 8, name: '윤도현', role: 'DevOps 엔지니어', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p8/200/200', records: {} },
  { id: 9, name: '임재혁', role: '모바일 개발자', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p9/200/200', records: {} },
  { id: 10, name: '한소희', role: '브랜드 디자이너', status: AttendanceStatus.OFF, avatar: 'https://picsum.photos/seed/p10/200/200', records: {} },
];
