# Contributing to Starter Stack

Thank you for your interest in contributing to Starter Stack! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before making any contributions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/starter-stack.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required environment variables in `.env.local`

3. Start the development server:

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Making Changes

1. **Branch Naming**

   - Feature branches: `feature/description`
   - Bug fixes: `fix/description`
   - Documentation: `docs/description`
   - Performance improvements: `perf/description`

2. **Commit Messages**
   - Use the present tense ("Add feature" not "Added feature")
   - Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Limit the first line to 72 characters or less
   - Reference issues and pull requests liberally after the first line

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md with a note describing your changes
3. The PR will be merged once you have the sign-off of at least one other developer
4. Make sure all tests pass before requesting review

## Coding Standards

1. **TypeScript**

   - Use TypeScript for all new code
   - Avoid using `any` type
   - Define interfaces for all data structures
   - Use type inference where possible

2. **React**

   - Use functional components with hooks
   - Follow React best practices
   - Use proper prop types
   - Implement error boundaries

3. **Styling**
   - Use Tailwind CSS for styling
   - Follow the project's design system
   - Maintain responsive design principles

## Testing

1. Write tests for all new features
2. Ensure all tests pass before submitting PR
3. Include both unit and integration tests
4. Follow the testing guidelines in the project

## Documentation

1. Update relevant documentation for any changes
2. Add JSDoc comments for new functions and components
3. Keep the README.md up to date
4. Document any new environment variables

## Questions?

If you have any questions, please open an issue or reach out to the maintainers.

Thank you for contributing to Starter Stack!
