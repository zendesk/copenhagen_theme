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
