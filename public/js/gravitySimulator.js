/*
function start(){
	console.log("something happened")
	//canvas init
	var canvas = document.createElement('canvas')
    document.body.append(canvas)
    var ctx = canvas.getContext('2d')

	//canvas dimensions
	var W = window.innerWidth
	var H = window.innerHeight
	canvas.width = W 
	canvas.height = H

	//init particles
	var max = 2
	var scale = 20
	var G = 1.6007 * 0.00001
	var time = 500
	var particles = []
	for(let i=0; i<max; i++){
		particles.push({
			x: Math.random()*W,
			y: Math.random()*H,
			v_x: 0,
			v_y: 0,
			r: Math.random()*scale,
		})
		console.log(particles[i])
	}
	//cycle order to 
	function update() {
		//var array2 = []
		for(var j=max-1; j>-1; j--) {
			/*array2 = particles
			let obj = particles[i]
			array2.splice(i, 1)
			array2.push(obj)
			//console.log(array2)
			*//*
			for(let i=0; i<max; i++){
				let a_x = -G*(particles[i].r) / (particles[i].x - particles[j].x)
				let a_y = -G*(particles[i].r) / (particles[i].y - particles[j].y)
				let v_x = particles[i].v_x + a_x * time
				let v_y = particles[i].v_y + a_y * time
				particles[i].x = v_x * time + 0.5 * a_x * Math.pow(time, 2)
				particles[i].y = v_y * time + 0.5 * a_y * Math.pow(time, 2)
				console.log ("x:" + particles[i].x)
				console.log ("y:" + particles[i].y)
				return (particles[i].x , particles[i].y)
			}
		}
	}

	function draw(){
		//ctx.clearRect(0,0,W,H)

		ctx.fillStyle = "white"
		for (var i = 0; i<max; i++){
			ctx.beginPath()
			let p = particles[i]
			//ctx.moveTo(p.x, p.y)
			ctx.arc(p.x+W/2, p.y+H/2, p.r, 0, 2*Math.PI)

			ctx.fill()
			console.log("drawn")
		}
		update()
	}

	setInterval(draw, time)
}
*/
function simple() {
	//canvas init
	var canvas = document.createElement('canvas')
    document.body.append(canvas)
    var ctx = canvas.getContext('2d')

	//canvas dimensions
	var W = window.innerWidth
	var H = window.innerHeight
	canvas.width = W
	canvas.height = H
	$(window).scrollTop($('canvas').offset().top);

	var time = 10
	var max = 2
	var scale = 20
	var radius = 25
	var spawnX = [100, 400]
	var spawnY = [100, 400]
	var color = ["rgba(255,0,0,0.5)", "rgba(0,0,255,0.5)"]	
	var particles = []
	for(let i=0; i<max; i++){
		particles.push({
			x: spawnX[i],
			y: spawnY[i],
			r: radius,
			v_x: 0,
			v_y: 0,
			a_x: 0,
			a_y: 0
		})
		console.log(particles[i])
	}

	function draw() {
		ctx.clearRect(0,0,W,H)

		//ctx.fillStyle = "white"
		for (var i = 0; i<max; i++){
			ctx.beginPath()
			ctx.fillStyle = color[i]
			let p = particles[i]
			//ctx.moveTo(p.x, p.y)
			ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI)

			ctx.fill()
		}
		update()
	}

	function update() {
		let speed = 8
		var dist_x = Math.abs(particles[1].x - particles[0].x)
		var dist_y = Math.abs(particles[1].y - particles[0].y)
		//console.log(dist_x, dist_y)
		
		var a_x = 0
		var a_y = 0
		//calculate acceleration vectors		
		if (dist_x != 0){
			a_x = (particles[0].r) / Math.pow(dist_x, 2)
		}
		else {
			a_x = 0
		}
		
		if (dist_y != 0){
			a_y = (particles[0].r) / Math.pow(dist_y, 2)
		}
		else {
			a_y = 0
		}	

		var notMerged = true
		let middle_x = dist_x/2 
		let middle_y = dist_y/2

		if(dist_x < radius && dist_y < radius){
			notMerged = false
			console.log("merged")	
		}
	
		//if first particle is to the left of the second, 
		//accelerate it to the right and vice versa
		if(notMerged){
			if (particles[0].x < particles[1].x){
				particles[0].v_x += (a_x * time)
				particles[1].v_x -= (a_x * time)
				particles[0].x += (particles[0].v_x * time)
				particles[1].x += (particles[1].v_x * time)
			}	
			else {
				particles[0].v_x -= (a_x * time)
				particles[1].v_x += (a_x * time)
				particles[0].x += (particles[0].v_x * time)
				particles[1].x += (particles[1].v_x * time)
			}
			//if first particle is above the second, 
			//accelerate it down and vice versa
			if (particles[0].y < particles[1].y){
				particles[0].v_y += (a_y * time)
				particles[1].v_y -= (a_y * time)
				particles[0].y += (particles[0].v_y * time)
				particles[1].y += (particles[1].v_y * time)
			}
			else {
				particles[0].v_y -= (a_y * time)
				particles[1].v_y += (a_y * time)
				particles[0].y += (particles[0].v_y * time)
				particles[1].y += (particles[1].v_y * time)
			}
		}
		else {
			if (particles[0].x < particles[1].x){
				particles[0].v_x = 0
				particles[1].v_x = 0
				particles[0].x += middle_x
				particles[1].x -= middle_x
			}	
			else {
				particles[0].v_x = 0
				particles[1].v_x = 0
				particles[0].x -= middle_x
				particles[1].x += middle_x
			}
			//if first particle is above the second, 
			//accelerate it down and vice versa
			if (particles[0].y < particles[1].y){
				particles[0].v_y = 0
				particles[1].v_y = 0
				particles[0].y += middle_y
				particles[1].y -= middle_y
			}
			else {
				particles[0].v_y = 0
				particles[1].v_y = 0
				particles[0].y -= middle_y
				particles[1].y += middle_y
			}
		}

		console.log(particles[0].v_y)
		//console.log('second: ' + particles[1].v_x, particles[1].v_y)	
	}

	setInterval(draw, time*5)
}