window.onload = function() {
    const canvas = document.getElementById('simulationCanvas');
    const context = canvas.getContext('2d');
    const form = document.getElementById('form');
    const errorMessage = document.getElementById('errorMessage');
    const loginForm = document.getElementById('loginForm');
    const simulation = document.getElementById('simulation');

    const validUsername = 'Usuario';
    const validPassword = '12345';

    form.onsubmit = function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            loginForm.style.display = 'none';
            simulation.style.display = 'block';
            initSimulation();
        } else {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
        }
    };

    let balls = [];
    const columns = 20; // Number of columns for bins
    const bins = new Array(columns).fill(0);

    function initSimulation() {
        canvas.width = 800;
        canvas.height = 600;

        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the balls
            balls.forEach(ball => {
                context.beginPath();
                context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                context.fillStyle = ball.color;
                context.fill();
                context.closePath();
            });

            // Draw the bins
            const binWidth = canvas.width / columns;
            for (let i = 0; i < columns; i++) {
                context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                context.fillRect(i * binWidth, canvas.height - bins[i] * 10, binWidth - 2, bins[i] * 10);
            }
        }

        function update() {
            balls.forEach(ball => {
                if (ball.y < canvas.height - ball.radius) {
                    ball.y += ball.vy;
                } else {
                    const binIndex = Math.floor(ball.x / (canvas.width / columns));
                    bins[binIndex]++;
                    balls = balls.filter(b => b !== ball);
                }
            });
        }

        function loop() {
            update();
            draw();
            requestAnimationFrame(loop);
        }

        loop();
    }

    window.addBalls = function(num) {
        for (let i = 0; i < num; i++) {
            const radius = 5;
            const x = canvas.width / 2;
            const y = radius;
            const vy = 2;
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            balls.push({ x, y, vy, radius, color });
        }
    };
};