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

        console.log('Username:', username);
        console.log('Password:', password);

        if (username === validUsername && password === validPassword) {
            console.log('Login successful');
            loginForm.style.display = 'none';
            simulation.style.display = 'block';
            initSimulation();
        } else {
            console.log('Login failed');
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
        }
    };

    function initSimulation() {
        canvas.width = 800;
        canvas.height = 600;

        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'blue';
            context.fillRect(50, 50, 200, 100);
        }

        draw();
    }
};