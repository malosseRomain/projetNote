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

Passage du code JavaScript en TypeScript (rajout des types et changement des require)

Ajout des dépendance TypeScript (@types/express, @types/body-parser)

Modification des scripts dans package.json

npm start & npm dev Compile le code .ts en code .js avant de lancer node & nodemon

Ajout de npm compile pour compiler le code ts



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

### 7. Automatisation avec GitHub Actions

#### 7.1 Exécuter ESLint

L'analyse du code avec **ESLint** est automatisée via **GitHub Actions**. Chaque **push** ou **pull request** sur la branche **main** déclenche une pipeline CI qui :
    Récupère le code depuis le repository.
    Configure Node.js avec la version appropriée.
    Installe les dépendances via npm install.
    Exécute ESLint pour vérifier la qualité du code.

1️⃣ Premier commit → Un warning indiquait que la mise en cache de npm n'avait pas été trouvée.
2️⃣ Deuxième commit → La pipeline a échoué en raison d'une erreur dans la commande ESLint : une option invalide était utilisée.
3️⃣ Septième commit → J’ai ajouté une variable inutilisée pour tester si ESLint détectait bien les erreurs. Comme prévu, la pipeline a échoué avec le message suivant :
  Run ESLint: src/services/PostService.ts#L53
  'unused' is assigned a value but never used
Cela prouve que la vérification ESLint fonctionne correctement dans GitHub Actions.
4️⃣ Huitième commit → J’ai supprimé la ligne contenant la variable inutilisée. Après cette correction, la pipeline s'est exécutée avec succès.

Grâce à cette configuration, chaque commit est automatiquement vérifié, et toute erreur ESLint bloque le merge, garantissant ainsi un code propre et conforme aux règles définies.
