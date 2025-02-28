import Sentry from "@sentry/node";
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import PostService from "./services/PostService";

const app = express();

Sentry.init({
    dsn: "https://0289822d16e036ff92b22c6e15dc6173@o4508896384122880.ingest.de.sentry.io/4508896389759056",
    tracesSampleRate: 1.0,
});

//Partie 1 de l'erreur pour Sentry
//app.use(Sentry.requestHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");

//Partie 2 de l'erreur
/*app.get("/debug-sentry", (req: Request, res: Response) => {
    throw new Error("Ceci est une erreur volontaire pour tester Sentry !");
});*/

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
