// backend.ts
import express from "express";
import type {Request, Response} from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const findUserByName = (name: string) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name as string
  if (name != undefined) {
    let result = findUserByName(name);
    res.send( { users_list: result } );
  } else {
    res.send(users);
  }
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};