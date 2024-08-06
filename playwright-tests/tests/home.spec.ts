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
    const firstProject = page.locator(".no-scrollbar > div").first();

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

  test("should deselect and reselect all tags when toggling", async ({ page }) => {
    const tagsToggle = page.getByLabel("Toggle all tags");
    
    await expect(tagsToggle).toBeVisible();
  
    const tags = await page.getByTestId("tag").all();
  
    // default should be all tags checked
    await expect(tagsToggle).toBeChecked();
    for (const tag of tags) {
      // verify that all tags do not have classname opacity-50
      expect(tag).not.toHaveClass(/opacity-50/);
    }
  
    // toggle all tags off
    await tagsToggle.setChecked(true);
    await page.waitForTimeout(100);
    for (const tag of tags) {
      // verify that all tags have classname opacity-50
      expect(tag).toHaveClass(/opacity-50/);
    }
  });

  test("should show error on no results found", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search projects");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("test");
    await expect(
      page.getByRole("heading", { name: "Sorry, we could not find the" }),
    ).toBeVisible();
  });
});
