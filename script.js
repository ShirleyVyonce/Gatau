const startButton = document.getElementById('startButton');
const cakeImage = document.getElementById('cakeImage');
const message = document.getElementById('message');
const confettiCanvas = document.getElementById('confetti');
const balloonsCanvas = document.getElementById('balloons');
const kazuhaLeft = document.getElementById('kazuhaLeft');
const kazuhaRight = document.getElementById('kazuhaRight');
const explosion = document.getElementById('explosion');
const birthdayMusic = document.getElementById('birthdayMusic');
const timer = document.getElementById('timer');
const letter = document.getElementById('letter');
const envelopeFront = document.getElementById('envelopeFront');
const ctxConfetti = confettiCanvas.getContext('2d');
const ctxBalloons = balloonsCanvas.getContext('2d');
const closeButton = document.getElementById('closeButton');

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    explosion.style.display = 'block'; // Tampilkan efek ledakan

    // Setelah efek ledakan selesai, tampilkan elemen-elemen utama
    setTimeout(() => {
        explosion.style.display = 'none';
        cakeImage.style.display = 'block';
        message.style.display = 'block';
        kazuhaLeft.style.display = 'block';
        kazuhaRight.style.display = 'block';
        birthdayMusic.play(); // Memutar musik
        launchConfetti();
        launchBalloons();

        // Tampilkan timer setelah 3-5 detik
        setTimeout(() => {
            startTimer();
        }, 3000); // 3000ms = 3 detik
    }, 500); // Sesuaikan waktu dengan durasi animasi ledakan
});

function startTimer() {
    timer.style.display = 'block';
    let timeLeft = 5;

    const countdownInterval = setInterval(() => {
        timer.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            timer.style.display = 'none';
            openLetter();
        }
    }, 1000);
}

function openLetter() {
    letter.style.display = 'block';
    envelopeFront.addEventListener('click', () => {
        letter.classList.add('open');
        setTimeout(() => {
            document.getElementById('letterContent').classList.add('open');
        }, 1000); // Tambahkan delay sebelum animasi surat muncul
    });
}

function launchConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettiPieces = Array.from({ length: 300 }, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        color: `hsl(${Math.random() * 240 + 180}, 100%, 70%)`, // Hanya warna biru
        rotation: Math.random() * 360,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 1,
    }));

    function drawConfetti() {
        ctxConfetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiPieces.forEach(piece => {
            ctxConfetti.save();
            ctxConfetti.translate(piece.x, piece.y);
            ctxConfetti.rotate((piece.rotation * Math.PI) / 180);
            ctxConfetti.fillStyle = piece.color;
            ctxConfetti.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctxConfetti.restore();
            piece.y += piece.speed;

            if (piece.y > confettiCanvas.height) {
                piece.y = -piece.size;
                piece.x = Math.random() * confettiCanvas.width;
            }

            piece.rotation += 5;
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}

function launchBalloons() {
    balloonsCanvas.width = window.innerWidth;
    balloonsCanvas.height = window.innerHeight;

    const balloonColors = ["#1E90FF", "#87CEFA", "#ADD8E6", "#B0E0E6"]; // Warna biru saja
    const balloons = [];

    function createBalloon() {
        const balloon = {
            x: Math.random() * balloonsCanvas.width,
            y: balloonsCanvas.height,
            color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
            size: Math.random() * 20 + 30,
            speed: Math.random() * 2 + 1
        };
        balloons.push(balloon);
    }

    function drawBalloons() {
        ctxBalloons.clearRect(0, 0, balloonsCanvas.width, balloonsCanvas.height);

        balloons.forEach((balloon, index) => {
            ctxBalloons.beginPath();
            ctxBalloons.arc(balloon.x, balloon.y, balloon.size, 0, Math.PI * 2);
            ctxBalloons.fillStyle = balloon.color;
            ctxBalloons.fill();
            balloon.y -= balloon.speed;

            if (balloon.y + balloon.size < 0) {
                balloons.splice(index, 1);
            }
        });

        requestAnimationFrame(drawBalloons);
    }

    setInterval(createBalloon, 500); 
    drawBalloons();
}

closeButton.addEventListener('click', () => {
    letter.classList.remove('open');
    setTimeout(() => {
        document.getElementById('letterContent').classList.remove('open');
    }, 500);
    setTimeout(() => {
        letter.style.display = 'none';
    }, 1000);
});