// prisma.config.ts
import path from 'node:path';
import { defineConfig } from 'prisma/config';
import 'dotenv/config'; // load env

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema'), // Point to the prisma directory
});