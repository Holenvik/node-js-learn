import url from "url";

export const userHobbiesRequests = (req, res, userId, users, changeUsers) => {
  switch (req.method) {
    case "GET": {
      const user = users.find((user) => user.id === userId);

      if (user) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "max-age=3600, public");
        res.end(JSON.stringify(user.hobbies));
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }

      break;
    }

    case "POST": {
      const { hobby } = url.parse(req.url, true).query;

      changeUsers(
        users.map((user) =>
          user.id === userId
            ? { ...user, hobbies: [...user.hobbies, hobby] }
            : user
        )
      );

      const updatedUser = users.find((user) => user.id === userId);

      if (updatedUser) {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedUser.hobbies));
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }

      break;
    }

    case "DELETE": {
      const { hobby } = url.parse(req.url, true).query;

      changeUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                hobbies: user.hobbies.filter(
                  (hobbyItem) => hobbyItem !== hobby
                ),
              }
            : user
        )
      );

      const updatedUser = users.find((user) => user.id === userId);

      if (updatedUser) {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedUser.hobbies));
      } else {
        res.statusCode = 404;
        res.end("User not found");
      }

      break;
    }
  }
};
