window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = this.window.innerHeight;
    // canvas settings
    ctx.fillStyle = 'green';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 20;

    // effect setting
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    const maxLevel = 4;
    const branches = 2;

    let sides = 8;
    let scale = 0.5;
    let spread = 1.1;
    let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10);

    // controls
    const randomizeButton = document.getElementById('randomizeButton');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for="spread"]');
    slider_spread.addEventListener('change', function(e){
        spread = e.target.value;
        updateSliders();
        drawFractal();
    })

    function drawBranch(level){
        if(level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();
        for(let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate(size - (size/branches) * i,0);
            ctx.scale(scale,scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();
    
            ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.restore();
        }
        
    }
    

    function drawFractal(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2);
        for(let i = 0; i < sides; i++){
            ctx.rotate((Math.PI * 2)/sides);
            drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();

   function randomizeFractal(){
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.2 + 0.2;
        spread = Math.random() * 0.2 + 0.1;
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        let lineWidth = Math.floor(Math.random() * 20 + 10);
   }
   randomizeButton.addEventListener('click', function(){
    randomizeFractal();
    updateSliders();
    drawFractal();
   });

   function updateSliders(){
    slider_spread.value = spread;
    label_spread.innerText = 'Spread: ' + Number(spread).toFixed(1);
   }
   updateSliders(); 
    
});