import { test, expect } from "@playwright/test";

test.describe("Bookmarks", () => {
  test.use({
    storageState: "playwright-tests/storage-states/no-bookmarks.json",
  });

  test("should add and remove bookmarks", async ({ page }) => {
    await page.goto("/bookmarks");

    await expect(
      page.getByRole("heading", { name: "Bookmarked Projects", exact: true }),
    ).toBeVisible();

    await test.step("should show no bookmarks", async () => {
      await expect(
        page.getByText("No bookmarked projects found"),
      ).toBeVisible();
    });

    await test.step("should add a bookmark", async () => {
      await page.goto("/project/potlock");
      const starButton = page.getByRole("button", { name: "Bookmark Project" });

      await starButton.click();

      await page.goto("/bookmarks");
      await expect(
        page.getByText("No bookmarked projects found"),
      ).not.toBeVisible();
      await expect(page.getByText("PotLock is bringing public")).toBeVisible();
    });

    await test.step("should navigate to project page", async () => {
      await page.click("text=Potlock");
      await expect(
        page.getByRole("heading", { name: "PotLock", exact: true }),
      ).toBeVisible();
    });

    await test.step("should remove a bookmark", async () => {
      const starButton = page.getByRole("button", { name: "Bookmark Project" });

      await starButton.click();

      await page.goto("/bookmarks");
      await expect(
        page.getByText("No bookmarked projects found"),
      ).toBeVisible();
      await expect(
        page.getByText("PotLock is bringing public"),
      ).not.toBeVisible();
    });
  });
});
