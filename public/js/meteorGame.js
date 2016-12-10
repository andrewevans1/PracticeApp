
var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.1;
    myScore = new component("30px", "Genome", "white", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.lastChild);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -5;
        myObstacles[i].update();
    }

    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
/*
window.onload = function(){
	console.log("something happened")
	//canvas init
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')

	//canvas dimensions
	var W = window.innerWidth
	var H = window.innerHeight
	canvas.width = W
	canvas.height = H

	//stars
	var max = 10
	var stars = []
	for(var i=0; i<max; i++){
		stars.push({
			x: Math.random()*W,
			y: Math.random()*H,
			r: Math.random()*12+2,
			d: Math.random()*max //density
		})
		console.log(stars[i])
	}

	//draw the stars
	function draw(){
		ctx.clearRect(0,0,W,H)

		ctx.fillStyle = "rgba(255,255,255,1)"
		for (var i = 0; i<max; i++){
			ctx.beginPath()
			var s = stars[i]
			ctx.moveTo(s.x, s.y)
			ctx.arc(s.x, s.y, s.r, -Math.PI/2, Math.PI/2)
			
			simple half circle + triangle:
			ctx.moveTo(s.x, s.y-s.r)
			ctx.lineTo(s.x-(s.r*5), s.y)
			ctx.lineTo(s.x, s.y+s.r)
			
			complex comet
			ctx.moveTo(s.x,s.y-s.r)
			ctx.lineTo(s.x-s.r, s.y-s.r*1.1)
			ctx.lineTo(s.x,s.y)
			ctx.lineTo(s.x-s.r,s.y+s.r*1.1)
			ctx.lineTo(s.x,s.y+s.r)
			ctx.fill()

			var r2 = s.r*7/8
			ctx.beginPath()
			ctx.arc(s.x-r2,s.y, r2, -Math.PI/2, Math.PI/2)
			ctx.moveTo(s.x-r2,s.y-r2)
			ctx.lineTo(s.x-r2*2, s.y-r2*1.1)
			ctx.lineTo(s.x-r2,s.y)
			ctx.lineTo(s.x-r2*2,s.y+r2*1.1)
			ctx.lineTo(s.x-r2,s.y+r2)
			ctx.fill()

			var r3 = r2*7/8
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
		}
		update()
	}

	function update(){
		angle=0
		for(var i=0; i<max; i++){
			angle = (i+1)*Math.PI/4
			var s = stars[i]
			if(s.x<W/10){
				s.x += 100*Math.sin(Math.PI*0.8*s.x/W)
			}
			else{
				s.x += 50*Math.sin(Math.PI*0.8*s.x/W)
			}
			s.y += (15*Math.sin(s.y/H))
			
			//check if star is out of frame
			if(s.x>W+5 || s.y>H){
				stars[i] = {x: Math.random()*W/4, y: Math.random()*H, r: s.r, d: s.d}
			}
		}
	}

	//loop animation
	setInterval(draw, 33)
}
*/