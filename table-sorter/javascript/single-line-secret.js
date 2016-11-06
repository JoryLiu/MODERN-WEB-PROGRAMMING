(function() {
	$(document).ready(function() {
		addScript();
		addStylesheet();
		$("th").click(sort);
	});

	function addScript() {
		var _jquery = document.createElement("script");
		_jquery.setAttribute("src","https://code.jquery.com/jquery-3.1.1.min.js");
		_jquery.setAttribute("type", "text/javascript");
		var _lodash = document.createElement("script");
		_lodash.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js");
		_lodash.setAttribute("type", "text/javascript");
		document.head.appendChild(_jquery);
		document.head.appendChild(_lodash);
	}

	function addStylesheet() {
		var _stylesheet = document.createElement("link");
		_stylesheet.setAttribute("rel", "stylesheet");
		_stylesheet.setAttribute("type", "text/css");
		_stylesheet.setAttribute("href", "https://joryliu.github.io/MODERN-WEB-PROGRAMMING/table-sorter/stylesheet/single-line-secret.css");
		document.head.appendChild(_stylesheet);
	}

	function sort(event) {
		var tar = $(event.target);
		clear(tar);
		_.chain($(tar.parents("table")).children("tbody").children("tr"))
			.sortBy(tr=>$(tr).children("td:nth-child(" + (tar.index()+1) + ")").text())
			.thru(array=>tar.hasClass("ascend")?reverse(array):array)
			.forEach(tr=>$(tar.parents("table")).children("tbody").append($(tr)))
			.value();
		mark(tar);
	}

	function clear(tar) {
		tar.siblings().each(function() {
			tar.removeClass("ascend");
			tar.removeClass("descend");
		})
	}

	function reverse (array) {
    	for (var i = 0, j = array.length; i < j; i++, j--) {
        	var temp = array[i];
        	array[i] = array[j];
        	array[j] = temp;
    	}
    	return array;
	};

	function mark(tar) {
		if (tar.hasClass("ascend")) {
			tar.removeClass("ascend");
			tar.addClass("descend");
		} else {
			tar.removeClass("descend");
			tar.addClass("ascend");
		}
	}


})();