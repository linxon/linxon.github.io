const d = new Date();
const github_api_uri = 'https://api.github.com/users/linxon'

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

getJSON(github_api_uri,
	function(err, data) {
	if (err !== null) {
		console.log('Something went wrong: ' + err);
	} else {
		document.getElementById("user_avatar").src = data.avatar_url;
		document.getElementById("user_name").innerHTML = data.name;
		document.getElementById("user_nickname").innerHTML = '@' + data.login;
		document.getElementById("user_status").innerHTML = data.bio;
	}
	
	document.getElementById("copy_year").innerHTML = d.getFullYear();
});
