
import { GoogleGenAI, Type } from "@google/genai";
import { TeamMember, TeamInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTeamInsight = async (members: TeamMember[]): Promise<TeamInsight> => {
  const atWorkCount = members.filter(m => m.status !== '퇴근/미출근').length;
  const prompt = `현재 팀원 10명 중 ${atWorkCount}명이 근무 중입니다. 
  전체 팀원의 역할은 프론트엔드, 디자인, 백엔드 등 다양합니다. 
  이 상황에 어울리는 한국어 팀 요약 정보와 분위기, 그리고 오늘의 팁을 JSON 형식으로 작성해줘. 
  따뜻하고 격려하는 어조를 사용해줘.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: '팀 전체 업무 현황 요약' },
            mood: { type: Type.STRING, description: '현재 팀 분위기' },
            tip: { type: Type.STRING, description: '오늘의 한마디 또는 팁' }
          },
          required: ["summary", "mood", "tip"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      summary: "팀원들이 각자의 위치에서 최선을 다하고 있습니다.",
      mood: "차분하고 집중력 있는 분위기",
      tip: "잠시 스트레칭을 하며 눈의 피로를 풀어보세요."
    };
  }
};
