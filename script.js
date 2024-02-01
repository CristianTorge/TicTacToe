const ROWS = 6;
        const COLUMNS = 7;
        let board = [];

        function initializeBoard() {
            for (let i = 0; i < ROWS; ++i) {
                board[i] = [];
                for (let j = 0; j < COLUMNS; ++j) {
                    board[i][j] = 0;
                }
            }
        }

        function drawBoard() {
            const boardContainer = document.getElementById("connect-four-board");
            boardContainer.innerHTML = "";
            for (let i = 0; i < ROWS; ++i) {
                const row = document.createElement("div");
                row.classList.add("row");
                for (let j = 0; j < COLUMNS; ++j) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    row.appendChild(cell);
                }
                boardContainer.appendChild(row);
            }
        }

        function checkWinner(row, col) {
            const directions = [
                [0, 1],
                [1, 0],
                [1, 1],
                [-1, 1]
            ];
            for (let [dx, dy] of directions) {
                let count = 1;
                for (let i = 1; i <= 3; ++i) {
                    const newRow = row + i * dx;
                    const newCol = col + i * dy;
                    if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLUMNS || board[newRow][newCol] !== currentPlayer) {
                        break;
                    }
                    ++count;
                }
                for (let i = 1; i <= 3; i++) {
                    const newRow = row - i * dx;
                    const newCol = col - i * dy;
                    if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLUMNS || board[newRow][newCol] !== currentPlayer) {
                        break;
                    }
                    ++count;
                }
                if (count >= 4) {
                    return true;
                }
            }
            return false;
        }

        function dropPiece(col) {
            let row = ROWS - 1;
            while (row >= 0 && board[row][col] !== 0) {
                row--;
            }
            if (row >= 0) {
                board[row][col] = currentPlayer;
                const cell = document.querySelector(`.cell[data-col='${col}'][data-row='${row}']`);
                cell.style.backgroundColor = currentPlayer === 1 ? "red" : "yellow";
                if (checkWinner(row, col)) {
                    document.getElementById("message").innerText = `Player ${currentPlayer} is the winner!`;
                    document.querySelectorAll(".cell").forEach(cell => {
                        cell.removeEventListener("click", handleClick);
                    });
                    return;
                }
                currentPlayer = currentPlayer === 1 ? 2 : 1;
            }
        }

        function handleClick(event) {
            const col = parseInt(event.target.dataset.col);
            dropPiece(col);
        }

        initializeBoard();
        drawBoard();
        let currentPlayer = 1;
        document.querySelectorAll(".cell").forEach(cell => {
            cell.addEventListener("click", handleClick);
        });
