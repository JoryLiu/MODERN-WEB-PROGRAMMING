(function() {
	$(document).ready(function() {
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js", "jquery");
    	loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js", "lodash");
		$("th").click(sort);
	});

	function sort(event) {
		var tar = $(event.target);
		clear(tar);
		_.chain($(tar.parents("table")).children("tbody").children("tr"))
			.sortBy(tr=>$(tr).children("td:nth-child(" + (tar.index()+1) + ")").text())
			.thru(array=>event.target.className === "selected ascend"?reverse(array):array)
			.forEach(tr=>$(tar.parents("table")).children("tbody").append($(tr)))
			.value();
		mark(event.target);
	}

	function clear(tar) {
		tar.siblings().each(function() {
			this.className = "";
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
		if (tar.className === "selected ascend")
			tar.className = "selected descend";
		else
			tar.className = "selected ascend";
	}


})();