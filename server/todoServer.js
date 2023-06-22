const express = require("express");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const cors = require("cors");
const bodyParser = require("body-parser");
const { JsonDB, Config } = require("node-json-db");

const app = express();
const port = 3000;

const ZENDESK_SUBDOMAIN = "YOUR_ZENDESK_SUBDOMAIN";
const DATABASE_FILE_NAME = "todoDatabase";

const authMiddleware = async (request, response, next) => {
  try {
    const token = getTokenFromAuthHeader(request);
    const verifiedTokenPayload = await verifyToken(token);
    request.userId = verifiedTokenPayload.userId;
    next();
  } catch (err) {
    console.error(err);
    response.status(401).json({ message: "Invalid authentication" });
  }
};

const getTokenFromAuthHeader = (request) => {
  const authorization = request.headers?.authorization;
  if (!authorization) {
    throw new Error("Authorization header missing");
  }
  return authorization.split(" ")[1];
};

const verifyToken = async (token) => {
  const publicKey = await getPublicKeyFromJwks(
    jwt.decode(token, { complete: true })
  );
  return jwt.verify(token, publicKey);
};
const getPublicKeyFromJwks = async (decodedToken) => {
  const jwksClientInstance = jwksClient({
    jwksUri: `https://${ZENDESK_SUBDOMAIN}.zendesk.com/hc/api/v2/integration/keys.json`,
  });
  const kid = decodedToken.header.kid;
  const signingKey = await jwksClientInstance.getSigningKey(kid);
  return signingKey.rsaPublicKey;
};

app.use(cors());
app.use(authMiddleware);
app.use(bodyParser.json());

// In production, use a database
const db = new JsonDB(new Config(DATABASE_FILE_NAME, true, false, "/"));

app.get("/todo_items", async (request, response) => {
  const todoItems = await getUserTodoItems(request.userId);
  response.json({ todo_items: todoItems });
});

app.post("/todo_items", async (request, response) => {
  const todoItems = await getUserTodoItems(request.userId);
  const newItemId = Math.floor(Date.now() * Math.random());
  const newItem = { id: newItemId, value: request.body.value };
  todoItems.push(newItem);
  db.push(`/${request.userId}/todo_items`, todoItems);
  response.json({ todo_items: todoItems });
});

app.delete("/todo_items/:itemId", async (request, response) => {
  const todoItems = await getUserTodoItems(request.userId);
  const itemIdToDelete = parseInt(request.params.itemId);
  const filteredTodoItems = todoItems.filter(
    (item) => item.id !== itemIdToDelete
  );
  db.push(`/${request.userId}/todo_items`, filteredTodoItems);
  response.json({ todo_items: filteredTodoItems });
});

const getUserTodoItems = async (userId) => {
  const dataPath = `/${userId}/todo_items`;
  const dataPathExists = await db.exists(dataPath);
  return dataPathExists ? await db.getData(dataPath) : [];
};

app.listen(port, () => {
  console.log(`Server running on port ${port}. Visit http://localhost:${port}`);
});
