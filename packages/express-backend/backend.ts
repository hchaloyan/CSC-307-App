// backend.ts
import express from "express";
import type {Request, Response} from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


interface User {
    id: number;
    name: string;
    job: string;
}


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const addUser = (user: User) => {
  user.id = generateId();
  users["users_list"].push(user);
  return user;
};

const deleteUser = (user: User) => {
  users["users_list"] = users["users_list"].filter(u => u.id != user.id)
  return users["users_list"];
};

const generateId = () => {
  return Math.floor(Math.random() * 100000) 
}

app.post("/users", (req: Request, res: Response) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.delete("/users", (req: Request, res: Response) => {
    const userToDelete = req.body;
    
    const oldList = users["users_list"];
    
    deleteUser(userToDelete);

    if( users["users_list"] === oldList) {
      res.status(404).send("Resource not found.")
    }
    else{
      res.status(204).send();
    } 
});

const findUserByName = (name: string) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id: string) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByNameAndJob = (name: string, job: string) => {

    const nameFiltered = findUserByName(name)

    return nameFiltered.filter(
        (user) => user["job"] === job
    );
}

app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id as string
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name as string
  if (name != undefined) {
    let result = findUserByName(name);
    res.send( { users_list: result } );
  } else {
    res.send(users);
  }
});

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name as string
  const job = req.query.job as string
  
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
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