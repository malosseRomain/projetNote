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