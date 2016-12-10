var canvas=document.getElementById('myCanvas')
var ctx=canvas.getContext('2d')
var centerX=canvas.width / 2
var centerY=canvas.height / 2
var norm = [1000, 60, 60, 24, 30, 12]
//var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
//var colors = ['#462066', '#FFB85F', '#FF7A5A', '#00AAA0', '#8ED2C9', '#FCF4D9']
var colors = ['#911F1F', '#CE0000', '#000063', '#5A79A5', '#9CAAC6', '#DEE7EF']
var scale = 20
var radius = [1*scale, 2*scale, 3*scale, 4*scale, 5*scale, 6*scale, 7*scale]
var interval = 100

function runClock(){
	var d = new Date()
	var dates = [d.getMilliseconds() ,d.getSeconds(), d.getMinutes(), d.getHours(), d.getDate(), d.getMonth()]
	document.getElementById("time").innerHTML =  d
	ctx.clearRect(0,0, canvas.width, canvas.height)

	for (i=0; i<dates.length; i++) {
		console.log(((dates[i]+1)/norm[i]))
		ctx.beginPath()
		ctx.arc(centerX, centerY, radius[i], 0-Math.PI/2, (((dates[i]+1)/norm[i])*2*Math.PI-Math.PI/2))
		ctx.lineWidth = scale
		ctx.strokeStyle = colors[i]
		ctx.stroke()
		ctx.closePath()		
	}
}

function start() {
	clock = setInterval(runClock, interval)
}

function stop() {
	clearInterval(clock)
}