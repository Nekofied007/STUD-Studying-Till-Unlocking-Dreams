/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Shared types for Users API
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserBody {
  name: string;
  email: string;
}

// Study processing API
export type StudyProcessAction = "playlists" | "quizzes" | "roadmap";

export interface ProcessStudyRequest {
  url: string;
  action: StudyProcessAction;
}

export interface ProcessStudyResponse {
  status: "ok" | "error";
  message: string;
  // Optional demo payloads per action
  data?: {
    playlists?: Array<{ title: string; items: number }>;
    quizzes?: Array<{ topic: string; questions: number }>;
    roadmap?: Array<{ phase: string; durationWeeks: number }>;
  };
}
