import { test, describe } from "node:test";
import assert from "node:assert";
import { CloudflareClient } from "../src/index";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

describe("CloudflareClient", () => {
  test("getDomain() retrieves domain information", async () => {
    const apiKey = process.env.CLOUDFLARE_API_KEY;
    console.log(apiKey);
    assert.ok(apiKey, "Cloudflare API key must be set in .env file");

    const client = new CloudflareClient(apiKey);

    // Note: This is a mock test and would typically be replaced with proper mocking
    const domain = "example.com";

    const response = await client.getDomain(domain);

    console.log(response);

    assert.strictEqual(response.success, true, "API call should be successful");
    assert.ok(response.result, "Response should have a result");
    assert.ok(response.result.id, "Result should have an id");
    assert.strictEqual(response.result.name, domain, "Domain name should match");
  });
});
