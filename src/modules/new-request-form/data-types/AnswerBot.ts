export interface AnswerBot {
  auth_token: string | null;
  interaction_access_token: string | null;
  articles: AnswerBotArticle[];
  request_id: number | null;
}

export interface AnswerBotArticle {
  article_id: number;
  html_url: string;
  title: string;
  snippet: string;
}

export interface CitationArticle {
  id: string;
  article_id: number;
  html_url: string;
  title: string;
}
export interface GenerativeAnswerBotResponse {
  status_code: string;
  generated_answer: string;
  citations: CitationArticle[];
  prediction_language: string;
  ticket_deflection: {
    auth_token: string;
  };
}

export enum FeedbackType {
  POSITIVE = "resolution",
  NEGATIVE = "rejection",
}
