# projetNote
projet noté de compléxité algo



### 1. Linting des commits

Utilisation de **Commitlint** et **Husky** pour garantir que les messages de commit suivent le Conventional Commits.

#### Configuration :

- **Commitlint** valide que les messages de commit suivent la convention `Conventional Commits`.
- **Husky** active un hook `commit-msg` pour s'assurer que les messages de commit respectent la convention Conventional Commits et valider leur conformité avant d'accepter le commit.



### 2. Mise en Place des Outils de Qualité

#### 2.1 Prettier

Utilisation de **Prettier** pour garantir un formatage cohérent du code. La configuration de Prettier est la suivante :

- **4 espaces** pour l'indentation
- **Point-virgule** à la fin de chaque ligne
- **Double quotes** pour les chaînes de caractères
- **Pas de virgule** à la fin des objets et des tableaux
- **Largeur de 180 caractères**

#### 2.2 ESLint

Nous avons configuré **ESLint** avec la configuration recommandée, intégrée avec Prettier pour éviter les conflits. Les règles importantes incluent :

### Scripts dans `package.json`

Les scripts suivants sont définis dans le `package.json` :

- `npm run format` : Formate le code avec Prettier.
- `npm run lint` : Exécute ESLint pour détecter les erreurs.
- `npm run lint:fix` : Corrige automatiquement les erreurs de linting avec ESLint.

### Configuration de l'IDE

Pour formater le code automatiquement à chaque sauvegarde dans Visual Studio Code :

    Activez Format On Save dans les parametre dans les parametres.
    Ajoutez "editor.formatOnSave": true dans le fichier settings.json.

Ensuite, pour utiliser Prettier pour le formatage automatique, ajoutez "editor.defaultFormatter": "esbenp.prettier-vscode".

Pour voir les erreurs de linting directement dans l'éditeur, ajoutez dans settings.json :

  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.run": "onSave"

Cela permet de détecter et d'afficher les erreurs de linting en temps réel.

### 3. Passage à TypeScript




### 5. Tests Unitaires et End-to-End

#### Tests Unitaires : 

Utilisation du package `Vitest`

Les fichiers de test unitaire ce situe dans src/tests/

##### Configuration de vitest dans le fichier `vitest.config.ts`: 

- **include**: permet d'inclure les chemins des tests a effectuer. 
- **coverage**: sert à spécifier le moteur utilisé pour analyser la couverture de code. 


#### Test End to End: 

**!! Attention: Modifier la variable BASE_URL des fichiers test avec l'URL de votre projet !!**

**!! Attention: Modifier dans le fichier `playwright.config.ts` l'url du webserver avec l'URL que votre projet utilise !!**

Utilisation du package `Playwright` 

Les fichiers de test e2e ce situe dans src/e2e/

##### Configuration de vitest dans le fichier :`playwright.config.ts`:

- **webserver**: sert à démarrer une application en mode développement.
- **testDir**: sert a mettre le chemin du dossier des fichiers de test.
- **testMatch**: sert a savoir les extensions des fichiers de test.

### Scripts dans `package.json` pour les tests 

- `npm run test` : Permet de lancer les tests unitaires effectuer.
- `npm run test:e2e` : Permet de lancer les tests End to End effectuer.
- `npm run test:watch` : Dès la modification d'un fichier, les tests associés sont relancés automatiquement.
- `npm run test:coverage` : Génère un rapport de couverture de code.
