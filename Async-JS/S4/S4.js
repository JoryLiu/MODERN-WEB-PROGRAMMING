(function() {

	var A = -1;
	var B = -1;
	var C = -1;
	var D = -1;
	var E = -1;
	var finish = false;
	var clock;
	var option;

	function isFinish() {
		if (!(A == -1 || B == -1 || C == -1 || D == -1 || E == -1)) {
			$("#info-bar").removeClass().addClass("active");
			finish = true;
		}
	}

	function activate() {
		if (A == -1) $(".A").removeClass("inactive").addClass("active");
		if (B == -1) $(".B").removeClass("inactive").addClass("active");
		if (C == -1) $(".C").removeClass("inactive").addClass("active");
		if (D == -1) $(".D").removeClass("inactive").addClass("active");
		if (E == -1) $(".E").removeClass("inactive").addClass("active");
	}

	function storeValue(target, value) {
		switch(target) {
			case "A": A = parseInt(value); break;
			case "B": B = parseInt(value); break;
			case "C": C = parseInt(value); break;
			case "D": D = parseInt(value); break;
			case "E": E = parseInt(value); break;
		}
	}

	function getNumber(event) {
		var target = event.target;
		if ($(target).hasClass("active")) {
			var xmlhttp = new XMLHttpRequest();
			$("." + $(target).attr("class").split(" ")[0] + " .unread").show();
			$("." + $(target).attr("class").split(" ")[0] + " .unread").text("...");
			$(".button").not("." + $(target).attr("class").split(" ")[0]).not("active").removeClass("active").addClass("inactive");
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					$("." + $(target).attr("class").split(" ")[0] + " .unread").text(xmlhttp.responseText);
					storeValue($(target).attr("class").split(" ")[0], xmlhttp.responseText);
					$("." + $(target).attr("class").split(" ")[0]).removeClass("active").addClass("inactive");
					activate();
					isFinish();
				}
			}
			xmlhttp.open("GET", "http://127.0.0.1:3000", true);
			xmlhttp.send();
		}
	}

	function getSum() {
		if (finish)
			$("#sum").text(A + B + C + D + E);
		$("#info-bar").removeClass("active").addClass("inactive");
	}

	Array.prototype.shuffle = function() {
		var m = this.length, i;
		while (m) {
			i = (Math.random() * m--) >>> 0;
			[this[m], this[i]] = [this[i], this[m]]
		}
		return this;
	}

	function clickButton(index) {
		if (index == 5) {
			setTimeout(function() {
				$("#info-bar").click();
			}, 500);
		} else {
			setTimeout(function() {
				var xmlhttp = new XMLHttpRequest();
				$("." + option[index] + " .unread").show();
				$("." + option[index] + " .unread").text("...");
				$(".button").not("." + option[index]).not("active").removeClass("active").addClass("inactive");
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						$("." + option[index] + " .unread").text(xmlhttp.responseText);
						storeValue(option[index], xmlhttp.responseText);
						$("." + option[index]).removeClass("active").addClass("inactive");
						activate();
						isFinish();
						clickButton(index + 1);
					}
				}
				xmlhttp.open("GET", "http://127.0.0.1:3000", true);
				xmlhttp.send();
			}, 500);
		}
	}

	function oneRefersToZen() {
		/*clickA().done(clickB).done(clickC).done(clickD).done(clickE).done(clickSum);*/
		clickButton(0);
	}

	function addListeners() {
		$(".button").click(getNumber);
		$(".icon").click(oneRefersToZen);
		$("#button").mouseleave(function() {
			clock = setTimeout(initialize, 1700);
		});
		$("#button").mouseover(function() {
			clearTimeout(clock);
		});
		$("#info-bar").click(getSum);
	}

	function initialize() {
		option = ["A", "B", "C", "D", "E"].shuffle();
		A = B = C = D = E = -1;
		$(".unread").text("").hide();
		$("#sum").text("");
		$("#info-bar").removeClass().addClass("inactive");
		$(".button").removeClass("inactive").addClass("active");
	}

	$(document).ready(function() {
		initialize();
		addListeners();
	});
})();