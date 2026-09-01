// Simpan script dino ini ke file terpisah: /home/dino.js
// Lalu load script-nya di index.html sebelum terminal.js
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("dinoCanvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const jumpCountEl = document.getElementById("jump-count");
    const overlay = document.getElementById("dino-overlay");

    let jumps = 0;
    const targetJumps = 3;
    let isGameOver = false;
    let isUnlocked = false;
    let frame = 0;

    const groundY = 110;

    const dino = {
        x: 50,
        y: groundY,
        width: 24,
        height: 26,
        dy: 0,
        gravity: 0.6,
        jumpForce: -10,
        isGrounded: true
    };

    let cacti = [];

    function resetGame() {
        jumps = 0;
        jumpCountEl.innerText = jumps;
        dino.y = groundY;
        dino.dy = 0;
        dino.isGrounded = true;
        cacti = [];
        frame = 0;
        isGameOver = false;
        requestAnimationFrame(update);
    }

    function spawnCactus() {
        cacti.push({
            x: canvas.width,
            y: groundY + 4,
            width: 16,
            height: 22,
            speed: 4.5
        });
    }

    function handleAction() {
        if (isUnlocked) return;

        if (isGameOver) {
            resetGame();
            return;
        }

        if (dino.isGrounded) {
            dino.dy = dino.jumpForce;
            dino.isGrounded = false;
            jumps++;
            jumpCountEl.innerText = jumps;

            if (jumps >= targetJumps) {
                unlockTerminal();
            }
        }
    }

    function unlockTerminal() {
        isUnlocked = true;
        isGameOver = true;
        overlay.classList.add("hidden");
        setTimeout(() => {
            const cliInput = document.getElementById("command-input");
            if (cliInput) cliInput.focus();
        }, 600);
    }

    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            if (!isUnlocked) {
                e.preventDefault();
                handleAction();
            }
        }
    });

    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleAction();
    });

    canvas.addEventListener("click", () => {
        handleAction();
    });

    function drawDino(x, y) {
        ctx.fillStyle = "#50fa7b";
        ctx.fillRect(x + 10, y, 12, 6);
        ctx.fillRect(x + 10, y + 6, 14, 6);
        ctx.fillRect(x + 4, y + 10, 18, 10);
        ctx.fillRect(x + 6, y + 20, 12, 4);

        ctx.fillStyle = "#12141c";
        ctx.fillRect(x + 14, y + 2, 2, 2);

        ctx.fillStyle = "#50fa7b";
        ctx.fillRect(x + 18, y + 12, 4, 2);

        if (dino.isGrounded && !isGameOver) {
            if (Math.floor(frame / 6) % 2 === 0) {
                ctx.fillRect(x + 6, y + 24, 4, 3);
                ctx.fillRect(x + 14, y + 22, 4, 2);
            } else {
                ctx.fillRect(x + 6, y + 22, 4, 2);
                ctx.fillRect(x + 14, y + 24, 4, 3);
            }
        } else {
            ctx.fillRect(x + 6, y + 24, 4, 2);
            ctx.fillRect(x + 14, y + 24, 4, 2);
        }
    }

    function drawCactus(x, y, w, h) {
        ctx.fillStyle = "#ff5555";
        ctx.fillRect(x + 5, y, 6, h);
        ctx.fillRect(x + 1, y + 6, 4, 3);
        ctx.fillRect(x + 1, y + 4, 2, 3);
        ctx.fillRect(x + 11, y + 10, 4, 3);
        ctx.fillRect(x + 13, y + 8, 2, 3);
    }

    function update() {
        if (isGameOver || isUnlocked) {
            if (isGameOver && !isUnlocked) {
                ctx.fillStyle = "rgba(18, 20, 28, 0.75)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#ff5555";
                ctx.font = "bold 14px monospace";
                ctx.textAlign = "center";
                ctx.fillText("SYSTEM BREACH FAILED // CACTUS HIT", canvas.width / 2, 60);

                ctx.fillStyle = "#c9d1d9";
                ctx.font = "12px monospace";
                ctx.fillText("[ Press SPACE / TAP to Re-authenticate ]", canvas.width / 2, 85);
            }
            return;
        }

        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#2a2e3d";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY + 26);
        ctx.lineTo(canvas.width, groundY + 26);
        ctx.stroke();

        dino.dy += dino.gravity;
        dino.y += dino.dy;

        if (dino.y >= groundY) {
            dino.y = groundY;
            dino.dy = 0;
            dino.isGrounded = true;
        }

        drawDino(dino.x, dino.y);

        if (frame % 110 === 0) {
            spawnCactus();
        }

        for (let i = 0; i < cacti.length; i++) {
            let c = cacti[i];
            c.x -= c.speed;

            drawCactus(c.x, c.y, c.width, c.height);

            const dinoBox = { x: dino.x + 4, y: dino.y + 2, w: dino.width - 6, h: dino.height - 2 };
            const cactusBox = { x: c.x + 2, y: c.y, w: c.width - 4, h: c.height };

            if (
                dinoBox.x < cactusBox.x + cactusBox.w &&
                dinoBox.x + dinoBox.w > cactusBox.x &&
                dinoBox.y < cactusBox.y + cactusBox.h &&
                dinoBox.y + dinoBox.h > cactusBox.y
            ) {
                isGameOver = true;
            }
        }

        cacti = cacti.filter(c => c.x + c.width > 0);

        requestAnimationFrame(update);
    }

    update();
});