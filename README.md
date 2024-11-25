# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

---

## 🚀 Development

Run the development server:

```bash
npm run dev
```

---

## 🏗️ Deployment

First, build your app for production:

```bash
yarn build
```

Then, run the app in production mode:

```bash
yarn start
```

---

## 🧹 Linter

Run the linter to check for code quality issues:

```bash
yarn lint
```

---

## 🧪 Tests

Run the unit tests:

```bash
yarn test
```

---

## 🛠️ Format

Check code formatting:

```bash
yarn format:check
```

---

## 📖 Documentation

Generate documentation with [MkDocs](https://www.mkdocs.org/):

```bash
mkdocs build
```

---

# TP - CI

## 📜 Introduction

Hey! I'm a software developer. I just built the most amazing app but now, I am lost.
I need to make sure that future changes won't break the app.
I am pretty sure that this is the next Facebook or something, so make sure that nothing can break it!

This is the link to my GitHub Repository! Feel free to use it as a template.

---

## 🛡️ What I Need

I heard about unit testing, and while I always thought it was a waste of time, now that I expect millions of users, I want to be sure that everything is perfect. No need to write tests for 100% of the code—just for the class located at `/app/services/PokemonService.ts`. I already started writing some things, and I hope you'll like it!

---

## 🛠️ CI/CD Pipeline

I want the following checks to run on **every commit** to branches with pull requests and on the `main` and `develop` branches:
- Ensure the linter works.
- Ensure all tests pass.
- Ensure the project builds correctly.
- Ensure the documentation builds successfully.
- Ensure the code has the correct format.

---

## 📦 Docker Setup

### Build the Docker Image

To create a Docker image for your project, you can build for **development** or **production**:

```bash
# Development build (includes dev dependencies and runs tests)
docker build --build-arg NODE_ENV=development -t my-app-dev .

# Production build (optimized for size, excludes tests)
docker build --build-arg NODE_ENV=production -t my-app-prod .
```

---

### Run the Docker Container

Run the container based on the build type:

```bash
# Development mode (ideal for debugging)
docker run -p 3000:3000 my-app-dev

# Production mode (optimized for production use)
docker run -p 3000:3000 my-app-prod
```

---

### Run Tests in Docker

Execute tests inside a development container:

```bash
docker run my-app-dev npm test
```

---

### Linter in Docker

To check code quality using the linter:

```bash
docker run my-app-dev npm run lint
```

---

### Build and Start in Docker

For production, you can build and run your app inside Docker:

```bash
docker run my-app-prod npm run build
docker run -p 3000:3000 my-app-prod npm start
```

---

## 🌍 Docker Hub Integration

Push your Docker image to Docker Hub **only** when a commit is pushed to the `main` branch.

1. **Build the image:**
   ```bash
   docker build -t <your-dockerhub-username>/my-app .
   ```

2. **Log in to Docker Hub:**
   ```bash
   docker login
   ```

3. **Push the image:**
   ```bash
   docker push <your-dockerhub-username>/my-app
   ```

4. **Run the image from Docker Hub:**
   ```bash
   docker run -p 3000:3000 <your-dockerhub-username>/my-app
   ```

---

> ⚠️ **Important:** Do not commit your Docker Hub API key or any sensitive credentials to your repository. Use CI/CD secrets to securely manage such information.

---

## 📝 Submission Instructions

Submit your work by following the guidelines provided. The submission zone will be available as soon as possible (max: 2024-11-26). 🚀