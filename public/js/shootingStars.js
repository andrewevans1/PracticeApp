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
			/* simple half circle + triangle:
			ctx.moveTo(s.x, s.y-s.r)
			ctx.lineTo(s.x-(s.r*5), s.y)
			ctx.lineTo(s.x, s.y+s.r)
			*/
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