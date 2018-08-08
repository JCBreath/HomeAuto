var interval = 1;

function getDate() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth();
	var day = d.getDate();
	var hour = d.getHours();
	var min = d.getMinutes();
	var hour00, min00;
	if (hour < 10)
		hour00 = '0' + hour.toString();
	else
		hour00 = hour.toString();
	if (min < 10)
		min00 = '0' + min.toString();
	else
		min00 = min.toString();
	document.getElementById("date").children[0].innerText = year + "年" + (month + 1) + "月" + day + "日";
	//document.getElementById("time").children[0].innerText = hour00 + ":" + min;
	document.getElementById("time").children[0].innerText = hour00 + ":" + min00;
	interval = 100;
}

setInterval("getDate()", interval);