import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Pages are rendered per request (the language cookie), with no ISR/revalidation,
// so no incremental cache (R2/KV) is needed.
export default defineCloudflareConfig();
