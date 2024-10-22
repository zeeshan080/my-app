// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";



// // Create a connection pool to your PostgreSQL database
// const pool = new Pool({
//   host: "localhost", 
//   port: 5434, 
//   user: "hassan", 
//   password: "123", 
//   database: "tailorappDB", 
// });

// export const database = drizzle(pool);

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);


export const database = drizzle(sql);

