import { h, Fragment } from "./jsx-runtime";

import css from "../dist/style.css?raw";

const roles = ["Admin", "Moderator", "User", "Guest", "Editor", "Viewer", "Manager", "Contributor"];
const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rose", "Sam", "Tina", "Uma", "Victor", "Wendy", "Xavier", "Yara", "Zane", "Amy", "Ben", "Clara", "David", "Emma", "Felix", "Gina", "Hugo", "Iris", "James", "Kara", "Liam", "Maya", "Nina", "Oscar", "Paula", "Quentin", "Rita", "Steve", "Tara", "Uri", "Vera", "Will", "Xena", "Yuri", "Zoe", "Aaron", "Bella", "Chris", "Dora", "Ethan", "Fiona", "George", "Hannah", "Ivan", "Judy", "Kevin", "Luna", "Mike", "Nora", "Owen", "Penny", "Quincy", "Rachel", "Tom", "Ursula", "Vincent", "Xander", "Yvonne", "Zach", "Anna", "Brian", "Cathy", "Derek", "Ella", "Fred", "Gail", "Hank", "Isla", "John", "Kelly", "Luis", "Molly", "Neil", "Opal", "Paul", "Quinn", "Rita", "Sam", "Tess", "Ulric", "Val", "Wade", "Ximena", "York", "Zara", "Andy", "Beth", "Carl", "Dana", "Eric", "Faith", "Greg", "Hope"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Turner", "Phillips", "Evans", "Parker", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Moreno", "Reed", "Cook", "Rogers", "Morgan", "Peterson", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Simmons", "Patterson", "Jordan", "Reynolds", "Hamilton", "Graham", "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", "Hayes", "Bryant", "Herrera", "Gibson", "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", "Marshall", "Owen", "Harrison", "Fernandez", "Mcdonald", "Woods", "Washington", "Kennedy", "Wells", "Vargas", "Henry", "Chen", "Freeman", "Webb", "Tucker", "Guzman", "Burns", "Crawford", "Olson", "Simpson", "Porter", "Hunter", "Gordon", "Mendez", "Silva", "Shaw", "Snyder", "Mason", "Dixon", "Munoz", "Hunt", "Hicks", "Holmes", "Palmer", "Wagner", "Black", "Robertson", "Boyd", "Rose", "Stone", "Salazar", "Fox", "Warren", "Mills", "Meyer", "Rice", "Schmidt", "Garza", "Daniels", "Ferguson", "Nichols", "Stephens", "Soto", "Weaver", "Ryan", "Gardner", "Payne", "Grant", "Dunn", "Kelley", "Spencer", "Hawkins", "Arnold", "Pierce", "Vazquez", "Hansen", "Peters", "Santos", "Hart", "Bradley", "Knight", "Elliott", "Cunningham", "Duncan", "Armstrong", "Hudson", "Carroll", "Lane", "Riley", "Andrews", "Alvarado", "Ray", "Delgado", "Berry", "Perkins", "Hoffman", "Johnston", "Matthews", "Pena", "Richards", "Contreras", "Willis", "Lawrence", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Coleman", "Simmons", "Patterson"];

const sampleData = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}${i}@example.com`,
  role: roles[i % roles.length]
}));

function Layout({ children, title = "Cloudflare Pages SSR" }: { children?: string; title?: string }) {
  return (
    <html lang='en'>
      <head>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <title>{title}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body class='bg-gray-50 text-gray-900 min-h-screen'>
        <nav class='bg-white border-b border-gray-200 px-6 py-4 flex gap-6'>
          <a
            href='/'
            class='text-gray-600 hover:text-gray-900'
          >
            Home
          </a>
          <a
            href='/data'
            class='text-gray-600 hover:text-gray-900'
          >
            Data
          </a>
        </nav>
        <main class='max-w-4xl mx-auto py-12 px-6'>{children}</main>
      </body>
    </html>
  );
}

function HomePage() {
  return (
    <Layout>
      <h1 class='text-4xl font-bold mb-4'>Pure SSR on Cloudflare Pages</h1>
      <p class='text-gray-600 text-lg mb-6'>This page is rendered entirely on the edge. No frameworks, no hydration, no client JS.</p>
      <div class='bg-white rounded-xl shadow-sm p-6'>
        <h2 class='text-xl font-semibold mb-3'>Features</h2>
        <ul class='space-y-2 text-gray-600'>
          <li>Zero client-side JavaScript</li>
          <li>Custom JSX-to-string runtime</li>
          <li>Tailwind CSS (inlined)</li>
          <li>Simple file-based routing</li>
        </ul>
      </div>
    </Layout>
  );
}

function DataPage() {
  return (
    <Layout title='Data - Cloudflare Pages SSR'>
      <h1 class='text-4xl font-bold mb-6'>User Data</h1>
      <div class='bg-white rounded-xl shadow-sm overflow-hidden'>
        <table class='w-full'>
          <thead class='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th class='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>ID</th>
              <th class='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>Name</th>
              <th class='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>Email</th>
              <th class='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>Role</th>
            </tr>
          </thead>
          <tbody class='divide-y divide-gray-100'>
            {sampleData.map((user) => (
              <tr
                key={user.id}
                class='hover:bg-gray-50'
              >
                <td class='px-6 py-4 text-sm'>{user.id}</td>
                <td class='px-6 py-4 text-sm font-medium'>{user.name}</td>
                <td class='px-6 py-4 text-sm text-gray-500'>{user.email}</td>
                <td class='px-6 py-4 text-sm'>
                  <span
                    class={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "Moderator"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p class='text-xs text-gray-400 mt-4'>Rendered at {new Date().toISOString()}</p>
    </Layout>
  );
}

const routes: Record<string, () => string> = {
  "/": () => <HomePage />,
  "/data": () => <DataPage />
};

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "") || "/";

    const renderPage = routes[path];

    const html =
      "<!DOCTYPE html>" +
      (renderPage ? (
        renderPage()
      ) : (
        <Layout title='404 - Not Found'>
          <div class='text-center py-12'>
            <h1 class='text-6xl font-bold text-gray-300'>404</h1>
            <p class='text-gray-600 mt-4'>Page not found</p>
            <a
              href='/'
              class='inline-block mt-6 text-blue-600 hover:underline'
            >
              Go home
            </a>
          </div>
        </Layout>
      ));

    await new Promise((resolve) => setTimeout(resolve, 500));

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=utf-8",
        "cache-control": "s-maxage=60, stale-while-revalidate=300"
      }
    });
  }
} satisfies ExportedHandler;
