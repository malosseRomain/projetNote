"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const PostService_1 = __importDefault(require("../services/PostService"));
(0, vitest_1.describe)("PostService", () => {
    let postService;
    (0, vitest_1.beforeEach)(() => {
        postService = new PostService_1.default();
    });
    (0, vitest_1.it)("création d'un post", () => {
        const newPost = postService.createPost({
            title: "Titre Test",
            content: "Contenu Test",
            author: "Auteur Test"
        });
        (0, vitest_1.expect)(newPost).toMatchObject({
            title: "Titre Test",
            content: "Contenu Test",
            author: "Auteur Test"
        });
        (0, vitest_1.expect)(newPost).toHaveProperty("id");
        (0, vitest_1.expect)(newPost).toHaveProperty("createdAt");
    });
    (0, vitest_1.it)("récupération d'un post par ID", () => {
        const post = postService.createPost({
            title: "Titre Unique",
            content: "Contenu Unique",
            author: "Auteur Unique"
        });
        const fetchedPost = postService.getPostById(post.id);
        (0, vitest_1.expect)(fetchedPost).toEqual(post);
    });
    (0, vitest_1.it)("mise à jour d'un post", () => {
        const post = postService.createPost({
            title: "Ancien Titre",
            content: "Ancien Contenu",
            author: "Ancien Auteur"
        });
        const updatedPost = postService.updatePost(post.id, {
            title: "Nouveau Titre",
            content: "Nouveau Contenu",
            author: "Nouvel Auteur"
        });
        (0, vitest_1.expect)(updatedPost).toMatchObject({
            title: "Nouveau Titre",
            content: "Nouveau Contenu",
            author: "Nouvel Auteur"
        });
    });
});
