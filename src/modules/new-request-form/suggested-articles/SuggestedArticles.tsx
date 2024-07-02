import { Anchor } from "@zendeskgarden/react-buttons";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDebounce } from "../useDebounce";
import { useTranslation } from "react-i18next";

interface SuggestedArticlesProps {
  query?: string;
  locale: string;
}

interface SuggestedArticle {
  name: string;
  html_url: string;
}

interface SuggestedArticlesResponse {
  results: SuggestedArticle[];
}

const slideIn = keyframes`
  from {
    grid-template-rows: 0fr;
  }
  to {
    grid-template-rows: 1fr;
  }
`;

const Container = styled.div`
  display: grid;
  animation: ${slideIn} 200ms forwards;
`;

const InnerContainer = styled.div`
  overflow: hidden;
`;

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin: ${(props) => props.theme.space.sm} 0;
`;

function hasMinLength(value: string): boolean {
  const firstLetter = value.charCodeAt(0);
  /*
   * Special case considering CJK characters. Since ideographs represent
   * whole words, we want to start searching when just two has been typed.
   *
   * Unicode range reference:
   * http://www.unicode.org/versions/Unicode5.0.0/ch12.pdf#G16616
   */
  if (firstLetter >= 0x4e00 && firstLetter <= 0x2fa1f) {
    return value.length >= 2;
  } else {
    return value.length >= 3;
  }
}

type RequestsCache = Record<string, SuggestedArticle[]>;

export function SuggestedArticles({
  query: inputQuery,
  locale,
}: SuggestedArticlesProps): JSX.Element | null {
  const debouncedQuery = useDebounce(inputQuery, 500);
  const [articles, setArticles] = useState<SuggestedArticle[]>([]);
  const requestsCache = useRef<RequestsCache>({});
  const { t } = useTranslation();

  useEffect(() => {
    const query = debouncedQuery?.trim().toLocaleLowerCase();

    if (!query || !hasMinLength(query)) {
      setArticles([]);
      return;
    }

    const requestUrl = new URL(
      `${window.location.origin}/api/v2/help_center/deflection/suggestions.json`
    );
    requestUrl.searchParams.append("locale", locale);
    requestUrl.searchParams.append("query", query);

    const cachedResponse = requestsCache.current[requestUrl.toString()];

    if (cachedResponse) {
      setArticles(cachedResponse);
      return;
    }

    fetch(requestUrl)
      .then((response) => response.json())
      .then(({ results }: SuggestedArticlesResponse) => {
        requestsCache.current[requestUrl.toString()] = results;
        setArticles(results);
      });
  }, [debouncedQuery, locale]);

  return articles.length > 0 ? (
    <Container data-test-id="suggested-articles">
      <InnerContainer>
        <h2>
          {t("new-request-form.suggested-articles", "Suggested articles")}
        </h2>
        <UnstyledList>
          {articles.map((article) => (
            <ListItem key={article.html_url}>
              <Anchor href={article.html_url}>{article.name}</Anchor>
            </ListItem>
          ))}
        </UnstyledList>
      </InnerContainer>
    </Container>
  ) : null;
}
