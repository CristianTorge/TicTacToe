document.addEventListener('DOMContentLoaded', function() {
        const cells = document.querySelectorAll('.cell');
        let currentPlayer = 0;
        const cellValues = Array.from({ length: 9 }).fill('');
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        function checkWinner() {
            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[a] === cellValues[c]) {
                    return cellValues[a];
                }
            }
            return null;
        }

        function endGame(winner) {
            cells.forEach(cell => cell.removeEventListener('click', cellClick));
            const winnerMessage = document.getElementById('winnerMessage');
            winnerMessage.textContent = winner ? `WINNER: ${winner}` : "DRAW!";
        }

        function cellClick() {
            const index = Array.from(cells).indexOf(this);
            if (!cellValues[index]) {
                cellValues[index] = currentPlayer === 0 ? 'X' : 'O';
                this.textContent = cellValues[index];
                this.classList.add(currentPlayer === 0 ? 'X' : 'O');
                const winner = checkWinner();
                if (winner || !cellValues.includes('')) {
                    endGame(winner);
                } else {
                    currentPlayer = currentPlayer === 0 ? 1 : 0;
                }
            }
        }

        cells.forEach(cell => cell.addEventListener('click', cellClick));
    });
        let currentPlayer = 1;
        document.querySelectorAll(".cell").forEach(cell => {
            cell.addEventListener("click", handleClick);
        });
