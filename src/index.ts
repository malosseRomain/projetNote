import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import PostService from "./services/PostService";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");

const postService = new PostService();

app.get("/", (req: Request, res: Response): void => {
    res.render("home");
});

app.get("/posts", (req: Request, res: Response): void => {
    res.render("posts", { posts: postService.getAllPosts() });
});

app.post("/posts", (req: Request, res: Response): void => {
    postService.createPost(req.body);
    res.redirect("/posts");
});

app.get("/posts/new", (req: Request, res: Response): void => {
    res.render("new-post");
});

app.get("/posts/:id/edit", (req: Request, res: Response): void => {
    const postId: number = parseInt(req.params.id);

    if (!postService.getPostById(postId)) {
        res.status(404).json({ error: "Post not found" });
        return;
    }

    res.render("edit-post", { post: postService.getPostById(postId) });
});

app.get("/posts/:id", (req: Request, res: Response): void => {
    const postId: number = parseInt(req.params.id);

    if (!postService.getPostById(postId)) {
        res.status(404).json({ error: "Post not found" });
        return;
    }

    res.render("post", { post: postService.getPostById(postId) });
});

app.post("/posts/:id", (req: Request, res: Response): void => {
    console.log(req.params.id);
    postService.updatePost(parseInt(req.params.id), req.body);
    res.redirect(`/posts/${req.params.id}`);
});

const PORT: number | string = process.env.PORT || 3009;

app.listen(PORT, (): void => {
    console.log(`Server running on http://localhost:${PORT}`);
});
