window.onload = function() {
    const form = document.getElementById('form');
    const errorMessage = document.getElementById('errorMessage');
    const loginForm = document.getElementById('loginForm');
    const selectionMenu = document.getElementById('selectionMenu');
    const simulation = document.getElementById('simulation');

    const validUsername = 'Usuario';
    const validPassword = '12345';

    form.onsubmit = function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            loginForm.style.display = 'none';
            selectionMenu.style.display = 'block';
        } else {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
        }
    };

    window.loadSimulation = function(scriptName) {
        const script = document.createElement('script');
        script.src = scriptName;
        script.onload = () => {
            selectionMenu.style.display = 'none';
            simulation.style.display = 'block';
            initSimulation();
        };
        document.body.appendChild(script);
    };
};