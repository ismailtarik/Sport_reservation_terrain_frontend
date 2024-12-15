FROM node:18-alpine
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy project files
COPY . .
# Expose port 3000 (default React dev server port)
EXPOSE 3000
# Start development server
CMD ["npm", "start"]

