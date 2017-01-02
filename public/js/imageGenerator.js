window.onload = setInterval(function() {
	console.log("something happened")
	//canvas init
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	var W = window.innerWidth
	var H = window.innerHeight
	canvas.width = W
	canvas.height = H

	//init shapes array
	var max = 10
	var scale = W/4
	var types = ['circle', 'rectangle', 'square', 'triangle', 'oval', 'line']
	var colors = ['red', 'blue', 'yellow', 'orange', 'violet', 'teal']
	var shapes = []
	for (i=0; i<max; i++){
		let num = Math.floor(Math.random()*types.length)
		shapes.push({
			x: Math.random()*W,
			y: Math.random()*H,
			r: Math.random()*scale,
			shapeType: types[num]
		})
		let s = shapes[i]
		let color = colors[Math.floor(Math.random()*colors.length)]
		//draw shapes based on type
		if(shapes[i].shapeType == 'circle'){
			ctx.beginPath()
			ctx.fillStyle = color
			ctx.moveTo(s.x, s.y)
			ctx.arc(s.x, s.y, s.r, 0, Math.PI*2)
			ctx.fill()
			ctx.closePath()
			console.log('drawn')
		}
		if(shapes[i].shapeType == 'rectangle'){
			ctx.beginPath()
			ctx.fillStyle = color
			ctx.moveTo(s.x, s.y)
			ctx.rect(s.x, s.y, Math.random()*s.r, Math.random()*s.r)
			ctx.fill()
			ctx.closePath()	
		}
		if(shapes[i].shapeType == 'square'){
			ctx.beginPath()
			ctx.fillStyle = color
			ctx.moveTo(s.x, s.y)
			ctx.rect(s.x, s.y, s.r, s.r)
			ctx.fill()
			ctx.closePath()
		}
		if(shapes[i].shapeType == 'triangle'){
			ctx.beginPath()
			ctx.fillStyle = color
			ctx.moveTo(s.x, s.y - s.r)
			ctx.lineTo(s.x + s.r, s.y + s.r)
			ctx.lineTo(s.x - s.r, s.y + s.r)
			ctx.lineTo(s.x, s.y - s.r)
			ctx.fill()
			ctx.closePath()
		}
		if(shapes[i].shapeType == 'oval'){
			ctx.beginPath()
			ctx.fillStyle = color
			ctx.moveTo(s.x, s.y)

			ctx.closePath()
		}
		if(shapes[i].shapeType == 'line'){
			ctx.beginPath()
			ctx.fillStyle = color
			ctx.moveTo(s.x, s.y)
			ctx.lineTo(Math.random()*W, Math.random()*H)
			ctx.strokeStyle = color
			ctx.stroke()
			ctx.closePath()
		}
		console.log(shapes[i])
	}
}, 2000)