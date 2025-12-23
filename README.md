# Cloudflare AI Chat Agents Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Maftuuh1922/batiklens-ai-batik-classifier)

A production-ready Cloudflare Workers template for building AI-powered chat applications. Features Durable Objects for stateful agents, multi-session management, streaming responses, tool calling (web search, weather, MCP integration), and a modern React frontend with shadcn/ui.

## 🚀 Features

- **Stateful Chat Agents**: Durable Objects handle individual chat sessions with persistent message history and model selection.
- **Multi-Session Management**: Create, list, update, and delete chat sessions with automatic title generation.
- **AI Integration**: Cloudflare AI Gateway with Gemini models, streaming responses, and function calling.
- **Tool Calling**: Built-in tools (weather, web search via SerpAPI, URL fetching) + extensible MCP server integration.
- **Modern UI**: React 18 + Vite + Tailwind + shadcn/ui with dark mode, responsive design, and smooth animations.
- **Session Persistence**: SQLite-backed Durable Objects for reliable state storage.
- **Production-Ready**: CORS, error handling, health checks, client error reporting, and observability.
- **Type-Safe**: Full TypeScript with Workers types and strict mode.

## 🛠 Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects, Agents SDK, OpenAI SDK
- **AI**: Cloudflare AI Gateway (Gemini models), SerpAPI, Model Context Protocol (MCP)
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Router
- **Utilities**: Bun (package manager), wrangler, lucide-react icons
- **State**: Immer, Zustand (extensible)

## ⚡ Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo>
   cd <project>
   bun install
   ```

2. **Configure Environment** (via Wrangler Dashboard or CLI):
   - `CF_AI_BASE_URL`: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway}/openai`
   - `CF_AI_API_KEY`: Your Cloudflare API token
   - `SERPAPI_KEY`: SerpAPI key (optional, for web search)
   - `OPENROUTER_API_KEY`: OpenRouter key (optional)

3. **Development**:
   ```bash
   bun dev
   ```
   Open `http://localhost:3000` (or `${PORT}`).

4. **Deploy**:
   ```bash
   bun wrangler:deploy
   ```

## 📋 Installation

This project uses **Bun** for fast installs and dev workflows.

```bash
# Install dependencies
bun install

# Generate Workers types (one-time)
bun cf-typegen

# Development server (Workers + Vite)
bun dev
```

**Environment Variables** (set in Wrangler Dashboard):
| Variable | Required | Description |
|----------|----------|-------------|
| `CF_AI_BASE_URL` | ✅ | AI Gateway endpoint (e.g., `https://gateway.ai.cloudflare.com/v1/{account}/{gateway}/openai`) |
| `CF_AI_API_KEY` | ✅ | Cloudflare API token for AI Gateway |
| `SERPAPI_KEY` | ❌ | SerpAPI key for web search |
| `OPENROUTER_API_KEY` | ❌ | OpenRouter API key (if using alternative models) |

## 🔧 Development

- **Frontend**: `src/` – Edit React components, hooks, pages.
- **Backend**: `worker/` – Extend `userRoutes.ts`, tools in `tools.ts`, or agent logic in `agent.ts`.
- **Hot Reload**: `bun dev` proxies API calls and rebuilds automatically.
- **Type Generation**: Run `bun cf-typegen` after `wrangler` updates.
- **Linting**: `bun lint`
- **Build**: `bun build` (produces `dist/` for Workers Pages/Assets).

**Extending**:
- Add routes: `worker/userRoutes.ts`
- New tools: `worker/tools.ts` + update `chat.ts`
- Custom agents: Extend `ChatAgent` in `worker/agent.ts`
- UI components: Use shadcn CLI or copy from `src/components/ui/`

**Available Models** (via AI Gateway):
- `google-ai-studio/gemini-2.5-flash`
- `google-ai-studio/gemini-2.5-pro`
- Extend `src/lib/chat.ts` for more.

## 🌐 Usage Examples

### Chat API
```
POST /api/chat/:sessionId/chat
{ "message": "What's the weather in London?", "stream": true }

GET /api/chat/:sessionId/messages
DELETE /api/chat/:sessionId/clear
POST /api/chat/:sessionId/model { "model": "google-ai-studio/gemini-2.5-pro" }
```

### Sessions API
```
GET /api/sessions           # List sessions
POST /api/sessions          # Create { "title": "...", "firstMessage": "..." }
DELETE /api/sessions/:id    # Delete
PUT /api/sessions/:id/title # Update title
DELETE /api/sessions        # Clear all
```

## 🚀 Deployment

1. **Configure `wrangler.jsonc`**:
   - Update `vars` with your AI Gateway details.
   - Bind Durable Object namespaces.

2. **Secrets** (CLI):
   ```bash
   wrangler secret put CF_AI_API_KEY
   wrangler secret put SERPAPI_KEY
   ```

3. **Deploy**:
   ```bash
   bun wrangler:deploy
   ```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Maftuuh1922/batiklens-ai-batik-classifier)

**Assets Handling**: Static frontend served via Workers Assets. API routes (`/api/*`) handled by `run_worker_first`.

**Migrations**: Auto-managed via `wrangler.jsonc` for Durable Objects.

## 🤝 Contributing

1. Fork & PR.
2. Follow TypeScript + ESLint rules.
3. Test with `bun dev`.
4. Update types: `bun cf-typegen`.

## 📄 License

MIT – See [LICENSE](LICENSE) (or create one). Built with ❤️ by Cloudflare Workers Templates.

---

⭐ **Star on GitHub** | 🐛 [Issues](https://github.com/YOUR_USERNAME/YOUR_REPO/issues) | 💬 [Discussions](https://github.com/YOUR_USERNAME/YOUR_REPO/discussions)