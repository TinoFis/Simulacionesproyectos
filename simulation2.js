function initSimulation() {
    const canvas = document.getElementById('simulationCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    let lightRay = {
        x: 100,
        y: 300,
        angle: Math.PI / 4, // 45 degrees
        speed: 5
    };

    const boundary = {
        x1: 400,
        y1: 0,
        x2: 400,
        y2: 600
    };

    const refractiveIndex1 = 1; // Air
    const refractiveIndex2 = 1.5; // Glass or water

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the boundary
        context.beginPath();
        context.moveTo(boundary.x1, boundary.y1);
        context.lineTo(boundary.x2, boundary.y2);
        context.strokeStyle = '#ffffff';
        context.stroke();
        context.closePath();

        // Draw the light ray
        context.beginPath();
        context.moveTo(lightRay.x, lightRay.y);
        context.lineTo(lightRay.x + 50 * Math.cos(lightRay.angle), lightRay.y + 50 * Math.sin(lightRay.angle));
        context.strokeStyle = '#ffeb3b';
        context.stroke();
        context.closePath();
    }

    function update() {
        lightRay.x += lightRay.speed * Math.cos(lightRay.angle);
        lightRay.y += lightRay.speed * Math.sin(lightRay.angle);

        // Check for intersection with the boundary
        if (lightRay.x >= boundary.x1 && lightRay.x <= boundary.x2) {
            const incidentAngle = lightRay.angle - Math.PI / 2;
            const sinIncidentAngle = Math.sin(incidentAngle);
            const sinRefractedAngle = (refractiveIndex1 / refractiveIndex2) * sinIncidentAngle;
            const refractedAngle = Math.asin(sinRefractedAngle) + Math.PI / 2;

            lightRay.angle = refractedAngle;
            lightRay.x = boundary.x1; // Reset position to boundary
        }
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
}