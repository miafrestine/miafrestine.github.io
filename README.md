# Personal Portfolio

A responsive React + Vite + Tailwind CSS portfolio starter with custom CSS artwork and motion.

## Run locally

```sh
npm install
npm run dev
```

## Portfolio assistant

The floating "Ask about Mia" assistant answers portfolio questions about projects, skills, certificates, OJT availability, and the CV using the portfolio's own content. Those answers work without a separate service.

To enable AI responses to other questions, run or deploy a compatible chat API that accepts `POST /chat` with `{ "messages": [...] }` and returns `{ "reply": "..." }`. Set `VITE_CHAT_API_URL` to the API base URL, without a trailing slash; for example, `http://localhost:5000/api`. Keep any AI provider credentials on the API server, never in this Vite app. Restart the Vite server after changing the variable.
