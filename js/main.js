const curr_d = new Date();

const login = 'linxon'
const github_api_uri = 'https://api.github.com/users/' + login

var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};

	xhr.send();
};

function setCookie(cname, cvalue, exdays) {
	const d = new Date();

	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();

	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');

	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];

		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}

		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}

	return "";
}

function checkCookie(target_c, value) {
	let res = getCookie(target_c);
	if (res == value) {
		return true;
	}

	return false;
}

function updateHTML_field() {
	document.getElementById("user_avatar").src = getCookie('avatar_url');
	document.getElementById("user_name").innerHTML = getCookie('name');
	document.getElementById("user_nickname").innerHTML = '@' + getCookie('nickname');
	document.getElementById("user_status").innerHTML = getCookie('status');
}

function fillWebpage() {
	if (checkCookie('cookie_stat', '1') == false) {
		getJSON(github_api_uri,
			function(err, data) {
				if (err !== null) {
					console.log('Something went wrong: ' + err);
				} else {
					setCookie("avatar_url", data.avatar_url, 365);
					setCookie("name", data.name, 365);
					setCookie("nickname", data.login, 365);
					setCookie("status", data.bio, 365);
					setCookie("cookie_stat", '1', 1);
				}

				updateHTML_field();
			});
	} else {
		updateHTML_field();
	}

	document.getElementById("copy_year").innerHTML = curr_d.getFullYear();
}

fillWebpage();
