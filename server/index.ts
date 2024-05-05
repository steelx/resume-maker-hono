import app from "./src/app";


Bun.serve({
    port: process.env.PORT ?? 3000,
    fetch: app.fetch
})

console.log(`Server is running at localhost:${process.env.PORT ?? 3000}`);
