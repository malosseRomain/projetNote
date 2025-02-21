import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3009";

test.describe("Page d'accueil", () => {
    test("Présence du titre et contenu correct", async ({ page }) => {
        await page.goto(BASE_URL);
        const title = await page.locator("h1");
        await expect(title).toBeVisible();
        await expect(title).toHaveText("Bienvenue sur Super Blog");
    });

    test("Présence du lien vers la liste des articles", async ({ page }) => {
        await page.goto(BASE_URL);
        const articleLink = await page.locator("a[href='/posts']");
        await expect(articleLink).toBeVisible();
        await articleLink.click();
        await expect(page).toHaveURL(`${BASE_URL}/posts`);
    });
});

test.describe("Page liste des articles", () => {
    test("Présence du titre et contenu correct", async ({ page }) => {
        await page.goto(`${BASE_URL}/posts`);
        const title = await page.locator("h1");
        await expect(title).toBeVisible();
        await expect(title).toHaveText("Liste des articles");
    });

    test("Présence du bouton 'Nouvel article' et fonctionnement", async ({ page }) => {
        await page.goto(`${BASE_URL}/posts`);
        const createButton = await page.locator("a[href='/posts/new']");
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(page).toHaveURL(`${BASE_URL}/posts/new`);
    });
});

test.describe("User Story : Création et modification d'un article", () => {
    let postId: string;

    test("Créer un article et vérifier sa présence", async ({ page }) => {
        await page.goto(`${BASE_URL}/posts/new`);

        // Remplir le formulaire
        await page.fill("input[name='title']", "Mon premier article");
        await page.fill("textarea[name='content']", "Ceci est un test Playwright");
        await page.fill("input[name='author']", "Testeur Pro");

        // confirmer le formulaire
        await page.click("button[type='submit']");
        await expect(page).toHaveURL(`${BASE_URL}/posts`);

        // Vérifier que l'article est dans la liste
        const newArticle = await page.locator("h2", { hasText: "Mon premier article" });
        await expect(newArticle).toBeVisible();

        // Récupérer l'ID de l'article récupération depuis le lien
        const articleLink = await page.locator(`a[href^='/posts/']:has-text("Mon premier article")`);
        const href = await articleLink.getAttribute("href");
        if (href) {
            postId = href.split("/")[2]; // Extraction de l'ID depuis "/posts/:id"
        }
    });

    test("Modifier l'article et vérifier la mise à jour", async ({ page }) => {
        if (!postId) test.skip(); // vérifie si on a un id correct

        await page.goto(`${BASE_URL}/posts/${postId}/edit`);

        // Modifi le contenu
        await page.fill("input[name='title']", "Article modifié");
        await page.fill("textarea[name='content']", "Contenu mis à jour avec Playwright");

        // Sauvegarde
        await page.click("button[type='submit']");
        await expect(page).toHaveURL(`${BASE_URL}/posts/${postId}`);

        // Vérifie la mise à jour de l'article
        const updatedArticle = await page.locator("h1", { hasText: "Article modifié" });
        await expect(updatedArticle).toBeVisible();
    });
});
