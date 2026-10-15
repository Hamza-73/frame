/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The project is not inside a git repo, so Turbopack cannot infer the
  // workspace root from a lockfile ancestor. Pin it explicitly.
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
