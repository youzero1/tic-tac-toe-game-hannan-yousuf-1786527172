import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: TicTacToePage,
});

type Board = (string | null)[];

function TicTacToePage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ player: 0, computer: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares: Board): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getAvailableMoves = (squares: Board): number[] => {
    return squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];
  };

  const getComputerMove = (squares: Board): number => {
    const available = getAvailableMoves(squares);

    // Try to win
    for (const move of available) {
      const testBoard = [...squares];
      testBoard[move] = 'O';
      if (calculateWinner(testBoard) === 'O') {
        return move;
      }
    }

    // Try to block player
    for (const move of available) {
      const testBoard = [...squares];
      testBoard[move] = 'X';
      if (calculateWinner(testBoard) === 'X') {
        return move;
      }
    }

    // Take center if available
    if (available.includes(4)) return 4;

    // Take a corner
    const corners = [0, 2, 6, 8].filter((idx) => available.includes(idx));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Take any available
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleSquareClick = (index: number) => {
    if (gameOver || board[index] || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner === 'X') {
      setScores((prev) => ({ ...prev, player: prev.player + 1 }));
      setGameOver(true);
      return;
    }

    if (getAvailableMoves(newBoard).length === 0) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      setGameOver(true);
      return;
    }

    setIsXNext(false);

    // Computer moves
    setTimeout(() => {
      const computerMove = getComputerMove(newBoard);
      newBoard[computerMove] = 'O';
      setBoard(newBoard);

      const computerWinner = calculateWinner(newBoard);
      if (computerWinner === 'O') {
        setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
        setGameOver(true);
        return;
      }

      if (getAvailableMoves(newBoard).length === 0) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        setGameOver(true);
        return;
      }

      setIsXNext(true);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const resetScores = () => {
    setScores({ player: 0, computer: 0, draws: 0 });
    resetGame();
  };

  const winner = calculateWinner(board);
  const isBoardFull = getAvailableMoves(board).length === 0;
  const status = winner
    ? winner === 'X'
      ? 'You win!'
      : 'Computer wins!'
    : isBoardFull
      ? "It's a draw!"
      : isXNext
        ? 'Your turn'
        : 'Computer thinking...';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-slate-800 p-8 shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-white">Tic Tac Toe</h1>

        {/* Score Board */}
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-700 p-4">
          <div className="text-center">
            <p className="text-sm text-slate-400">You</p>
            <p className="text-2xl font-bold text-green-400">{scores.player}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-400">Draw</p>
            <p className="text-2xl font-bold text-yellow-400">{scores.draws}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-400">Computer</p>
            <p className="text-2xl font-bold text-red-400">{scores.computer}</p>
          </div>
        </div>

        {/* Game Status */}
        <div className="rounded-lg bg-slate-700 p-4 text-center">
          <p className="text-lg font-semibold text-slate-100">{status}</p>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              disabled={!isXNext || gameOver}
              className="aspect-square rounded-lg bg-slate-600 text-4xl font-bold transition-colors duration-200 hover:bg-slate-500 disabled:cursor-not-allowed"
            >
              <span
                className={
                  value === 'X' ? 'text-blue-400' : value === 'O' ? 'text-red-400' : ''
                }
              >
                {value}
              </span>
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={resetGame}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          >
            New Game
          </button>
          <button
            onClick={resetScores}
            className="w-full rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-slate-700"
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}
