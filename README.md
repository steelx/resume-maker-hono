# expense-tracker-bun

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run watch
```

Database:

```bash
# init Database ft Docker
./scripts/init_db.sh

# add on CI, if needed
SKIP_DOCKER=true ./scripts/init_db.sh

# Run migration to init tables
bun drizzle-kit generate
bun migrate.ts

# check SQL client
bunx drizzle-kit studio
```

To add shadcn UI components

```bash
bunx --bun shadcn-ui@latest add input label
```

This project was created using `bun init` in bun v1.1.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
