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
    await firstProject.click({ force: true });
    const projectPageHeading = page.locator("#top div").locator("h2").first();
    await expect(projectPageHeading).toBeVisible();
  });

  test("clicking on project in Hot Project should redirect to project page", async ({
    page,
  }) => {
    const section = page.locator("#hot-projects div").first();
    await expect(section).toBeVisible();
    const projects = page.locator(
      ".relative > div > .relative > .no-scrollbar",
    );
    await expect(projects).toBeVisible();
    const project = projects.locator(".project-card").first();
    await expect(project).toBeVisible();
    await project.click({ force: true });
    const projectPageHeading = page.locator("#top div").locator("h2").first();
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
    // intercept network requests
    await page.route("**/*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          "build-dao": {
            slug: "build-dao",
            profile: {
              name: "Build DAO",
              tagline:
                "Decentralizing the developer community, pushing protocol standards, fostering innovation, and enabling collaboration.",
              image: {
                url: "https://nearcatalog.xyz/wp-content/uploads/nearcatalog/build-dao.jpg",
              },
              tags: {
                "ecosystem-support": "Ecosystem Support",
              },
            },
          },
        }),
      });
    });

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
    await tag.click({ force: true });
    await page.waitForURL("/category/*");
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("should show error on no results found", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search projects");
    await expect(searchInput).toBeEnabled();
    await searchInput.fill("gibberish");
    await page.route("**/*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(false),
      });
    });
    await expect(page.locator(".projects-list")).toBeHidden();
    await expect(page.locator(".projects-list-skeleton")).toBeHidden();
    await expect(page.locator(".error-message")).toBeVisible();
  });
});
