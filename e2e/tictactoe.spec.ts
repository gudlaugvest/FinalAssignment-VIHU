import { test, expect } from "@playwright/test";

// Should have Tic Tac Toe title
test("should have Tic Tac Toe title a title", async ({ page }) => {
  await page.goto("http://localhost:3001");
  await expect(page).toHaveTitle("Tic Tac Toe");
});


// Should have all games link
test("should have all games link", async ({ page }) => {
  await page.goto("http://localhost:3001");
  const allGamesLink = await page.getByText('See all games');
  await allGamesLink.click();
  await expect(page).toHaveURL("http://localhost:3001/game/list");
});

// Should be able to pick a cell
test("should be able to pick a cell", async ({ page }) => {
  await page.goto("http://localhost:3001");
  const player1 = await page.getByPlaceholder(/❌.*Your Name/);
  const player2 = await page.getByPlaceholder(/⭕.*Opponent Name/);
  await player1.fill("Player1");
  await player2.fill("Player2");
  const startButton = await page.getByText('Start Game');
  await startButton.click();
  const cell = await page.locator('div.Cell_cell__6Ors9').nth(0);
  await cell.click();
  await expect(cell).toHaveText('❌');
});



// Should be able to enter players name
test("should be able to enter players name", async ({ page }) => {
  // Navigate to the page
  await page.goto("http://localhost:3001");
  const player1 = await page.getByPlaceholder(/❌.*Your Name/);
  const player2 = await page.getByPlaceholder(/⭕.*Opponent Name/);
  await player1.fill("Player1");
  await player2.fill("Player2");
  await expect(player1).toHaveValue("Player1");
  await expect(player2).toHaveValue("Player2");
});

// Should be able to start game
test("should be able to start game", async ({ page }) => {
  await page.goto("http://localhost:3001");
  const player1 = await page.getByPlaceholder(/❌.*Your Name/);
  const player2 = await page.getByPlaceholder(/⭕.*Opponent Name/);
  await player1.fill("Player1");
  await player2.fill("Player2");
  const startButton = await page.getByText('Start Game');
  await startButton.click();
  await expect(page.locator("text=Player1")).toBeVisible();
});

// Should announce winner when game is won
test("should announce winner when game is won", async ({ page }) => {
  await page.goto("http://localhost:3001");
  
  // Set up the game with player names
  const player1Input = await page.getByPlaceholder(/❌.*Your Name/);
  await player1Input.fill("Player1");
  const player2Input = await page.getByPlaceholder(/⭕.*Opponent Name/);
  await player2Input.fill("Player2");
  
  const startButton = await page.getByRole('button', { name: 'Start Game' });
  await startButton.click();
  const cells = page.locator('.Cell_cell__6Ors9');
  
  // Player 1 clicks cell 0
  await cells.nth(0).click();
  // Wait a moment for the move to register
  await page.waitForTimeout(500);
  
  // Player 2's turn (cell 3)
  await cells.nth(3).click();
  await page.waitForTimeout(500);
  
  // Player 1 clicks cell 1
  await cells.nth(1).click();
  await page.waitForTimeout(500);
  
  // Player 2's turn (cell 4)
  await cells.nth(4).click();
  await page.waitForTimeout(500);
  
  // Player 1 clicks cell 2 (winning move)
  await cells.nth(2).click();
  await page.waitForTimeout(500);

  await page.waitForTimeout(1000);
  await expect(page.getByText('Player1 Won')).toBeVisible();
});

// Should show draw when game is a draw
test("should show draw when game is a draw", async ({ page }) => {
  await page.goto("http://localhost:3001");
  const player1 = await page.getByPlaceholder(/❌.*Your Name/);
  const player2 = await page.getByPlaceholder(/⭕.*Opponent Name/);
  await player1.fill("Player1");
  await player2.fill("Player2");
  const startButton = await page.getByRole('button', { name: 'Start Game' });
  await startButton.click();
  const cells = page.locator('.Cell_cell__6Ors9');
  

  // First row
  // Player 1 clicks cell 0
  await cells.nth(0).click();
  await page.waitForTimeout(500);

  // Player 2 clicks cell 2
  await cells.nth(2).click();
  await page.waitForTimeout(500);

  // Player 1 clicks cell 1
  await cells.nth(1).click();
  await page.waitForTimeout(500);

  // Second row
  // Player 2 clicks cell 3
  await cells.nth(3).click();
  await page.waitForTimeout(500);

  // Player 1 clicks cell 4
  await cells.nth(4).click();
  await page.waitForTimeout(500);

  // Player 2 clicks cell 7
  await cells.nth(7).click();
  await page.waitForTimeout(500);


  // Third row
  // Player 1 clicks cell 5
  await cells.nth(5).click();
  await page.waitForTimeout(500);

  // Player 2 clicks cell 8
  await cells.nth(8).click();
  await page.waitForTimeout(500);

  // Player 1 clicks cell 8
  await cells.nth(6).click();
  await page.waitForTimeout(500);
  
  await expect(page.getByText('It\'s a draw!')).toBeVisible({ timeout: 10000 });
});
