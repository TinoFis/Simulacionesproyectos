function initSimulation() {
  console.log("Simulation initialized");

  const canvas = document.getElementById('simulationCanvas');
  const context = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 600;

  let lightRay = {
    x: 100,
    y: 300,
    angle: 0,
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

  // Slider Styling and Angle Display
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = -45;
  slider.max = 45;
  slider.value = 0;
  slider.style.width = '250px';
  slider.style.height = '15px';
  slider.style.marginTop = '10px';
  slider.style.marginBottom = '10px';
  const angleDisplay = document.createElement('div');
  angleDisplay.textContent = `Angle: ${slider.value}°`;
  document.getElementById('simulation').prepend(angleDisplay); // Add above slider
  document.getElementById('simulation').prepend(slider);

  slider.oninput = (e) => {
    const angleInDegrees = e.target.value;
    lightRay.angle = angleInDegrees * (Math.PI / 180);
    angleDisplay.textContent = `Angle: ${angleInDegrees}°`;
    draw();
  };

  // Add Labels for Light Rays and Angle Display
  function drawLabelsAndAngle(reflectionAngle, refractedAngle) {
    context.fillStyle = '#ffffff';
    context.font = '12px Arial';
    context.fillText(`Incident Angle: ${slider.value}°`, 10, 20);
    context.fillText(`Reflected Angle: ${Math.round((reflectionAngle * 180 / Math.PI))}°`, 10, 40);
    context.fillText(`Refracted Angle: ${Math.round((refractedAngle * 180 / Math.PI))}°`, 10, 60);
    context.fillText("Incident", lightRay.x + 5, lightRay.y - 5);
    context.fillText("Reflected", reflectionEndX + 5, reflectionEndY - 5);
    context.fillText("Refracted", refractedEndX + 5, refractedEndY - 5);
  }

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
    context.lineWidth = 2;
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
    context.lineWidth = 4;
    context.stroke();
    context.closePath();

    // Calculate reflection
    const reflectionAngle = Math.PI - lightRay.angle;
    const reflectionEndX = canvas.width;
    const reflectionEndY = incidentEndY + (reflectionEndX - incidentEndX) * Math.tan(reflectionAngle); // Corrected

    // Calculate refraction using Snell's law
    const incidentAngle = Math.PI / 2 - lightRay.angle;
    const sinIncidentAngle = Math.sin(incidentAngle);
    const sinRefractedAngle = (refractiveIndex1 / refractiveIndex2) * sinIncidentAngle;
    let refractedAngle = Math.asin(sinRefractedAngle);

    if (isNaN(refractedAngle)) { // Check for total internal reflection
        refractedAngle = Math.PI / 2; // If total internal reflection, the refracted ray goes along the boundary
    }

    const refractedEndX = canvas.width;
    const refractedEndY = incidentEndY + (refractedEndX - incidentEndX) * Math.tan(refractedAngle); // Corrected

    // Draw the reflected light ray
    context.beginPath();
    context.moveTo(incidentEndX, incidentEndY);
    context.lineTo(reflectionEndX, reflectionEndY);
    context.strokeStyle = '#00ff00';
    context.lineWidth = 4;
    context.stroke();
    context.closePath();

    // Draw the refracted light ray
    context.beginPath();
    context.moveTo(incidentEndX, incidentEndY);
    context.lineTo(refractedEndX, refractedEndY);
    context.strokeStyle = '#0000ff';
    context.lineWidth = 4;
    context.stroke();
    context.closePath();

    drawLabelsAndAngle(reflectionAngle, refractedAngle);
  }

  draw();
}
