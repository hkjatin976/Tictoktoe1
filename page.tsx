
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe3D() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_2ab2a317b2.mp3?filename=click-124467.mp3");
    const winSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_66b263fcfb.mp3?filename=win-144276.mp3");
    const loseSound = new Audio("https://cdn.pixabay.com/download/audio/2021/09/01/audio_c8e4a2f6ff.mp3?filename=game-over-arcade-6435.mp3");
    setSound({ click: clickSound, win: winSound, lose: loseSound });
  }, []);

  const checkWinner = (newBoard) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const botMove = (newBoard) => {
    const emptyIndices = newBoard.map((val, idx) => val === null ? idx : null).filter(idx => idx !== null);
    if (emptyIndices.length === 0) return;
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newBoard[randomIndex] = "O";
    setBoard([...newBoard]);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (sound?.lose) sound.lose.play();
    } else {
      setPlayerTurn(true);
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner || !playerTurn) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    if (sound?.click) sound.click.play();
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (sound?.win) sound.win.play();
    } else {
      setPlayerTurn(false);
      setTimeout(() => botMove(newBoard), 700);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setPlayerTurn(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092334561-24c98f0487b8?auto=format&fit=crop&w=1350&q=80')" }}
    >
      <div className="absolute top-4 left-4 text-white text-3xl font-extrabold drop-shadow-2xl animate-pulse">HK JATIN</div>
      <Card className="p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] bg-white/30 backdrop-blur-md border border-white/50">
        <CardContent className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-xl tracking-widest">3D Tic Tac Toe</h1>
          <div className="grid grid-cols-3 gap-4">
            {board.map((val, idx) => (
              <div
                key={idx}
                onClick={() => handleClick(idx)}
                className={cn(
                  "w-24 h-24 rounded-[1.5rem] flex items-center justify-center text-4xl font-extrabold text-white cursor-pointer bg-gradient-to-br from-[#8e2de2] to-[#4a00e0] shadow-[0_8px_30px_rgba(0,0,0,0.2)] transform transition-transform duration-300 hover:scale-110",
                  val && "cursor-not-allowed"
                )}
              >
                {val}
              </div>
            ))}
          </div>
          {winner && (
            <div className="text-2xl font-bold text-white mt-4 drop-shadow-xl animate-bounce">
              {winner === "X" ? "You win! 🎉" : "Bot wins! 🤖"}
            </div>
          )}
          <Button onClick={resetGame} className="mt-4 px-8 py-3 text-white text-lg font-semibold bg-black/70 rounded-full hover:bg-black transition-all shadow-xl">
            Restart Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
