import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should redirect to project submission page", async ({ page }) => {
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

  test("project in ecosystem section should redirect to project page", async ({
    page,
  }) => {
    const ecosystemProjects = page.locator(".no-scrollbar").first();
    await expect(ecosystemProjects).toBeVisible();

    const firstProject = ecosystemProjects.getByRole("link").first();
    await expect(firstProject).toBeVisible();

    const projectHeading = firstProject.locator("h3");
    await expect(projectHeading).toBeVisible();

    await firstProject.click();

    const projectPageHeading = page.locator("h2").first();
    await page.waitForLoadState("networkidle");
    await expect(projectPageHeading).toBeVisible();
  });

  test("clicking on project in Hot Project should redirect to project page", async ({
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

  test("should show projects in discover section", async ({ page }) => {
    const projectsList = page.locator(".projects-list");
    await expect(projectsList).toBeVisible();
  });

  test("search should filter projects", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search projects");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("build dao");

    const buildDaoProject = page
      .locator(".projects-list")
      .getByText("Build DAO");
    await expect(buildDaoProject).toBeVisible();
  });

  test("tags should redirect to category page", async ({ page }) => {
    const tags = page.locator(".tags").first();
    await expect(tags).toBeVisible();
    const tag = tags.locator("a").first();
    await expect(tag).toBeVisible();
    await tag.click();
    await page.waitForURL("/category/*");
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("should show error on no results found", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search projects");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("gibberish");
    await expect(page.locator(".projects-list")).toBeHidden();
    await expect(page.locator(".projects-list-skeleton")).toBeHidden();
    await expect(page.locator(".error-message")).toBeVisible();
  });
});
