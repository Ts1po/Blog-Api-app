import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Lorem ipsum",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    author: "Jack allen",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Lorem ipsum",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    author: "George Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Lorem ipsum",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    author: "Jenny Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/posts", (req, res)=> {
  res.json(posts);
}); 

app.get("/posts/:id", (req, res) =>{
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.post("/posts", (req, res) =>{
  const newPostId = lastId += 1;
  const post = {
    id : newPostId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(), 
  };
  lastId = newPostId;
  posts.push(post);
  res.sendStatus(201).json(post); 
});

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p)=> p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({messege: "Post not found"});
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const delById = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if(delById === -1) return res.sendStatus(404).json({message: "Post not fount"});
  posts.splice(delById, 1);
  res.json({message: "Post deleted"});
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
