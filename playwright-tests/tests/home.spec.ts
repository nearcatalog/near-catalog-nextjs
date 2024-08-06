import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("Should redirect to project submission page", async ({ page }) => {
    const getSubmitProjectButton = () =>
      page
        .getByRole("navigation")
        .getByRole("link", { name: "Submit your project" });

    await expect(getSubmitProjectButton()).toBeVisible();
    const popupPromise = page.waitForEvent("popup");

    await getSubmitProjectButton().click();

    const popup = await popupPromise;
    const popupUrl = await popup.evaluate("location.href");

    await expect(popupUrl).toContain(
      "https://submit.nearcatalog.xyz/new-project/",
    );
  });

  test("Project in ecosystem section should redirect to project page", async ({
    page,
  }) => {
    const firstProject = page.locator(".no-scrollbar > div").first();

    await expect(firstProject).toBeVisible();

    const projectHeading = firstProject.locator("h3");
    await expect(projectHeading).toBeVisible();

    await firstProject.click();

    const projectPageHeading = page.locator("h2").first();
    await page.waitForLoadState("networkidle");
    await expect(projectPageHeading).toBeVisible();
  });

  test("Clicking on project in Hot Project should redirect to project page", async ({
    page,
  }) => {
    const section = page.locator("#hot-projects div").first();
    await expect(section).toBeVisible();
    const project = page.locator(".relative > div > .relative > .no-scrollbar");
    await expect(project).toBeVisible();
    const projectHeading = project.locator("h3").first();
    await expect(projectHeading).toBeVisible();
    await project.click();
    const projectPageHeading = page.locator("h2").first();
    await page.waitForLoadState("networkidle");
    await expect(projectPageHeading).toBeVisible();
  });

  test("Should show projects in discover section", async ({ page }) => {
    const getDiscoverSection = () =>
      page.getByRole("heading", { name: "Discover All Projects" });
    await expect(getDiscoverSection()).toBeVisible();

    await expect(
      page
        .locator("#all-projects div")
        .filter({ hasText: "MITTE:memeMITTE:meme is the" })
        .nth(1),
    ).toBeVisible();
  });

  test("search should filter projects", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search projects");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("mitte");
    await expect(
      page
        .locator("#all-projects div")
        .filter({ hasText: "MITTE:memeMITTE:meme is the" })
        .nth(1),
    ).toBeVisible();
  });

  test("tags should filter projects", async ({ page }) => {
    const tag = page.locator("div").filter({ hasText: /^Chain Abstraction$/ });
    await expect(tag).toBeVisible();
    await tag.click();
    await expect(
      page.locator("#all-projects div").filter({ hasText: "Defuse" }).nth(1),
    ).toBeVisible();
  });

  test("should show error on no results found", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search projects");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("test");
    await expect(
      page.getByRole("heading", { name: "Sorry, we could not find any results" }),
    ).toBeVisible();
  });
});
