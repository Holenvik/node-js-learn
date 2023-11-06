import url from "url";

export const userRequests = (req, res, userId, users, changeUsers) => {
  switch (req.method) {
    case "GET": {
      const user = users.find((user) => user.id === userId);

      if (user) {
        const { hobbies, ...otherUserOptions } = user;

        const userWithLinks = {
          ...otherUserOptions,
          links: [
            {
              rel: "self",
              href: `/user/${user.id}`,
            },
            {
              rel: "hobbies",
              href: `/userHobbies/${user.id}`,
            },
          ],
        };

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(userWithLinks));
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }

      break;
    }

    case "DELETE": {
      if (userId) {
        changeUsers(users.filter((user) => user.id !== userId));
        res.statusCode = 204;
        res.end();
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }

      break;
    }

    case "PUT": {
      if (userId) {
        const { email, name } = url.parse(req.url, true).query;

        changeUsers(
          users.map((user) => {
            return user.id === userId
              ? { ...user, email: email || user.email, name: name || user.name }
              : user;
          })
        );
        res.statusCode = 204;
        res.end();
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }

      break;
    }
  }
};
