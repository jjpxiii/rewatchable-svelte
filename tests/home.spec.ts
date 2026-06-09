import { expect, test } from "@playwright/test";
import { fakeGameStats } from "../src/lib/fake-game-stats";

const getTopGameName = (
  key: "totalRating" | "offensiveRating" | "defensiveBigPlays" | "scenarioRating",
) => [...fakeGameStats].sort((a, b) => b[key] - a[key])[0].fullName;

const expectFirstCardToBe = async (page: import("@playwright/test").Page, expectedName: string) => {
  await expect(page.getByTestId("game-card-name").first()).toContainText(expectedName);
};

test("home page renders game cards", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Rewatchable games");
  await expect(page.getByText("Sorted by total rating ⬇")).toBeVisible();
  await expect(page.getByTestId("game-card")).toHaveCount(fakeGameStats.length);
});

test("sorting buttons update the order", async ({ page }) => {
  await page.goto("/");

  await expectFirstCardToBe(page, getTopGameName("totalRating"));

  await page.getByTestId("sort-offensive").click();
  await expectFirstCardToBe(page, getTopGameName("offensiveRating"));

  await page.getByTestId("sort-scenario").click();
  await expectFirstCardToBe(page, getTopGameName("scenarioRating"));

  await page.getByTestId("sort-defensive").click();
  await expectFirstCardToBe(page, getTopGameName("defensiveBigPlays"));
});

test("responsive layout displays cards", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByTestId("game-card")).toHaveCount(fakeGameStats.length);
});

test("navigation to game detail works", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("game-card").first().click();
  await expect(page).not.toHaveURL("/");
});

test("visual regression - home page", async ({ page }) => {
  await page.goto("/");
  // Wait for the game cards to be visible to ensure a stable screenshot
  await expect(page.getByTestId("game-card").first()).toBeVisible();
  await expect(page).toHaveScreenshot("home-page.png", {
    fullPage: true,
  });
});

