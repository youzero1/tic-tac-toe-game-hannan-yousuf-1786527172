---
status: pending
title: Tic Tac Toe Game with Computer AI
---

1. **Set up the game board state and logic** in `src/routes/index.tsx`:
   - Create state for the 3x3 board (9 squares)
   - Track whose turn it is (human = X, computer = O)
   - Track game status (in progress, human won, computer won, draw)
   - Implement logic to detect win conditions (rows, columns, diagonals)
   - Expected outcome: Board renders as clickable squares; no AI yet.

2. **Build the game board UI** in `src/routes/index.tsx`:
   - Display a 3x3 grid of squares using Tailwind CSS
   - Show whose turn it is (e.g., "Your turn" or "Computer thinking...")
   - Show the current score (wins across rounds)
   - Expected outcome: Board is visually clear and responsive.

3. **Implement human player moves** in `src/routes/index.tsx`:
   - Clicking an empty square places an X and checks for a win or draw
   - Disable further moves after the game ends
   - Expected outcome: Player can click squares and see X appear.

4. **Implement computer AI** in `src/lib/aiStrategy.ts`:
   - Computer tries to win if possible
   - Computer blocks human from winning if possible
   - Otherwise, pick the center, then corners, then remaining squares
   - Expected outcome: Computer makes reasonable moves and sometimes wins.

5. **Add computer move execution** in `src/routes/index.tsx`:
   - After human move, wait 1 second, then place computer O
   - Check for computer win or draw
   - Expected outcome: Computer takes its turn; game progresses naturally.

6. **Implement play again / score tracking** in `src/routes/index.tsx`:
   - Track total wins for human and computer across games
   - Show a "Play Again" button after game ends
   - Reset board for next round while keeping score
   - Expected outcome: Users can play multiple games and see running score.

7. **Polish UI and styling**:
   - Add a title and score display at the top
   - Style the winner announcement prominently
   - Add a reset button to start fresh scores
   - Expected outcome: Game looks polished and is easy to play.
