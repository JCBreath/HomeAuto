var drawing=document.getElementById("background");

// Define points
var x = []
var y = []

ptNum = 100;
row = 12;
col = 6;

colorset = ['#bad7e9','#def3f8','#edf1f2','#98d5f2'];

generatePoints(row, col);

if(drawing.getContext){
	var context=drawing.getContext("2d");
	for(var i=0;i<col-1;i++) {
		for(var j=0;j<row-1;j++) {
			DrawTriangle(context, x[i][j], y[i][j], x[i][j+1], y[i][j+1], x[i+1][j], y[i+1][j], randomColor(), 'fill');
			DrawTriangle(context, x[i+1][j], y[i+1][j], x[i+1][j+1], y[i+1][j+1], x[i][j+1], y[i][j+1], randomColor(), 'fill');
		}
	}
}

function DrawTriangle(context, x1, y1, x2, y2, x3, y3, color, type) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context[type + 'Style'] = color;
    context.closePath();
    context[type]();
}

function randomColor() {
	var r, g, b;
	var blue = Math.round(Math.random() * 26) + 230;
	r = Math.round(blue * 0.7).toString(16);
	g = Math.round(blue * 0.95).toString(16);
	b = (blue).toString(16);
	if(r.length == 1)
		r = '0' + r;
	if(g.length == 1)
		g = '0' + g;
	if(b.length == 1)
		b = '0' + b;
	console.log('#' + r + g + b);
	return '#' + r + g + b;
	//return colorset[Math.round(Math.random() * 3)];
}

function generatePoints(row, col) {
	for(var i=0;i<col;i++) {
		var x_temp = [];
		var y_temp = [];
		for(var j=0;j<row;j++) {
			if(col % 2 == 0)
				x_temp.push(Math.round(Math.random() * 100) - 50 + 1920 / row * j);
			else
				x_temp.push(Math.round(Math.random() * 100) - 50 + 1920 / row * j + 192);
			y_temp.push(Math.round(Math.random() * 100) - 50 + 1080 / col * i);
		}
		x.push(x_temp);
		y.push(y_temp);
	}
}

function drawBackground() {

}