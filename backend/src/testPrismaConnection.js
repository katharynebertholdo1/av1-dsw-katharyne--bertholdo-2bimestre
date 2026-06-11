import { testConnection } from "./config/prisma.js";

(async function () {
  const ok = await testConnection();
  process.exit(ok ? 0 : 1);
})();
