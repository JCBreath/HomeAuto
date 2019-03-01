function showUserUI() {
	var display = document.getElementById('display');
	var user_top_blk = document.createElement('div');
	user_top_blk.id = "user-top-blk";

	var profile_pic_blk = document.createElement('div');
	profile_pic_blk.id = "profile-pic-blk";

	var profile_pic_img = document.createElement('img');
	profile_pic_img.id = "profile-pic-img";
	profile_pic_img.src = "./img/avatar.png";

	var profile_name = document.createElement('a');
	profile_name.id = "profile-name";
	profile_name.textContent = "David";

	var logout_blk = document.createElement('div');

	profile_pic_blk.appendChild(profile_pic_img);
	profile_pic_blk.appendChild(profile_name);
	user_top_blk.appendChild(profile_pic_blk);
	display.appendChild(user_top_blk);
	appendUserBlock("Change Profile", function(){});
	appendUserBlock("Edit Family Members", function(){});
	appendUserFillBlock();
	appendUserBlock("Location Sharing", function(){});
	appendUserBlock("Security", function(){});
	appendUserFillBlock();
	appendUserBlock("About", function(){});
	appendUserBlock("Reset System", function(){});
	appendUserFillBlock();
	appendLogoutBlock();
}

function appendUserFillBlock() {
	var fill_block = document.createElement('div');
	fill_block.className = "user-fill-blk";

	document.getElementById('display').appendChild(fill_block);
}

function appendUserBlock(title, func) {
	var user_block = document.createElement('div');
	user_block.className = "user-blk";

	var user_block_title = document.createElement('div');
	user_block_title.className = "user-blk-title";

	user_block_title.textContent = title;

	

	var user_arrow = document.createElement('div');
	user_arrow.className = "fa fa-angle-right user-blk-arrow";


	user_block.appendChild(user_block_title);
	user_block.appendChild(user_arrow);
	document.getElementById('display').appendChild(user_block);
}

function appendLogoutBlock() {
	var user_block = document.createElement('div');
	user_block.className = "user-blk";

	user_block_title = document.createElement('div');
	user_block_title.className = "logout-blk-title";

	user_block_title.textContent = "Sign Out";

	user_block.appendChild(user_block_title);
	document.getElementById('display').appendChild(user_block);
}