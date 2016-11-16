(function() {
	var http = require('http');
	var url = require('url');
	var fs = require('fs');
	var querystring = require('querystring');
	var dataBase = [];

	fs.readFile("../dataBase.txt", 'utf-8', function(err, data) {
		var dataOfEachLine = data.toString().split('\r\n');
		for (var i = 0; i < dataOfEachLine.length; i++) {
			var dataOfEachItem = dataOfEachLine[i].split(",");
			dataBase[i] = {};
			dataBase[i]['name'] = dataOfEachItem[0];
			dataBase[i]['id'] = dataOfEachItem[1];
			dataBase[i]['email'] = dataOfEachItem[2];
			dataBase[i]['phone'] = dataOfEachItem[3];
		}
	});

	function loadFile(response, path) {
		fs.readFile(path, function(err, data) {
			console.log("load file " + path);
			var suffix = path.substr(path.lastIndexOf('.')+1, path.length);
			response.writeHead(200, {"Content-Type":"text/"+suffix});
			response.write(data.toString());
			response.end();
		});
	}

	function showInfo(response, info) {
		response.write("Name: " + info['name'] + "\n");
		response.write("Student ID: " + info['id'] + "\n");
		response.write("Email: " + info['email'] + "\n");
		response.write("Cell Phone: " + info['phone'] + "\n");
		response.end();
	}

	function isInExistence(response, info) {
		var isFound = 0;
		for (var i = 0; i < dataBase.length; i++) {
			if (dataBase[i]['name'] == info['name']) {
				isFound = 1;
				response.write("The name has existed\nHere is the user\n");
				break;
			} else if (dataBase[i]['id'] == info["id"]) {
				isFound = 1;
				response.write("The student ID has existed\nHere is the user\n");
				break;
			} else if (dataBase[i]['email'] == info["email"]) {
				isFound = 1;
				response.write("The Email has existed\nHere is the user\n");
				break;
			} else if (dataBase[i]['phone'] == info["phone"]) {
				isFound = 1;
				response.write("The cell phone number has existed\nHere is the user\n");
				break;
			}
		}
		if (isFound != 0) showInfo(response, dataBase[i]);
		return isFound;
	}

	function registation(response, postData) {
		var info = querystring.parse(postData);
		response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
		if (isInExistence(response, info) == 0) {
				dataBase.push({name: info['name'], id: info['id'], email: info['info'], phone: info['phone']});
				var newInfo = info['name'] + "," + info['id'] + "," + info['email'] + "," + info['phone'] + "\r\n";
				fs.appendFile("../dataBase.txt", newInfo, function(err, data) {});
				showInfo(response, info);
			}
	}

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var search = url.parse(request.url).search;
		var query = querystring.parse(url.parse(request.url).query);
		var postData = "";

		request.addListener("data", function (data) {
			postData += data;
		});
		request.addListener("end", function () {
			if (pathname == "/logIn") registation(response, postData);
			postData = "";
		});
		if (pathname != "/logIn" && search == null) {
			var suffix = pathname.substr(pathname.lastIndexOf('.')+1, pathname.length);
			if (suffix == "css")
				loadFile(response, "../stylesheet/signUp.css");
			else if (suffix == "js")
				loadFile(response, "../javascript/signUp.js");
			else
				loadFile(response, "../signUp.html");
		} else if (search != null && "username" in query) {
			var isFound = 0;
			for (var i = 0; i < dataBase.length; i++)
				if (dataBase[i]['name'] == query['username']) {
					isFound = 1;
					break;
				}
			response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
			if (isFound == 1)
				showInfo(response, dataBase[i]);
			else
				response.end("Thers's no such user!");
		}
	}

	http.createServer(onRequest).listen(8000);

	console.log("Server is running at http://127.0.0.1:8000");
})();