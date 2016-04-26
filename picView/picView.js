// 背景Canvas
var	canvas = document.getElementById('canvas');
var	context = canvas.getContext('2d');

// 放大镜Canvas
var	offCanvas = document.getElementById('offCanvas');
var	offContext = offCanvas.getContext('2d');

var pic = new Image();
var isMouseDown = false;
var scale;

window.onload = function() {
	canvas.width =782;
	canvas.height = 521;
	pic.src = 'img/img-lg.jpg';  //使用大图

	// 图片对象加载完成才可以绘制
	pic.onload = function() {		
		offCanvas.width = pic.width;
		offCanvas.height = pic.height;
		scale = offCanvas.width/canvas.width;   //定义放大倍数
		context.drawImage(pic,0,0,canvas.width,canvas.height);
	}	

}

//文档坐标系转换到画布坐标系
function windowToCanvas(x,y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x: Math.round(x-bbox.left),
		y: Math.round(y-bbox.top)
	}
}

// 给画布绑定鼠标事件4个
canvas.onmousedown = function(e) {
	e.preventDefault();
	isMouseDown = true;
	var point = windowToCanvas(e.clientX,e.clientY);
	drawCanvasWidthMagnifier( true, point );
}
canvas.onmousemove = function(e) {
	e.preventDefault();
	if( isMouseDown ) {
		var point = windowToCanvas(e.clientX,e.clientY);
		drawCanvasWidthMagnifier( true, point );	
	}
}
canvas.onmouseup = function(e) {
	e.preventDefault();
	isMouseDown= false;
	drawCanvasWidthMagnifier(false);
}
canvas.onmouseout = function(e) {
	e.preventDefault();
	isMouseDown= false;
	drawCanvasWidthMagnifier(false);
}

function drawCanvasWidthMagnifier (isShowMagnifier,point) {
	context.clearRect(0,0,canvas.width,canvas.height);
	context.drawImage(pic,0,0,canvas.width,canvas.height);
	if ( isShowMagnifier )  {
		drawMagnifier (point);
	}
}

function drawMagnifier(point) {
	var picLG_cx = point.x * scale;
	var picLG_cy = point.y * scale;

	var mr = 100;  //放大镜半径

	var sx = picLG_cx - mr;
	var sy = picLG_cy - mr;

	var dx = point.x - mr;
	var dy = point.y - mr;

	context.save();
	context.lineWidth = 6
	context.strokeStyle = '#1ABC9C'
	context.beginPath();
	context.arc(point.x,point.y,mr,0,Math.PI*2);
	context.stroke();
	context.clip();
	context.drawImage( offCanvas, sx, sy,2*mr,2*mr,dx,dy,2*mr,2*mr);

	context.restore();
	offContext.drawImage(pic,0,0);
}