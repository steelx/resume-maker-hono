import postgres from 'postgres';
import {drizzle} from 'drizzle-orm/postgres-js';

// Connection to database
// "postgres://postgres:adminadmin@0.0.0.0:5432/db"
const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);