# Bookora Monorepo

<div align="center">

[![Bookora](https://img.shields.io/badge/Bookora-v2.0.0-blue)](https://bookora.vercel.app)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.6.3-blue)](https://turbo.build/repo)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.4.1-orange)](https://pnpm.io/)

A modern book writing platform built with a monorepo architecture. Bookora enables authors to write, organize, and manage their books with an intuitive interface, rich text editing, and powerful organizational features.

[Live Demo](https://bookora.vercel.app) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Technology Stack](#technology-stack)
- [Documentation](#documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Bookora is a full-stack web application that provides a comprehensive platform for authors to create, organize, and manage their books. It features automatic saving, drag-and-drop chapter organization, rich text editing, and support for both manual and AI-assisted book creation.

### Key Features

- ✨ **Modern UI/UX** - Clean, intuitive interface built with Next.js and Radix UI
- 📝 **Rich Text Editor** - Powerful writing experience with Tiptap
- 🔐 **Authentication** - Secure user registration and login
- 📚 **Book Management** - Create, edit, delete, and organize books
- 📖 **Chapter Organization** - Drag-and-drop interface for managing chapters and sections
- 🌍 **Internationalization** - Multi-language support (English, Spanish, German)
- 🎨 **Dark Mode** - Comfortable reading and writing in any lighting
- 📱 **Responsive Design** - Seamless experience across all devices
- 🤖 **AI-Assisted Creation** - Generate book structures with AI assistance
- ☁️ **Auto-save** - Automatic saving while you write

## 🏗️ Architecture

This monorepo uses [Turborepo](https://turbo.build/repo) to manage a multi-package workspace with the following structure:

```
bookora-mono-repo/
├── apps/
│   ├── api/          # Express.js REST API backend
│   └── client/       # Next.js frontend application
├── packages/
│   ├── ui/           # Shared UI component library
│   ├── eslint-config/      # Shared ESLint configuration
│   └── typescript-config/  # Shared TypeScript configuration
└── ...
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **pnpm** >= 10.4.1 (or use the built-in package manager)
- **MongoDB** (for the API backend)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/bookora-mono-repo.git
   cd bookora-mono-repo
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   - **API**: Copy `apps/api/example.env` to `apps/api/.env` and fill in the required values
   - **Client**: Copy `apps/client/example.env` to `apps/client/.env.local` and configure

   See individual app READMEs for detailed environment variable documentation.

4. **Start the development servers:**

   ```bash
   pnpm dev
   ```

   This will start both the API server (default: `http://localhost:8080`) and the client application (default: `http://localhost:3000`).

## 📁 Project Structure

### Apps

- **[`apps/api`](./apps/api/README.md)** - Express.js REST API backend
  - MongoDB integration
  - JWT authentication
  - Swagger documentation
  - Book, Chapter, Section, and User management

- **[`apps/client`](./apps/client/README.md)** - Next.js frontend application
  - Server-side rendering
  - NextAuth.js integration
  - Rich text editor with Tiptap
  - Multi-language support

### Packages

- **[`packages/ui`](./packages/ui/README.md)** - Shared UI component library
  - Radix UI primitives
  - Tailwind CSS styling
  - Reusable React components

- **[`packages/eslint-config`](./packages/eslint-config/README.md)** - Shared ESLint configuration
  - Base configuration
  - Next.js specific rules
  - React internal rules

- **[`packages/typescript-config`](./packages/typescript-config/README.md)** - Shared TypeScript configuration
  - Base configuration
  - Next.js configuration
  - React library configuration

## 📜 Available Scripts

Run these commands from the root of the monorepo:

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start all apps in development mode |
| `pnpm build`       | Build all apps and packages        |
| `pnpm lint`        | Lint all apps and packages         |
| `pnpm format`      | Format code with Prettier          |
| `pnpm check-types` | Type-check all TypeScript code     |

To run commands for a specific app or package, use Turborepo's filtering:

```bash
pnpm --filter api dev      # Run dev only for API
pnpm --filter client dev   # Run dev only for client
pnpm --filter ui build     # Build only UI package
```

## 🛠️ Technology Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
- **State Management**: [Easy Peasy](https://easy-peasy.vercel.app/), [SWR](https://swr.vercel.app/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Logging**: [Pino](https://getpino.io/)

### DevOps & Tooling

- **Monorepo**: [Turborepo](https://turbo.build/repo)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Code Quality**: ESLint, Prettier, TypeScript
- **Deployment**: Vercel

## 📚 Documentation

- [API Documentation](./apps/api/README.md) - Backend API guide and endpoints
- [Client Documentation](./apps/client/README.md) - Frontend application guide
- [UI Components](./packages/ui/README.md) - Shared component library documentation

For API endpoint documentation, visit the Swagger UI when the API is running:

- Local: `http://localhost:8080/api-docs`
- Production: `https://bookora.vercel.app/api/api-docs`

## 💻 Development

### Adding a New Package

1. Create a new directory under `packages/`
2. Initialize `package.json` with the workspace protocol
3. Update `pnpm-workspace.yaml` if needed (usually automatic)
4. Add the package to `turbo.json` tasks if it has build steps

### Adding a New App

1. Create a new directory under `apps/`
2. Initialize the app with appropriate framework
3. Configure it to use shared packages (`@workspace/ui`, `@workspace/eslint-config`, etc.)
4. Add relevant tasks to `turbo.json`

### Code Style

- **Formatting**: We use Prettier with default configuration
- **Linting**: ESLint with shared configurations
- **Type Checking**: TypeScript strict mode enabled
- **Commits**: Follow conventional commit messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests and linting (`pnpm lint`, `pnpm check-types`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ using Turborepo**

[Report Bug](https://github.com/yourusername/bookora-mono-repo/issues) • [Request Feature](https://github.com/yourusername/bookora-mono-repo/issues) • [Documentation](https://github.com/yourusername/bookora-mono-repo/wiki)

</div>
