var canvas = document.getElementById('myCanvas')
var W = canvas.width
var H = canvas.height
var ctx = canvas.getContext('2d')
var radius = 5
var scale = 10
function writeMessage(canvas, message) {
    ctx.clearRect(0, 0, W, H)
    ctx.font = '18pt Genome'
    ctx.fillStyle = 'black'
    ctx.fillText(message, 10, 25)
    }

function drawCircle(mousePos) {
	ctx.beginPath()
	ctx.arc(mousePos.x, mousePos.y, radius, 0, 2*Math.PI, false)
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	ctx.stroke()
	ctx.closePath()
}
function drawShape(mousePos){
	ctx.fillStyle = "black"
	ctx.beginPath()
	ctx.moveTo(mousePos.x+scale/2, mousePos.y)
	ctx.lineTo(mousePos.x+scale, mousePos.y-scale)
	ctx.lineTo(mousePos.x-scale, mousePos.y)
	ctx.lineTo(mousePos.x+scale, mousePos.y + scale)
	ctx.lineTo(mousePos.x +scale/2, mousePos.y)
	ctx.fill()
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect()
    return {
	    x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
    }

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt)
    var message = 'Mouse position: ' + Math.round(mousePos.x) + ',' + Math.round(mousePos.y)
    writeMessage(canvas, message)
    drawShape(mousePos)
	}, false);