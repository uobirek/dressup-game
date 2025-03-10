function showScoreScreen(finalScore) {
    const scoreDisplay = document.getElementById("scoreNumber");
    const stageScreen = document.getElementById("stage-complete-screen");
    const stars = document.querySelectorAll(".star");
    const message = document.getElementById("scoreMessage");

    let currentScore = 0;
    stageScreen.style.display = "block";
    message.textContent = "Calculating Score..."; // Show loading message
    scoreDisplay.textContent = "0";

    // Animated Score Counter
    const scoreInterval = setInterval(() => {
        if (currentScore >= finalScore) {
            clearInterval(scoreInterval);
            message.textContent = "Your Score:"; // Change text after calculation
            revealStars(finalScore); // Show stars after score completes
        } else {
            currentScore += Math.ceil(finalScore / 50); // Adjust step for smoothness
            scoreDisplay.textContent = currentScore;
        }
    }, 30);
}


// Confetti Effect
function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiPieces = [];
    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.y += p.speed;
            if (p.y > canvas.height) p.y = 0;
        });
        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}

