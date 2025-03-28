import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { EMOJI, Sign } from "../utils/constants";

const Home: NextPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [secondPlayerName, setSecondPlayerName] = useState("");
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  async function createGame() {
    setIsCreating(true);
    try {
      const { data } = await axios.post("/api/new", {
        playerName,
        secondPlayerName,
      });
      router.push(`/game/${data.id}`);
    } catch (error) {
      setShowError(true);
    }
  }

  return (
    <>
      <h1 className={styles.title}>Tic Tac Toe #️⃣</h1>
      <div className={styles.grid}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            createGame();
          }}
        >
          <input
            className={styles.input}
            value={playerName}
            placeholder={`${EMOJI[Sign.X]} Your Name`}
            onChange={(event) => setPlayerName(event.target.value)}
            required
          />
          <input
            className={styles.input}
            value={secondPlayerName}
            placeholder={`${EMOJI[Sign.O]} Opponent Name`}
            onChange={(event) => setSecondPlayerName(event.target.value)}
            required
          />

          <button
            className={styles.startButton}
            disabled={isCreating}
            type="submit"
          >
            Start Game
          </button>
        </form>
        <Link href="/game/list">See all games</Link>
      </div>
    </>
  );
};

export default Home;
