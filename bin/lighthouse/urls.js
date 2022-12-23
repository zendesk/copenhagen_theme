/**
 * Builds urls to audit by fetching the required ids
 * Account's API should have basic authentication enabled
 */
const fetch = require("node-fetch");

const fetchCategoryId = async (subdomain) => {
  const response = await fetch(
    `https://${subdomain}.zendesk.com/api/v2/help_center/categories`
  );
  const data = await response.json();
  const categoryId = data?.categories[0]?.id;

  if (!categoryId) {
    throw new Error(
      "No category found. Please make sure the account has at least one category."
    );
  }

  return categoryId;
};

const fetchSectionId = async (subdomain) => {
  const response = await fetch(
    `https://${subdomain}.zendesk.com/api/v2/help_center/sections`
  );
  const data = await response.json();
  const sectionId = data?.sections[0]?.id;

  if (!sectionId) {
    throw new Error(
      "No section found. Please make sure the account has at least one section."
    );
  }

  return sectionId;
};

const fetchArticleId = async (subdomain) => {
  const response = await fetch(
    `https://${subdomain}.zendesk.com/api/v2/help_center/articles`
  );
  const data = await response.json();
  const articleId = data?.articles[0]?.id;

  if (!articleId) {
    throw new Error(
      "No article found. Please make sure the account has at least one article."
    );
  }

  return articleId;
};

const fetchTopicId = async (subdomain) => {
  const response = await fetch(
    `https://${subdomain}.zendesk.com/api/v2/community/topics`
  );
  const data = await response.json();
  const topicId = data?.topics[0]?.id;

  if (!topicId) {
    throw new Error(
      "No community topic found. Please make sure the account has at least one community topic."
    );
  }

  return topicId;
};

const fetchPostId = async (subdomain) => {
  const response = await fetch(
    `https://${subdomain}.zendesk.com/api/v2/community/posts`
  );
  const data = await response.json();
  const postId = data?.posts[0]?.id;

  if (!postId) {
    throw new Error(
      "No community post found. Please make sure the account has at least one community post."
    );
  }

  return postId;
};

const fetchUserId = async (subdomain, email, password) => {
  const response = await fetch(
    `https://${subdomain}.zendesk.com/api/v2/users/me`,
    {
      headers: {
        authorization: `Basic ${Buffer.from(
          `${email}:${password}`,
          "binary"
        ).toString("base64")}`,
      },
    }
  );
  const data = await response.json();
  const userId = data?.user?.id;

  if (!userId) {
    throw new Error(
      "Fetching the user id failed. Please make sure this account's API has password access enabled. [Learn more](https://developer.zendesk.com/api-reference/introduction/security-and-auth/#basic-authentication)"
    );
  }

  return userId;
};

const fetchRequestId = async (subdomain, email, password) => {
  const response = await fetch(
    `https://${subdomain}.zendesk.com/api/v2/requests`,
    {
      headers: {
        authorization: `Basic ${Buffer.from(
          `${email}:${password}`,
          "binary"
        ).toString("base64")}`,
      },
    }
  );
  const data = await response.json();
  const requestId = data?.requests?.[0]?.id;

  if (!requestId) {
    throw new Error(
      "No request id found. Please make sure the user has at least one request and this account's API has password access enabled. [Learn more](https://developer.zendesk.com/api-reference/introduction/security-and-auth/#basic-authentication)"
    );
  }

  return requestId;
};

const buildUrlsFromAPI = async ({ subdomain, email, password }) => {
  const [categoryId, sectionId, articleId, topicId, postId, userId, requestId] =
    await Promise.all([
      fetchCategoryId(subdomain),
      fetchSectionId(subdomain),
      fetchArticleId(subdomain),
      fetchTopicId(subdomain),
      fetchPostId(subdomain),
      fetchUserId(subdomain, email, password),
      fetchRequestId(subdomain, email, password),
    ]);

  return [
    `https://${subdomain}.zendesk.com/hc/en-us`,
    `https://${subdomain}.zendesk.com/hc/en-us/categories/${categoryId}`,
    `https://${subdomain}.zendesk.com/hc/en-us/sections/${sectionId}`,
    `https://${subdomain}.zendesk.com/hc/en-us/articles/${articleId}`,
    `https://${subdomain}.zendesk.com/hc/en-us/requests/new`,
    `https://${subdomain}.zendesk.com/hc/en-us/search?utf8=%E2%9C%93&query=Help+Center`,
    `https://${subdomain}.zendesk.com/hc/en-us/community/topics`,
    `https://${subdomain}.zendesk.com/hc/en-us/community/topics/${topicId}`,
    `https://${subdomain}.zendesk.com/hc/en-us/community/posts`,
    `https://${subdomain}.zendesk.com/hc/en-us/community/posts/${postId}`,
    `https://${subdomain}.zendesk.com/hc/en-us/profiles/${userId}`,
    `https://${subdomain}.zendesk.com/hc/contributions/posts?locale=en-us`,
    `https://${subdomain}.zendesk.com/hc/en-us/subscriptions`,
    `https://${subdomain}.zendesk.com/hc/en-us/requests`,
    `https://${subdomain}.zendesk.com/hc/en-us/requests/${requestId}`,
    `https://${subdomain}.zendesk.com/hc/en-us/community/posts/new`,
  ];
};

module.exports = buildUrlsFromAPI;
