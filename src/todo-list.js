const TODO_API_BASE_URL = "http://localhost:3000";

const isUserAnonymous = () => window.HelpCenter.user.role === "anonymous";

const showAppContent = () => {
  isUserAnonymous() ? showSignInMessage() : loadTodoItems();
};

const showSignInMessage = () => {
  const signInMessage = "<p>You must be logged in to use this app.</p>";
  document.getElementById("todo_app_content").innerHTML = signInMessage;
};

const loadTodoItems = async () => {
  await getJwt();
  const todoItems = await todoRequest("/todo_items", "GET");
  refreshTodoList(todoItems);
};

const addTodoItem = async () => {
  const todoItemInput = document.getElementById("todo_item");
  const requestBody = { value: todoItemInput.value };
  const todoItems = await todoRequest("/todo_items", "POST", requestBody);
  refreshTodoList(todoItems);
  todoItemInput.value = "";
};

const deleteTodoItem = async (todoItemId) => {
  const todoItems = await todoRequest(`/todo_items/${todoItemId}`, "DELETE");
  refreshTodoList(todoItems);
};

const todoRequest = async (endpoint, method, body) => {
  const jwt = await getJwt();
  const options = {
    method: method,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${TODO_API_BASE_URL}${endpoint}`, options);
  const responseBody = await response.json();
  return responseBody.todo_items;
};

const refreshTodoList = (todoItems) => {
  const container = document.getElementById("todo_list");

  container.innerHTML = "";

  for (const item of todoItems) {
    const li = document.createElement("li");
    const text = document.createTextNode(item.value + " ");
    const button = document.createElement("button");
    button.innerHTML = "&#10006;";
    button.addEventListener("click", () => deleteTodoItem(item.id));
    li.appendChild(text);
    li.appendChild(button);
    container.appendChild(li);
  }
};

const getJwt = async () =>
  isTokenExpired(localStorage.jwt)
    ? await refreshJwt()
    : JSON.parse(localStorage.jwt).value;

const isTokenExpired = (token) =>
  !token || Date.now() > JSON.parse(token).expiresAt;

const refreshJwt = async () => {
  const { token } = await fetch("/hc/api/v2/integration/token").then(
    (response) => response.json()
  );
  setToken("jwt", token, 1);
  return token;
};

const setToken = (key, value, ttl) => {
  const data = { value, expiresAt: Date.now() + ttl * 1000 };
  localStorage.setItem(key, JSON.stringify(data));
};

window.addEventListener("DOMContentLoaded", () => {
  showAppContent();
  document.getElementById("add-item").addEventListener("click", addTodoItem);
});
