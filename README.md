# Starter Stack

A modern, full-stack boilerplate for building scalable web applications with Next.js, TypeScript, Tailwind CSS, and more.

## Features

- 🚀 **Next.js 15** with App Router
- 💎 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🔒 **NextAuth.js** for authentication
- 📊 **Drizzle ORM** for database management
- 🎯 **React Query** for data fetching
- 📱 **Responsive Design**
- 🌙 **Dark Mode Support**
- 🧪 **Testing Setup**
- 📝 **ESLint & Prettier** for code quality

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Email:** React Email

## Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- PostgreSQL database

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/starter-stack.git
   cd starter-stack
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required environment variables in `.env.local`

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```text
starter-stack/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── ui/          # Reusable UI components
│   │   └── features/    # Feature-specific components
│   └── lib/             # Utility functions and configurations
├── public/              # Static assets
└── prisma/             # Database schema and migrations
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm db:push` - Push database schema changes
- `pnpm db:studio` - Open Drizzle Studio

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Email (optional)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# Other Services (add as needed)
```

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)
- And all other open-source projects used in this stack
