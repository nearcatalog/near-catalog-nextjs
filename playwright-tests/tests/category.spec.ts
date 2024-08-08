import { test, expect } from "@playwright/test";

test.describe("Category Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/category/aurora");
  });

  test("should have title", async ({ page }) => {
    await page.goto("/category/aurora");

    // Expect a heading to be visible
    await expect(
      page.getByRole("heading", { name: "Aurora", exact: true }).first(),
    ).toBeVisible();
  });

  test("projects should redirect to project page", async ({ page }) => {
    const projects = page.locator(".projects");
    await expect(projects).toBeVisible();

    const firstProject = projects.getByRole("link").first();
    await expect(firstProject).toBeVisible();

    await expect(firstProject.locator("h3")).toBeVisible();
    await firstProject.click();
    await page.waitForURL("**/project/*");
    await page.waitForLoadState("networkidle");
    const projectPageHeading = page.locator("h2").first();
    await expect(projectPageHeading).toBeVisible();
  });
});
