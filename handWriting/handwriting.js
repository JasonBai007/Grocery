(function(){
	// 获取canvas上下文
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	// 设置田字格宽高
	var canvasWidth = Math.min( 600 , $(window).width() - 20 );
	var canvasHeight = canvasWidth;

	// 设置默认画笔颜色
	var strokeColor = '#000';

	// 页面载入时，鼠标未按下
	var isMouseDown = false;

	// 初始化：上次坐标00
	var lastLoc = {x:0,y:0};

	// 绘制画布
	drawGrid();

	// 绘画功能函数3个
	function beginStroke(point){
		isMouseDown = true;
		lastLoc = windowToCanvas( point.x , point.y );
	}
	function moveStroke(point){
		var curLoc = windowToCanvas( point.x , point.y );
		//draw
		context.setLineDash([0,0]);
		context.beginPath();
		context.moveTo(lastLoc.x,lastLoc.y);
		context.lineTo(curLoc.x,curLoc.y);
		context.strokeStyle = strokeColor;
		context.lineWidth = 18;
		context.lineCap = 'round';
		context.lineJoin = 'round';
		context.stroke();
		//本次坐标点传递给上次的坐标点
		lastLoc = curLoc;
	}
	function endStroke(){
		isMouseDown = false;
	}

	// 鼠标事件4个
	canvas.onmousedown = function(e) {
		e.preventDefault();	
		beginStroke({x:e.clientX,y:e.clientY});
	}
	canvas.onmouseup = function(e) {
		e.preventDefault();
		endStroke();
	}
	canvas.onmouseout = function(e) {
		e.preventDefault();
		endStroke();
	}
	canvas.onmousemove = function(e) {
		e.preventDefault();
		// 如果鼠标按下则绘制
		if(isMouseDown) {
			moveStroke({x:e.clientX,y:e.clientY});
		}	
	}

	// 移动端触控事件3个
	canvas.addEventListener('touchstart',function(e){
		e.preventDefault();
		touch = e.touches[0];
		beginStroke({x:touch.pageX,y:touch.pageY});
	});
	canvas.addEventListener('touchmove',function(e){
		e.preventDefault();
		if(isMouseDown){
			touch = e.touches[0];
			moveStroke({x:touch.pageX,y:touch.pageY});
		}
	});
	canvas.addEventListener('touchend',function(e){
		e.preventDefault();
		endStroke();
	});

	//文档坐标系转换到画布坐标系
	function windowToCanvas(x,y) {
		var bbox = canvas.getBoundingClientRect();
		return {
			x: Math.round(x-bbox.left),
			y: Math.round(y-bbox.top)
		}
	}

	// 绘制画布函数
	function drawGrid() {

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		context.save();
		context.strokeStyle = 'rgb(201,22,35)';  //JD RED
		context.lineWidth = 6;

		context.beginPath();
		context.moveTo( 3 , 3 );
		context.lineTo( canvasWidth - 3 , 3 );
		context.lineTo( canvasWidth - 3 , canvasHeight - 3 );
		context.lineTo( 3 , canvasHeight - 3 );
		context.closePath();
		context.stroke();
		context.fillStyle = "#eee";
		context.fillRect(6,6,canvasWidth-12,canvasHeight-12);		
		// context.stroke();

		context.lineWidth = 3
		context.setLineDash([12,4])
		context.beginPath()
		context.moveTo(0,0)
		context.lineTo(canvasWidth,canvasHeight)
		context.moveTo(canvasHeight,0)
		context.lineTo(0,canvasHeight)
		context.moveTo(canvasWidth/2,0)
		context.lineTo(canvasWidth/2,canvasHeight)
		context.moveTo(0,canvasHeight/2)
		context.lineTo(canvasWidth,canvasHeight/2)		
		context.stroke()

		context.restore();
	}
	// 清空文字重新绘制画布
	$('#clear-btn').click(function(){
		context.clearRect(0,0,canvasWidth,canvasHeight);
		drawGrid();
	})
	// 画笔换颜色
	$('.color-btn').click(function(e){
		$('.color-btn').removeClass('selected');
		$(this).addClass('selected');
		strokeColor = $(this).css('background-color');
	})
	// 动态设置控制按钮包裹层宽度
	$('#controller').css('width',canvasWidth + 'px');

})();
