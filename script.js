window.onload = function() {
    const canvas = document.getElementById('simulationCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'blue';
        context.fillRect(50, 50, 200, 100);
    }

    draw();
}
