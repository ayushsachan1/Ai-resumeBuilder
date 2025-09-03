import { GoogleGenAI, Type } from "@google/genai";
import { AtsResult, ResumeData } from '../types';

function resumeDataToText(data: ResumeData): string {
  let text = `Name: ${data.personalInfo.name}\n`;
  text += `Contact: ${data.personalInfo.email}, ${data.personalInfo.phone}, ${data.personalInfo.address}\n`;
  text += `Links: ${data.personalInfo.linkedin}, ${data.personalInfo.website}\n\n`;
  text += `Summary:\n${data.summary}\n\n`;
  
  text += `Experience:\n`;
  data.experience.forEach(exp => {
    text += `- ${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
    text += `${exp.description}\n`;
  });
  text += `\n`;

  text += `Education:\n`;
  data.education.forEach(edu => {
    text += `- ${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
  });
  text += `\n`;

  text += `Skills:\n${data.skills.map(skill => skill.name).join(', ')}\n`;
  
  return text;
}


export async function getAtsScore(resumeData: ResumeData, jobDescription: string): Promise<AtsResult> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const resumeText = resumeDataToText(resumeData);

  const prompt = `Act as an advanced Applicant Tracking System (ATS). Analyze the following resume against the provided job description. Provide a score out of 100, highlight key strengths, offer specific, actionable suggestions for improvement, and suggest up to 5 relevant skills from the job description that are missing from the resume.

  **Resume:**
  ${resumeText}

  **Job Description:**
  ${jobDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "The ATS score from 0 to 100.",
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of key strengths where the resume aligns well with the job description.",
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of specific, actionable suggestions for improving the resume.",
            },
            suggestedSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of suggested skills from the job description that are missing in the resume."
            }
          },
          required: ["score", "strengths", "suggestions", "suggestedSkills"],
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as AtsResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get ATS score from Gemini API.");
  }
}

export async function improveContent(content: string): Promise<string> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `You are an expert resume writer. Rewrite the following text to be more professional, impactful, and concise for a resume. Return only the rewritten text, without any introductory phrases, markdown, or labels.

    **Original Text:**
    ${content}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API for content improvement:", error);
        throw new Error("Failed to improve content.");
    }
}
