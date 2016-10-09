function print(equation) {
	var cur = "";
	if (equation == "")
		document.getElementById("display").value = 0;
	else if (equation.length > 9) {
			cur = equation.substring(equation.length - 9, equation.length);
			document.getElementById("display").value = cur;
		}
	else
		document.getElementById("display").value = equation;
}

function isValid(equation) {
	var findDecimal = false;
	if (equation[0] == '*' || equation[0] == '/' || equation[0] == ')') return false;
	if (equation[equation.length - 1] == '+' ||
		equation[equation.length - 1] == '-' ||
		equation[equation.length - 1] == '*' ||
		equation[equation.length - 1] == '/' ||
		equation[equation.length - 1] == '(') return false;
	var bracket = 0;
	for (var i = 1; i < equation.length; i++) {
		if ((equation[i] == '+' || equation[i] == '-' || equation[i] == '*' || equation[i] == '/') &&
			(equation[i - 1] == '+' || equation[i - 1] == '-' || equation[i - 1] == '*' || equation[i - 1] == '/'))
			return false;
		if (equation[i] == '(') {
			if (equation[i + 1] == '*' || equation[i + 1] == '/' || equation[i + 1] == ')') return false;
			bracket++;
		}
		if (equation[i] == ')') {
			if (equation[i - 1] == '+' ||
				equation[i - 1] == '-' ||
				equation[i - 1] == '*' ||
				equation[i - 1] == '/' ||
				equation[i - 1] == '(') return false;
			bracket--;
		}
		if (equation[i] == '.') {
			if (findDecimal) return false;
			findDecimal = true;
		}
	}
	if (bracket != 0) return false;
	return true;
}

window.onload = function() {
	var equation = "";
	print(equation);
	document.getElementById("keyboard").addEventListener("click", function(e) {
		var target = e.target;
		if (target.className == "oxfordGray normal" ||
			target.className == "orange normal" ||
			target.className == "lightGray normal") {
			equation += target.value;
			print(equation);
		}
		else if (target.id == "decimal") {
			if (equation[equation.length - 1] >= '0' && equation[equation.length - 1] <= '9')
				equation += ".";
			else if (equation[equation.length - 1] != '.') {
				equation += "0";
				equation += ".";
			}
			print(equation);
		}
		else if (target.id == "clearError") {
			equation = "";
			print(equation);
		}
		else if (target.id == "backspace") {
			if (equation.length > 0)
				equation = equation.substring(0, equation.length - 1);
			print(equation);
		}
		else {
			var temp = "";
			for (var i = 0; i < equation.length; i++) {
				if (equation[i] == '÷') temp += "/";
				else if (equation[i] == '×') temp += "*";
				else temp += equation[i];
			}
			if (equation == "")
				print("0");
			else if (!isValid(temp)) {
				alert("Error!");
			}
			else {
				equation = eval(temp);
				equation += ".";
				equation = equation.substring(0, equation.length - 1); //做了equation = eval(temp)这一句以后equation.length就变成了undefined，不知道怎么解决，只好这样了
				document.getElementById("display").value = equation;
			}
		}
	})
}