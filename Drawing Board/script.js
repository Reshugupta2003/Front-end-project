const canvas = document.querySelector("canvas");
const toolsbtn = document.querySelectorAll(".tools");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorbtns = document.querySelectorAll(".colours .option");
const colorPicker = document.querySelector("#color-picker");
const Enter = document.querySelector(".enter");
const clearCanvas = document.querySelector(".clear-canvas");
const saveImg = document.querySelector(".Save-img");
const name = document.querySelector("#name");
const span = document.querySelector("span");
const h = document.querySelector("h1");
const ctx = canvas.getContext("2d");

window.addEventListener("load", () => {
    // Setting canvas width and height based on its offset dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});
// Global variables with selected tools
let isDrawing = false,
    brushWidth = 5,
    selectedTools = "brush",
    selectedColor = "#000000", // Default color is black
    preMouseX, preMouseY, snapshot, nickName;

//Line
const drawLine = (e) =>{   
    ctx.beginPath();
    ctx.moveTo(preMouseX, preMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke();   
}

// Rectangle
const drawRect = (e) => {
    if (!fillColor.checked) {
    return ctx.strokeRect(preMouseX, preMouseY, e.offsetX - preMouseX, e.offsetY - preMouseY);
    }
    ctx.fillRect(preMouseX, preMouseY, e.offsetX - preMouseX, e.offsetY - preMouseY);
}

// Circle
const drawCircle = (e) => {
  let radius = Math.sqrt(Math.pow(preMouseX - e.offsetX, 2) + Math.pow(preMouseY - e.offsetY, 2));
  ctx.beginPath(); // Start a new path
  ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI * 2, false); // Draw the arc    
  if (!fillColor.checked) {
    ctx.stroke(); // Draw the outline if fill is not checked
  } else {
    ctx.fill(); // Fill the circle if fill is checked
  }
};

// Triangle
const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(preMouseX, preMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(preMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ?  ctx.fill(): ctx.stroke();    
};

function startDrawing(e) {
    isDrawing = true;
    preMouseX = e.offsetX;
    preMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor; // Apply selected color to stroke
    ctx.fillStyle = selectedColor; // Apply selected color to fill
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function stopDrawing(e) {
    isDrawing = false;
}

function draw(e) {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineCap = "round";

    if (selectedTools === "brush" || selectedTools == "eraser") {
       ctx.strokeStyle = selectedTools == "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } 
    else if(selectedTools === "line") {
        drawLine(e);
    }
    else if (selectedTools === "rectangle") {
        drawRect(e);
    } else if (selectedTools === "circle") {
        drawCircle(e);
    } else if (selectedTools === "triangle") {
        drawTriangle(e);
    }
}

toolsbtn.forEach(btn => {
    btn.addEventListener('click', () => {
// Remove active class from previous option and add to current option
     document.querySelector(".option.active").classList.remove("active");
        btn.classList.add("active");
        selectedTools = btn.id;
    });
});

colorbtns.forEach(btn => {
    btn.addEventListener('click', () => {
    document.querySelector(".colours .select").classList.remove("select");
        btn.classList.add("select");
        // Get the background color of the selected button and set it as the selected color
        selectedColor = window.getComputedStyle(btn).backgroundColor;
    });
});

colorPicker.addEventListener('change', () => {
    selectedColor = colorPicker.value;
    document.querySelector(".colours .select").style.backgroundColor = selectedColor;
})

clearCanvas.addEventListener('mousedown', () => {
        ctx.fillStyle = "#fff";
       ctx.fillRect(0, 0, canvas.width, canvas.height);
});

saveImg.addEventListener('mousedown', () =>{
    // Convert canvas to data URL
    const dataURL = canvas.toDataURL("image/png");

    // Generate HTML content with embedded image
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-   scale=1.0">
            <title> My Drawing </title>
        </head>
        <body>
           <center> <h1> Nice! Drawing ${nickName} ji </h1> </center>
           <hr> <br> 
            <img src="${dataURL}" alt="Saved Drawing">
        </body>
        </html>  `;

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a link to download the HTML file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'My drawing.html';

    // Trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
});

// Take a name of user
Enter.addEventListener( "click", () => {
       nickName = name.value;
       Enter.remove();
       name.remove();
       h.remove();
})
sizeSlider.addEventListener('change', () => brushWidth = sizeSlider.value);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
