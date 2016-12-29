var highScore = 0
var canvasExists = false

function startGame(){
    console.log("something happened")
    //canvas init 
    if (canvasExists){
        var oldCanvas = document.getElementById('canvas')
        document.body.removeChild(oldCanvas)
        //console.log('canvas removed')
    }
    var canvas = document.createElement('canvas')
    canvas.id = 'canvas'
    document.body.append(canvas)
    canvasExists = true

    var ctx = canvas.getContext('2d')

    //canvas dimensions
    var W = window.innerWidth
    var H = window.innerHeight
    canvas.width = W -50
    canvas.height = H -100
    $(window).scrollTop($('canvas').offset().top)

    var mouseX = 0
    var mouseY = 0
    var score = 0

    canvas.addEventListener('mousemove', function(evt) {
        let rect = canvas.getBoundingClientRect()
        mouseX = evt.clientX - rect.left
        mouseY = evt.clientY - rect.top
        }, false);
        
    //stars
    var max = document.getElementById('slider').value * 6
    var scale = 12
    var stars = []
    for(let i=0; i<max; i++){
        stars.push({
            x: Math.random()* W * 3/4,
            y: Math.random()*H,
            r: (Math.random()*scale-2) + 8,
            d: Math.random()*max //density
        })
        console.log(stars[i])
    }

    var paused = true

    let timer = 3
    countdown(canvas, timer)

    //draw the stars
    function draw(){
        if (!paused){
            ctx.clearRect(0,0,W,H)

            for (let i = 0; i<max; i++){
                let s = stars[i]
                ctx.fillStyle = "white"
                ctx.beginPath()
                ctx.moveTo(s.x, s.y)
                ctx.arc(s.x, s.y, s.r, -Math.PI/2, Math.PI/2)
                
                ctx.moveTo(s.x,s.y-s.r)
                ctx.lineTo(s.x-s.r, s.y-s.r*1.1)
                ctx.lineTo(s.x,s.y)
                ctx.lineTo(s.x-s.r,s.y+s.r*1.1)
                ctx.lineTo(s.x,s.y+s.r)
                ctx.fill()

                let r2 = s.r*7/8
                ctx.beginPath()
                ctx.arc(s.x-r2,s.y, r2, -Math.PI/2, Math.PI/2)
                ctx.moveTo(s.x-r2,s.y-r2)
                ctx.lineTo(s.x-r2*2, s.y-r2*1.1)
                ctx.lineTo(s.x-r2,s.y)
                ctx.lineTo(s.x-r2*2,s.y+r2*1.1)
                ctx.lineTo(s.x-r2,s.y+r2)
                ctx.fill()

                let r3 = r2*7/8
                ctx.beginPath()
                ctx.arc(s.x-r2-r3,s.y, r3, -Math.PI/2, Math.PI/2)
                ctx.moveTo(s.x-r2-r3,s.y-r3)
                ctx.lineTo(s.x-r2-r3*2, s.y-r3*1.1)
                ctx.lineTo(s.x-r2-r3,s.y)
                ctx.lineTo(s.x-r2-r3*2,s.y+r3*1.1)
                ctx.lineTo(s.x-r2-r3,s.y+r3)
                ctx.fill()

                ctx.beginPath()
                ctx.moveTo(s.x, s.y-r2)
                ctx.lineTo(s.x-s.r*5,s.y)
                ctx.lineTo(s.x, s.y+r2)
                ctx.fill()
                ctx. closePath()

                ctx.fillStyle = "red"
                ctx.beginPath()
                ctx.moveTo(mouseX+scale/2, mouseY)
                ctx.lineTo(mouseX+scale, mouseY-scale)
                ctx.lineTo(mouseX-scale, mouseY)
                ctx.lineTo(mouseX+scale, mouseY + scale)
                ctx.lineTo(mouseX +scale/2, mouseY)
                ctx.fill()
            }
        update()
        checkCrash()
        showScore()
        }            
    }

    function update(){
        angle=0
        for(var i = 0; i < max; i++){
            angle = (i + 1) * Math.PI / 4
            var s = stars[i]
            if(s.x < W/10){
                s.x += 50*Math.sin(Math.PI*0.8*s.x/W)
            }
            else{
                s.x += 25*Math.sin(Math.PI*0.8*s.x/W)
            }
            s.y += (15*Math.sin(s.y/H))
            
            //check if star is out of frame
            if(s.x>W+5 || s.y>H){
                stars[i] = {x: Math.random()*W/4, y: Math.random()*H, r: s.r, d: s.d}
                //score increases for each meteor(star) that goes out of frame
                score++
            }
        }
    }

    function checkCrash() {
        //rectangle around piece
        let myGamePiece = {
            top: mouseY - scale,
            bottom: mouseY + scale, 
            left: mouseX - scale,
            right: mouseX + scale
        }
        //check for crossing with rectangle around stars
        for (let i = 0; i<max; i++){
            let p = myGamePiece
            let s = stars[i]
            s.top = s.y - s.r
            s.bottom = s.y + s.r
            s.left = s.x - s.r*5
            s.right = s.x + s.r
            if (p.top < s.bottom && p.bottom > s.top && p.left < s.right && p.right > s.left){
                endGame(canvas, "Game Over!")
                clearInterval(isRunning)
            }
        }
    }

    function showScore(canvas) {
        ctx.font = '32pt Genome'
        ctx.fillStyle = 'white'
        ctx.fillText('Score: ' + score, (W-300), 100)
        updateHighScore()
        ctx.fillText('High Score: ' + highScore, (W-400), 50)
    }

    function countdown(canvas, timer) {
        ctx.font = '64pt Genome'
        ctx.fillStyle = 'red'
            setInterval(function() {
                if(timer>0){
                    ctx.clearRect(0,0,W,H)
                    ctx.fillText(timer, W/2, H/2)
                    timer--
                }
                else{
                    paused = false
                }
            }, 950)
    }

    function updateHighScore(){
        if (score > highScore) {
            highScore = score
        }
    }

    function endGame(canvas, message) {
        ctx.font = '64pt Genome'
        ctx.fillStyle = 'red'
        ctx.fillText(message, W/2 - 240, 250)
    }

    //loop animation
    let isRunning = setInterval(draw, 20)
}

function updateSlider() {
    let value = document.getElementById('slider').value
    document.getElementById('sliderValue').innerHTML = 'Level ' + value
}