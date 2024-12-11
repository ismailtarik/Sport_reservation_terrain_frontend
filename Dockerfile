# Utiliser une image Node.js pour construire et exécuter l'application
FROM node:18

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le container
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers de l'application dans le container
COPY . .

# Exposer le port utilisé par l'application (par défaut 3000 pour React)
EXPOSE 3000

# Lancer le serveur de développement React
CMD ["npm", "start"]