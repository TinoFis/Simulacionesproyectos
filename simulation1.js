function initSimulation() {
    const canvas = document.getElementById('simulationCanvas');
    const context = canvas.getContext('2d');
    let balls = [];
    const pins = [];
    const columns = 10;
    const bins = new Array(columns).fill(0);

    canvas.width = 800;
    canvas.height = 600;

    // Create pins
    const pinRows = 10;
    const pinSpacing = canvas.width / columns;
    for (let row = 0; row < pinRows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * pinSpacing + (row % 2 === 0 ? pinSpacing / 2 : 0);
            const y = row * pinSpacing;
            pins.push({ x, y });
        }
    }

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

        // Draw the pins
        pins.forEach(pin => {
            context.beginPath();
            context.arc(pin.x, pin.y, 5, 0, Math.PI * 2);
            context.fillStyle = '#ffffff';
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

                // Check for collisions with pins
                pins.forEach(pin => {
                    const dx = ball.x - pin.x;
                    const dy = ball.y - pin.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < ball.radius + 5) {
                        ball.vy *= 0.9; // Slow down the ball slightly after a collision
                        ball.x += Math.random() < 0.5 ? -ball.radius : ball.radius;
                    }
                });
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
}