var canvas=document.getElementById('myCanvas')
var ctx=canvas.getContext('2d')
var centerX=canvas.width / 2
var centerY=canvas.height / 2
var radius = 60
console.log("center: (" + centerX + "," + centerY + ")")

let toggleMouth = 1
let toggleLEye = 1
let toggleREye = 1

function circle() {
	if (toggleMouth) {
		ctx.arc(centerX, centerY+100, radius, Math.PI, 2*Math.PI, false)
		ctx.lineWidth = 5
		ctx.strokeStyle = "black"
		ctx.stroke()
		ctx.moveTo(centerX-radius,centerY+100)
		toggleMouth = 0
	}
	else {
		ctx.arc(centerX, centerY+100, radius, Math.PI, 2*Math.PI, false)
		ctx.lineWidth = 6
		ctx.strokeStyle = "white"
		ctx.stroke()
		ctx.moveTo(centerX-radius,centerY+100)
		toggleMouth = 1	
	}
}

function leftEye() {
	if (toggleLEye) {
		ctx.fillRect(centerX-50, centerY-100, 25, 50)
		toggleLEye = 0
	}
	else{
		ctx.clearRect(centerX-50, centerY-100, 25, 50)
		toggleLEye = 1
	}
}

function rightEye() {
	if (toggleREye){
		ctx.fillRect(centerX+25, centerY-100, 25, 50)
		toggleREye = 0
	}
	else{
		ctx.clearRect(centerX+25, centerY-100, 25, 50)
		toggleREye = 1
	}
}