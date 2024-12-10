# Étape 1: Utiliser une image Node.js pour construire et exécuter l'application
FROM node:18 AS build

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) dans le container
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le container
COPY . .

# Construire l'application pour production (si nécessaire, sinon tu peux omettre cette étape)
RUN npm run build

# Étape 2: Utiliser l'image Node.js pour exécuter l'application
FROM node:18

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier le code source de l'application
COPY --from=build /app /app

# Exposer le port utilisé par le serveur de développement React (par défaut 3000)
EXPOSE 3000

# Lancer le serveur de développement React
CMD ["npm", "start"]
