const minScore = 50; // Minimum score required to proceed

function showScoreScreen(finalScore) {
    const scoreDisplay = document.getElementById("scoreNumber");
    const stageScreen = document.getElementById("stage-complete-screen");
    const stageTitle = stageScreen.querySelector("h2"); // Get the heading
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

            // **🔹 Check if level is passed or failed**
            if (finalScore >= minScore) {
                stageTitle.textContent = "Stage Complete! 🎉"; // Normal completion
                startConfetti(); // 🎉 Start confetti if passed
                playSound('success-sound');
            } else {
                stageTitle.textContent = "Try Again! 😢"; // Level failed message
                playSound('fail-sound');
            }
        } else {
            currentScore += Math.ceil(finalScore / 50); // Adjust step for smoothness
            scoreDisplay.textContent = currentScore;
        }
    }, 30);
}

function revealStars(score) {
    const stars = document.querySelectorAll(".star");

    setTimeout(() => {
        if (score >= 150) {
            stars[0].style.opacity = "1";
            stars[1].style.opacity = "1";
            stars[2].style.opacity = "1"; // Full 3 stars
        } else if (score >= 100) {
            stars[0].style.opacity = "1";
            stars[1].style.opacity = "1"; // 2 stars
            stars[2].style.opacity = "0.2";

        } else if (score >= 50) {
            stars[0].style.opacity = "1"; // 1 star
            stars[1].style.opacity = "0.2";

            stars[2].style.opacity = "0.2";

        } else {
            stars[0].style.opacity = "0.2";
            stars[1].style.opacity = "0.2";

            stars[2].style.opacity = "0.2";
        }

    }, 500);
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

