// Display Control Blocks
// 0: All devices
// 1: Room 1
function showControlBlock(type, value) {
	// showDeviceBlock(1);
	loadBlocks(type, value);
}

function loadBlocks(type, value) {
	var request = new XMLHttpRequest();
	if(type && value) {
		request.open("GET", "query?var=control&" + type + "=" + value);
	} else {
		request.open("GET", "query?var=control");
	}
	request.onreadystatechange = function() {

		if (request.readyState !== 4) {
			return;
		}

		if (request.readyState == 4 && request.status === 200) {
			console.log(request.responseText);
			const blocks_json = JSON.parse(request.responseText);
			const display = document.getElementById('display');

			while(document.getElementsByClassName("ctrl-blk").length > 0) {
				document.getElementsByClassName("ctrl-blk")[0].remove();
			}

			while(document.getElementsByClassName("blk-title").length > 0) {
				document.getElementsByClassName("blk-title")[0].remove();
			}
			
			for(var i=0;i<blocks_json.length;i++) {
				const _block = blocks_json[i];
				var block = new Block("blk-"+i, _block, display);
				block.Render();
			}
			

			var test_property = {
				name: "样式表测试模块", 
				type: "floor", 
				devices: [
					{
						id: 2202,
						room: "茶室",
						name: "灯带测试",
						type: "继电器",
						status: 0,
						style: "DD01",
						elements: [
							{
								name: "开",
								value: 220201
							},
							{
								name: "关",
								value: 220200
							}
						] 
					},
					{
						id: 2202,
						room: "茶室",
						name: "灯带测试",
						type: "继电器",
						status: 0,
						style: "DD01",
						elements: [
							{
								name: "开",
								value: 220201
							},
							{
								name: "关",
								value: 220200
							}
						] 
					}
				]
			};


			var test_block = new Block("blk-test", test_property, display);
			test_block.Render();
		}
		
	};
	
	request.send(null);
}

function showDeviceBlock(dev_id) {
	//showLightControlBlock(dev_id, 1);
	loadBlocks();
	
}