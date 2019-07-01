// Display Control Blocks
// 0: All devices
// 1: Room 1
function showControlBlock(room) {
	showDeviceBlock(1);

}

function loadBlocks() {
	var request = new XMLHttpRequest();
	request.open("GET", "query?var=control");
	request.onreadystatechange = function() {

		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			console.log(request.responseText);
			const blocks_json = JSON.parse(request.responseText);
			const display = document.getElementById('display');
			
			for(var i=0;i<blocks_json.length;i++) {
				const _block = blocks_json[i];
				var block = new Block("blk-"+i, _block, display);
				block.Render();
			}
			
		}
		
	};
	
	request.send(null);
}

function showDeviceBlock(dev_id) {
	//showLightControlBlock(dev_id, 1);
	loadBlocks();
	
}