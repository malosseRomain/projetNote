"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const BASE_URL = "http://localhost:3009";
test_1.test.describe("Page d'accueil", () => {
    (0, test_1.test)("Présence du titre et contenu correct", (_a) =>
        __awaiter(void 0, [_a], void 0, function* ({ page }) {
            yield page.goto(BASE_URL);
            const title = yield page.locator("h1");
            yield (0, test_1.expect)(title).toBeVisible();
            yield (0, test_1.expect)(title).toHaveText("Bienvenue sur Super Blog");
        })
    );
    (0, test_1.test)("Présence du lien vers la liste des articles", (_a) =>
        __awaiter(void 0, [_a], void 0, function* ({ page }) {
            yield page.goto(BASE_URL);
            const articleLink = yield page.locator("a[href='/posts']");
            yield (0, test_1.expect)(articleLink).toBeVisible();
            yield articleLink.click();
            yield (0, test_1.expect)(page).toHaveURL(`${BASE_URL}/posts`);
        })
    );
});
test_1.test.describe("Page liste des articles", () => {
    (0, test_1.test)("Présence du titre et contenu correct", (_a) =>
        __awaiter(void 0, [_a], void 0, function* ({ page }) {
            yield page.goto(`${BASE_URL}/posts`);
            const title = yield page.locator("h1");
            yield (0, test_1.expect)(title).toBeVisible();
            yield (0, test_1.expect)(title).toHaveText("Liste des articles");
        })
    );
    (0, test_1.test)("Présence du bouton 'Nouvel article' et fonctionnement", (_a) =>
        __awaiter(void 0, [_a], void 0, function* ({ page }) {
            yield page.goto(`${BASE_URL}/posts`);
            const createButton = yield page.locator("a[href='/posts/new']");
            yield (0, test_1.expect)(createButton).toBeVisible();
            yield createButton.click();
            yield (0, test_1.expect)(page).toHaveURL(`${BASE_URL}/posts/new`);
        })
    );
});
test_1.test.describe("User Story : Création et modification d'un article", () => {
    let postId;
    (0, test_1.test)("Créer un article et vérifier sa présence", (_a) =>
        __awaiter(void 0, [_a], void 0, function* ({ page }) {
            yield page.goto(`${BASE_URL}/posts/new`);
            // Remplir le formulaire
            yield page.fill("input[name='title']", "Mon premier article");
            yield page.fill("textarea[name='content']", "Ceci est un test Playwright");
            yield page.fill("input[name='author']", "Testeur Pro");
            // confirmer le formulaire
            yield page.click("button[type='submit']");
            yield (0, test_1.expect)(page).toHaveURL(`${BASE_URL}/posts`);
            // Vérifier que l'article est dans la liste
            const newArticle = yield page.locator("h2", { hasText: "Mon premier article" });
            yield (0, test_1.expect)(newArticle).toBeVisible();
            // Récupérer l'ID de l'article récupération depuis le lien
            const articleLink = yield page.locator(`a[href^='/posts/']:has-text("Mon premier article")`);
            const href = yield articleLink.getAttribute("href");
            if (href) {
                postId = href.split("/")[2]; // Extraction de l'ID depuis "/posts/:id"
            }
        })
    );
    (0, test_1.test)("Modifier l'article et vérifier la mise à jour", (_a) =>
        __awaiter(void 0, [_a], void 0, function* ({ page }) {
            if (!postId) test_1.test.skip(); // vérifie si on a un id correct
            yield page.goto(`${BASE_URL}/posts/${postId}/edit`);
            // Modifi le contenu
            yield page.fill("input[name='title']", "Article modifié");
            yield page.fill("textarea[name='content']", "Contenu mis à jour avec Playwright");
            // Sauvegarde
            yield page.click("button[type='submit']");
            yield (0, test_1.expect)(page).toHaveURL(`${BASE_URL}/posts/${postId}`);
            // Vérifie la mise à jour de l'article
            const updatedArticle = yield page.locator("h1", { hasText: "Article modifié" });
            yield (0, test_1.expect)(updatedArticle).toBeVisible();
        })
    );
});
