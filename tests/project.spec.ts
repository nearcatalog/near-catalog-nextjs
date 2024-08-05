import { test, expect } from "@playwright/test";

test("should have title", async ({ page }) => {
  await page.goto("./project/ref-finance");

  // Expect a heading to be visible
  await expect(
    page.getByRole("heading", { name: "Ref Finance", exact: true }),
  ).toBeVisible();
});
