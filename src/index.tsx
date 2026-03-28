import { h, Fragment } from "./jsx-runtime";

// Read the built CSS at build time — Vite will inline this as a string.
// At runtime on Cloudflare, we serve it inline in a <style> tag so there
// are zero extra network requests.
import css from "../dist/style.css?raw";

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function Layout({ children }: { children?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cloudflare Pages SSR</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body class="bg-gray-50 text-gray-900 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full space-y-4">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
      <p class="text-gray-600 leading-relaxed">{description}</p>
      <ul class="space-y-2 text-sm text-gray-500">
        <li class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-green-500" />
          Zero client-side JavaScript
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-blue-500" />
          Custom JSX-to-string runtime
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-purple-500" />
          Tailwind CSS (inlined)
        </li>
      </ul>
      <p class="text-xs text-gray-400 pt-2">
        Rendered at {new Date().toISOString()}
      </p>
    </div>
  );
}

function Page() {
  return (
    <Layout>
      <Card
        title="Pure SSR on Cloudflare Pages"
        description="This page is rendered entirely on the edge. No frameworks, no hydration, no client JS — just HTML and CSS."
      />
    </Layout>
  );
}

// ---------------------------------------------------------------------------
// Cloudflare Pages Advanced Mode (_worker.js)
// ---------------------------------------------------------------------------

export default {
  async fetch(): Promise<Response> {
    const html = "<!DOCTYPE html>" + (<Page />);

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=utf-8",
        "cache-control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  },
} satisfies ExportedHandler;
