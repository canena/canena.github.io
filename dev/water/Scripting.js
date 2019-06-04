// Jubi?

(function(){

var Scripting = window.Scripting = {

	use: function (url, callback) {
		var script = document.createElement("script");
		//script.type = "text/javascript";
		
		if (typeof callback !== 'function') {
			callback = function(){ /*alert('No callback given');*/ };
		}

		//IE
		if (script.readyState) {  
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};	
		} 
		//Others
		else {  
			script.onload = function() {
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	},
	
	queue: function (functions, context) {
		setTimeout(function() {
			var process = functions.shift();
			process.call(context);

			if (functions.length > 0) {
				setTimeout(arguments.callee, 25);
			}
		}, 25);
	}
};

/*
function checkTypes(func, types){
	var args = func.arguments;
	var argsLength = args.length;
	var typesLength = types.length;
	
	var isSafe = true;
	var curIsSafe = true;
	var minLength = Math.min(argsLength, typesLength);
	var aposteiori = [];
	var issues = [];
	
	if (argsLength !== typesLength){
		isSafe = false;
		issues.push(argsLength + ' argument(s) but ' + typesLength + ' passed type(s)');
	}
	
	for (var i = 0; i < minLength; i++){
	
		var curType = typeof args[i];
		var curPassedType = types[i];
		curIsSafe = (curType === types[i]);
		if (curIsSafe === true){
			aposteiori.push(curType);
			issues.push('\'' + curType + '\' matches type \'' + curPassedType + '\'');
		}
		else {
			aposteiori.push(curType);
			issues.push('\'' + curType + '\' doesnt match type \'' + curPassedType + '\'');
		}
		
		isSafe = isSafe && curIsSafe;
	}

	
	return {
		isSafe: isSafe,
		realTypes: aposteiori,
		issues: issues.join(" | ")
	};
};

function test(canvasId, imgObjId, callback){
	var typing = checkTypes(test, ['string', 'string', 'function']);
	
	return typing.isSafe + ' (' + typing.issues + ')';
};

alert(test('pool3', 'canvas3', function(){}));
*/


// Object inheritance via delegation
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}


var Const = window.Const = {

};

})();