function initSimulation() {
    console.log("Simulation 2 initialized");

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

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 90;
    slider.value = 45;
    slider.style.width = '100%';
    slider.oninput = (e) => {
        const angleInDegrees = e.target.value;
        lightRay.angle = angleInDegrees * (Math.PI / 180);
        console.log("Slider changed: ", angleInDegrees);
        draw();
    };
    document.getElementById('simulation').prepend(slider);

    function draw() {
        console.log("Drawing simulation frame");
        
        // Fill the background with black
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the boundary
        context.beginPath();
        context.moveTo(boundary.x1, boundary.y1);
        context.lineTo(boundary.x2, boundary.y2);
        context.strokeStyle = '#ffffff';
        context.lineWidth = 2; // Boundary line width
        context.stroke();
        context.closePath();

        // Calculate the point of incidence
        let incidentEndX = boundary.x1;
        let incidentEndY = lightRay.y + (boundary.x1 - lightRay.x) * Math.tan(lightRay.angle);

        // Draw the incident light ray
        context.beginPath();
        context.moveTo(lightRay.x, lightRay.y);
        context.lineTo(incidentEndX, incidentEndY);
        context.strokeStyle = '#ffeb3b';
        context.lineWidth = 4; // Incident light beam thickness
        context.stroke();
        context.closePath();

        // Calculate reflection
        const reflectionAngle = Math.PI - lightRay.angle;
        const reflectionEndX = incidentEndX + 300 * Math.cos(reflectionAngle);
        const reflectionEndY = incidentEndY + 300 * Math.sin(reflectionAngle);

        // Calculate refraction using Snell's law
        const incidentAngle = Math.PI / 2 - lightRay.angle;
        const sinIncidentAngle = Math.sin(incidentAngle);
        const sinRefractedAngle = (refractiveIndex1 / refractiveIndex2) * sinIncidentAngle;
        const refractedAngle = Math.asin(sinRefractedAngle);

        const refractedEndX = incidentEndX + 300 * Math.cos(refractedAngle);
        const refractedEndY = incidentEndY + 300 * Math.sin(refractedAngle);

        // Draw the reflected light ray
        context.beginPath();
        context.moveTo(incidentEndX, incidentEndY);
        context.lineTo(reflectionEndX, reflectionEndY);
        context.strokeStyle = '#00ff00';
        context.lineWidth = 4; // Reflected light beam thickness
        context.stroke();
        context.closePath();

        // Draw the refracted light ray
        context.beginPath();
        context.moveTo(incidentEndX, incidentEndY);
        context.lineTo(refractedEndX, refractedEndY);
        context.strokeStyle = '#0000ff';
        context.lineWidth = 4; // Refracted light beam thickness
        context.stroke();
        context.closePath();
    }

    draw();
}