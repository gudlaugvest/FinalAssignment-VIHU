import { describe, expect, it } from "vitest";
import {
  isDraw,
  calculateWinner,
  getPlayerNameFromSign
} from "../gameUtils";
import { Sign } from "../constants";

const title = "Tic Tac Toe";

describe("Tests", () => {
  // should return winner X if X wins
  it("should return winner X if X wins", () => {
    const squares = [
      Sign.X,
      Sign.X,
      Sign.X,
      Sign.O,
      Sign.O,
      Sign.O,
      Sign.O,
      Sign.O,
      Sign.O,
    ];
    expect(calculateWinner(squares)).toBe(Sign.X);
  });

  // should return winner O if O wins
  it("should return winner O if O wins", () => {
    const squares = [
      Sign.X,
      Sign.X,
      Sign.O,
      Sign.O,
      Sign.O,
      Sign.O,
      Sign.O,
      Sign.O,
      Sign.O,
    ];
    expect(calculateWinner(squares)).toBe(Sign.O);
  });

  // should return draw if no winner
  it("should return draw if no winner", () => {
    const squares = [
      Sign.X,
      Sign.O,
      Sign.X,
      Sign.O,
      Sign.O,
      Sign.X,
      Sign.X,
      Sign.X,
      Sign.O,
    ];
    expect(calculateWinner(squares)).toBe("Draw");
  });

  // title should be "Tic Tac Toe"
  it("title should be 'Tic Tac Toe'", () => {
    expect(title).toBe("Tic Tac Toe");
  });

  // should return true if all squares are filled
  it("should return true if all squares are filled", () => {
    const squares = [
      Sign.X,
      Sign.O,
      Sign.X,
      Sign.O,
      Sign.X,
      Sign.O,
      Sign.X,
      Sign.O,
      Sign.O,
    ];
    expect(isDraw(squares)).toBe(true);
  });

  // should return null when game is still in progress
  it("should return null when game is still in progress", () => {
    const squares = [
      Sign.X,
      Sign.O,
      Sign.X,
      Sign.O,
      null,
      null,
      null,
      null,
      null,
    ];
    expect(calculateWinner(squares)).toBe(null);
  });

  // should return null for empty board
  it("should return null for empty board", () => {
    const squares = [null, null, null, null, null, null, null, null, null];
    expect(calculateWinner(squares)).toBe(null);
  });

  // should detect diagonal win for X
  it("should detect diagonal win for X", () => {
    const squares = [
      Sign.X,
      Sign.O,
      Sign.O,
      null,
      Sign.X,
      Sign.O,
      null,
      null,
      Sign.X,
    ];
    expect(calculateWinner(squares)).toBe(Sign.X);
  });

  // should correctly format player names with emojis
  it("should correctly format player names with emojis", () => {
    const game = {
      id: "1",
      player1_name: "Alice",
      player2_name: "Bob",
      moves: Array(9).fill(""),
      createdAt: new Date(),
    };
    expect(getPlayerNameFromSign(Sign.X, game)).toBe("❌ Alice ");
    expect(getPlayerNameFromSign(Sign.O, game)).toBe("⭕ Bob ");
  });
});
