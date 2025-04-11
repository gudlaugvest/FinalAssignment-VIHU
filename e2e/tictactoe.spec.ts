import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// Should have Tic Tac Toe title
test("should have Tic Tac Toe title", async ({ page }) => {
  await expect(page).toHaveTitle("Tic Tac Toe");
});

// Should have all games link
test("should have all games link", async ({ page }) => {
  const allGamesLink = page.getByText("See all games");
  await allGamesLink.click();
  await expect(page).toHaveURL("/game/list");
});

// Should be able to pick a cell
test("should be able to pick a cell", async ({ page }) => {
  const player1 = page.getByPlaceholder(/❌.*Your Name/);
  const player2 = page.getByPlaceholder(/⭕.*Opponent Name/);
  await player1.fill("Player1");
  await player2.fill("Player2");
  await page.getByText("Start Game").click();

  // Wait for navigation to game page
  await page.waitForURL(/\/game\/.*/);

  const cell = page.locator("div.Cell_cell__6Ors9").first();
  await cell.click();

  // Wait for the cell to be updated
  await expect(cell).toHaveText("❌", { timeout: 5000 });
});

// Should be able to enter players name
test("should be able to enter players name", async ({ page }) => {
  // Wait for the input fields to be visible and ready
  const player1 = page.getByPlaceholder(/❌.*Your Name/);
  const player2 = page.getByPlaceholder(/⭕.*Opponent Name/);

  // Wait for the input fields to be visible
  await expect(player1).toBeVisible();
  await expect(player2).toBeVisible();

  // Clear any existing values
  await player1.clear();
  await player2.clear();

  // Fill the input fields
  await player1.fill("Player1");
  await player2.fill("Player2");

  // Wait for the values to be set
  await expect(player1).toHaveValue("Player1", { timeout: 10000 });
  await expect(player2).toHaveValue("Player2", { timeout: 10000 });
});

// Should be able to start game
test("should be able to start game", async ({ page }) => {
  // Set up the game with player names
  const player1 = page.getByPlaceholder(/❌.*Your Name/);
  const player2 = page.getByPlaceholder(/⭕.*Opponent Name/);

  // Wait for input fields to be visible
  await expect(player1).toBeVisible();
  await expect(player2).toBeVisible();

  // Fill in player names
  await player1.fill("Player1");
  await player2.fill("Player2");

  // Click the start button and wait for navigation
  const startButton = page.getByRole("button", { name: "Start Game" });
  await startButton.click();

  try {
    // Wait for navigation with a longer timeout
    await page.waitForURL(/\/game\/.*/, { timeout: 60000 });

    // Wait for the game to load
    await expect(page.locator("text=Player1")).toBeVisible({ timeout: 10000 });
  } catch (error) {
    // Log the current URL and page content for debugging
    console.log("Current URL:", await page.url());
    console.log("Page content:", await page.content());
    throw error;
  }
});

// Should announce winner when game is won
test("should announce winner when game is won", async ({ page }) => {
  // Set up the game with player names
  await page.getByPlaceholder(/❌.*Your Name/).fill("Player1");
  await page.getByPlaceholder(/⭕.*Opponent Name/).fill("Player2");
  await page.getByRole("button", { name: "Start Game" }).click();

  // Wait for navigation to game page
  await page.waitForURL(/\/game\/.*/);

  const cells = page.locator(".Cell_cell__6Ors9");

  // Player 1 wins diagonally
  await cells.nth(0).click();
  await expect(cells.nth(0)).toHaveText("❌", { timeout: 5000 });

  await cells.nth(3).click();
  await expect(cells.nth(3)).toHaveText("⭕", { timeout: 5000 });

  await cells.nth(1).click();
  await expect(cells.nth(1)).toHaveText("❌", { timeout: 5000 });

  await cells.nth(4).click();
  await expect(cells.nth(4)).toHaveText("⭕", { timeout: 5000 });

  await cells.nth(2).click();
  await expect(cells.nth(2)).toHaveText("❌", { timeout: 5000 });

  // Wait for the game state to update and check for the winner message
  // First wait for the game to be in a completed state
  await page.waitForFunction(
    () => {
      const cells = document.querySelectorAll(".Cell_cell__6Ors9");
      const moves = Array.from(cells).map(cell => cell.textContent);
      return moves.filter(Boolean).length >= 5; // At least 5 moves have been made
    },
    { timeout: 10000 }
  );

  // Then check for the winner message
  await expect(page.locator("text=Player1 Won")).toBeVisible({ timeout: 10000 });
});

// Should show draw when game is a draw
test("should show draw when game is a draw", async ({ page }) => {
  await page.getByPlaceholder(/❌.*Your Name/).fill("Player1");
  await page.getByPlaceholder(/⭕.*Opponent Name/).fill("Player2");
  await page.getByRole("button", { name: "Start Game" }).click();

  // Wait for navigation to game page
  await page.waitForURL(/\/game\/.*/);

  const cells = page.locator(".Cell_cell__6Ors9");

  // Play a draw scenario
  await cells.nth(0).click(); // P1
  await expect(cells.nth(0)).toHaveText("❌", { timeout: 5000 });

  await cells.nth(2).click(); // P2
  await expect(cells.nth(2)).toHaveText("⭕", { timeout: 5000 });

  await cells.nth(1).click(); // P1
  await expect(cells.nth(1)).toHaveText("❌", { timeout: 5000 });

  await cells.nth(3).click(); // P2
  await expect(cells.nth(3)).toHaveText("⭕", { timeout: 5000 });

  await cells.nth(4).click(); // P1
  await expect(cells.nth(4)).toHaveText("❌", { timeout: 5000 });

  await cells.nth(7).click(); // P2
  await expect(cells.nth(7)).toHaveText("⭕", { timeout: 5000 });

  await cells.nth(5).click(); // P1
  await expect(cells.nth(5)).toHaveText("❌", { timeout: 5000 });

  await cells.nth(8).click(); // P2
  await expect(cells.nth(8)).toHaveText("⭕", { timeout: 5000 });

  await cells.nth(6).click(); // P1
  await expect(cells.nth(6)).toHaveText("❌", { timeout: 5000 });

  // Wait for the game state to update and check for the draw message
  await expect(page.locator("text=It's a draw!")).toBeVisible({ timeout: 10000 });
});
