document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("dinoCanvas");
    const ctx = canvas.getContext("2d");
    const jumpCountEl = document.getElementById("jump-count");
    const overlay = document.getElementById("dino-overlay");

    let jumps = 0;
    const targetJumps = 10;
    let isGameOver = false;
    let isUnlocked = false;
    let frame = 0;

    // Canvas Ground Y Position
    const groundY = 110;

    // Object Dino
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

    // Reset State Game
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

    // Spawn Kaktus Random Interval
    function spawnCactus() {
        cacti.push({
            x: canvas.width,
            y: groundY + 4, // Duduk di tanah
            width: 16,
            height: 22,
            speed: 4.5
        });
    }

    // Fungsi Lompat / Restart
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

    // Unlock & Hide Overlay
    function unlockTerminal() {
        isUnlocked = true;
        isGameOver = true;
        overlay.classList.add("hidden");
        setTimeout(() => {
            const cliInput = document.getElementById("cli-input");
            if (cliInput) cliInput.focus();
        }, 600);
    }

// Event Listener Controls (Hanya cegah spasi KALAU overlay dino masih muncul)
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (!isUnlocked) {
            e.preventDefault(); // Matikan scroll/spasi cuma pas game dino aktif
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

    // --- DRAW PIXEL ART DINO ---
    function drawDino(x, y) {
        ctx.fillStyle = "#50fa7b"; // Warna Hijau Retro Terminal

        // Head & Body
        ctx.fillRect(x + 10, y, 12, 6);
        ctx.fillRect(x + 10, y + 6, 14, 6);
        ctx.fillRect(x + 4, y + 10, 18, 10);
        ctx.fillRect(x + 6, y + 20, 12, 4);

        // Eye (Hitam)
        ctx.fillStyle = "#202124";
        ctx.fillRect(x + 14, y + 2, 2, 2);

        // Arms
        ctx.fillStyle = "#50fa7b";
        ctx.fillRect(x + 18, y + 12, 4, 2);

        // Legs (Animasi Lari Sederhana)
        if (dino.isGrounded && !isGameOver) {
            if (Math.floor(frame / 6) % 2 === 0) {
                ctx.fillRect(x + 6, y + 24, 4, 3); // Left Leg Down
                ctx.fillRect(x + 14, y + 22, 4, 2); // Right Leg Up
            } else {
                ctx.fillRect(x + 6, y + 22, 4, 2);
                ctx.fillRect(x + 14, y + 24, 4, 3);
            }
        } else {
            // Air / Jump Legs
            ctx.fillRect(x + 6, y + 24, 4, 2);
            ctx.fillRect(x + 14, y + 24, 4, 2);
        }
    }

    // --- DRAW PIXEL ART CACTUS ---
    function drawCactus(x, y, w, h) {
        ctx.fillStyle = "#ff5555"; // Warna Merah Terminal

        // Batang Utama Kaktus
        ctx.fillRect(x + 5, y, 6, h);
        
        // Duri Left Branch
        ctx.fillRect(x + 1, y + 6, 4, 3);
        ctx.fillRect(x + 1, y + 4, 2, 3);

        // Duri Right Branch
        ctx.fillRect(x + 11, y + 10, 4, 3);
        ctx.fillRect(x + 13, y + 8, 2, 3);
    }

    // --- MAIN GAME LOOP ---
    function update() {
        if (isGameOver || isUnlocked) {
            if (isGameOver && !isUnlocked) {
                // Tampilan Game Over
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#ff5555";
                ctx.font = "bold 16px monospace";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER! HIT CACTUS", canvas.width / 2, 60);

                ctx.fillStyle = "#f1f3f4";
                ctx.font = "12px monospace";
                ctx.fillText("[ Tekan SPASI / TAP untuk Restart ]", canvas.width / 2, 85);
            }
            return;
        }

        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Garis Tanah
        ctx.strokeStyle = "#5f6368";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY + 26);
        ctx.lineTo(canvas.width, groundY + 26);
        ctx.stroke();

        // Gravitasi & Fisika Dino
        dino.dy += dino.gravity;
        dino.y += dino.dy;

        if (dino.y >= groundY) {
            dino.y = groundY;
            dino.dy = 0;
            dino.isGrounded = true;
        }

        // Render Dino
        drawDino(dino.x, dino.y);

        // Spawn Kaktus (Tiap ~100-140 frame random)
        if (frame % 110 === 0) {
            spawnCactus();
        }

        // Update & Render Kaktus
        for (let i = 0; i < cacti.length; i++) {
            let c = cacti[i];
            c.x -= c.speed;

            drawCactus(c.x, c.y, c.width, c.height);

            // AABB Collision Detection (Cek Tabrakan Presisi)
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

        // Hapus Kaktus Lewat Layar
        cacti = cacti.filter(c => c.x + c.width > 0);

        requestAnimationFrame(update);
    }

    update();
});