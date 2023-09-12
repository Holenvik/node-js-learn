import http from "http";
import url from "url";
import { userHobbiesRequests } from "./userHobbiesEndpoint/index.mjs";
import { userRequests } from "./userEndpoint/index.mjs";

let users = [
  {
    id: 1,
    name: "Ann",
    email: "ann@google.com",
    hobbies: ["books", "sport", "dancing"],
  },
  {
    id: 2,
    name: "Ben",
    email: "ben@google.com",
    hobbies: ["series", "sport"],
  },
];

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const pathParts = pathname.split("/");
  const userId = Number(pathParts[2]);

  const changeUsers = (updatedUsers) => {
    users = updatedUsers;
  };

  if (pathname.startsWith("/userHobbies/")) {
    userHobbiesRequests(req, res, userId, users, changeUsers);
  } else if (pathname.startsWith("/user/")) {
    userRequests(req, res, userId, users, changeUsers);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3050);
