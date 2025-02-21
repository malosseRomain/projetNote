import { describe, it, expect, beforeEach } from "vitest";
import PostService from "../services/PostService";

describe("PostService", () => {
    let postService: PostService;

    beforeEach(() => {
        postService = new PostService();
    });

    it("création d'un post", () => {
        const newPost = postService.createPost({
            title: "Titre Test",
            content: "Contenu Test",
            author: "Auteur Test"
        });

        expect(newPost).toMatchObject({
            title: "Titre Test",
            content: "Contenu Test",
            author: "Auteur Test"
        });

        expect(newPost).toHaveProperty("id");
        expect(newPost).toHaveProperty("createdAt");
    });

    it("récupération d'un post par ID", () => {
        const post = postService.createPost({
            title: "Titre Unique",
            content: "Contenu Unique",
            author: "Auteur Unique"
        });

        const fetchedPost = postService.getPostById(post.id);
        expect(fetchedPost).toEqual(post);
    });

    it("mise à jour d'un post", () => {
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

        expect(updatedPost).toMatchObject({
            title: "Nouveau Titre",
            content: "Nouveau Contenu",
            author: "Nouvel Auteur"
        });
    });
});
