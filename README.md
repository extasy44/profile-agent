# AI Chat Application

A modern, responsive AI chat application built with Next.js 14, featuring real-time message streaming, markdown support, and a beautiful dark-mode interface.

## Features

- 🤖 Real-time AI chat with message streaming
- 📝 Markdown support with syntax highlighting
- 🌓 Dark mode interface
- 💬 Chat history management
- 🔒 Authentication ready
- 📱 Fully responsive design
- ⚡ Built with React Server Components
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Tailwind
- **AI Integration:** Vercel AI SDK
- **Markdown:** ReactMarkdown with remark-gfm
- **Authentication:** Ready for integration
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-chat-app.git
cd ai-chat-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── chat/           # Chat-related components
│   └── ui/             # UI components
├── lib/                # Utility functions and configurations
└── docs/               # Documentation and content
```

## Key Components

- `ChatMain.tsx`: Main chat interface with message streaming
- `ChatMessage.tsx`: Message component with markdown support
- `ChatSidebar.tsx`: Chat history management
- `AuthProvider.tsx`: Authentication context provider

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
