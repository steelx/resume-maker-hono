import app from "./src/app";


Bun.serve({
    fetch: app.fetch
})

console.log(`Server is running at localhost:${process.env.PORT ?? 3000}`);
