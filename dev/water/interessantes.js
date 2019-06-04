//#######################################################################################################
// General advices
//#######################################################################################################
/*
http://www.slideshare.net/nzakas/maintainable-javascript-1071179
Maintainability:

- lambda <-> anonymous functions
- no 'type' or 'language' attribute in <script>
- variables: nouns
- functions: verbs
- boolfuncs: is...()
- Indicate variables
	* Initialization:	var found = false;
	* Hungarian Notation:	var sName = "Nicholas";
	* Type comments:	var cost /*:float+/ = 5.23
- publicly accessible functions, variables attached to an object
- namespace objects but:	don't go overboard, three levels is enough

- avoid null comparisons and throw erros
function sortArray(value) 
{
	if (value instanceof Array)
	{
		value.sort();
	} else {
		throw new Error("sortArray: argument must be an Array);
	}
}
-> value instanceof constructor
-> for 'string', 'number', boolean' : typeof value === "string"

- using constants
var Constants = { INVALID_MSG : "Invalid value", INVALID_URL: "/errors/invalid.php" };

- one object per file
- setTimeout, setInterval without strings (eval is evil) -> only functions
- avoid large string concatenations, use local variables for rows e.g.

- local variables faster?
- store out of scope variables locally (scope chain length)
- avoid 'with'
- 'var' for declaring variables
- data access from literals and local variables is fastest
- minimize deep object property/array item lookup

- 25ms for setTimeout or setInterval?
- action < 100ms is fluid

- 'value === undefined' for existence
- no '++', '--' for security reasons
- 'number' is the only type -> float <= alert((0.1 + 0.3 === 0.3));
- 'new' is bad
	/*
	var testobj = {
		groesse: 50
	};
	
	var str = Object.create(testobj);
		
	alert("str.groesse = "+str.groesse);
	str.groesse = 100;
	alert("str.groesse = "+str.groesse);
	alert("testobj.groesse = "+testobj.groesse);
	
	var extStr = new StringBuffer();
	alert(extStr.append('blubb').append(' plisch')+"");
	
	
- curly braces on the right for js <= semicolon insertion
return					return;			// semicolon insertion <= returns undefined
					
{					{			// block? at the end this isn't reachable	
	ok: false	=>			ok: false;	// 'ok:' is statement label, false is useless expression statement
};					};			// empty statement

this returns undefined because of this automatic conversion up here

	return {
		ok: false
	};

- maximum of 2 js files to load, put it at the end of the <body>-tag (small first to load the second big one)

- firebug time messurement
console.time('create list');  
 
for (i = 0; i < 1000; i++) {  
	var myList = $('.myList');  
	myList.append('This is list item ' + i);  
}  
 
console.timeEnd('create list'); 

- loading images
$('#myImage').attr('src', 'image.jpg').load(function() {  
	alert('Image Loaded');  
});  

- adding a JS class to html tag to hide content
 $('HTML').addClass('JS');  
.JS #myDiv{display:none;} 

- shortend ready function
$(document).ready(function (){  
	// your code  
});  
   
$(function (){  
	// your code  
});  

*/

//#######################################################################################################
// http://googlecode.blogspot.com/2009/03/doug-crockford-javascript-good-parts.html
// Google talk with Douglas Crockford
//#######################################################################################################

/*
// This is where names is global and could interfere with whatsoever

var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var digit_name = function (n)
{
	return names[n];
};
alert(digig_name(3));	// 'three'

*/

/*
// This one is slow and works, but the local variable will be created everytime the function is called

var digit_name = function (n) 
{
	var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	
	return names[n];
};
alert(digit_name(3));	// 'three'
*/

/*
// This one is the fastest way.

var digit_name = function () 
{
	var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	
	
	return function (n)
	{
		return names[n];
	};
}();
alert(digit_name(3));	// 'three'
*/

/*
// A Module Pattern - a Singleton

var singleton = function ()
{
	var privateVariable;
	function privateFunction(x)
	{
		// ...
	}
	return
	{
		firstMethod: function (a, b)
		{
			// ...
			// Access to private variables
			... privateVariable ...
		},
		secondMethod: function (c)
		{
			// ...
			...privateFunction()...
		}
	};
}();
*/

//#######################################################################################################
// http://www.nczonline.net/blog/2009/08/11/timed-array-processing-in-javascript/
// Some improvements for function usage
//#######################################################################################################


/*function StringBuffer() 
{ 
	this.buffer = []; 
} 

StringBuffer.prototype.append = function append(string) 
{ 
	this.buffer.push(string); 
	return this; 
}; 
 
// this is slow
StringBuffer.prototype.toString = function toString() 
{ 
	return this.buffer.join(""); 
}; */




// This is to start functions asynchronously
// schedule([func1, func2, ...], window);
function schedule(functions, context)
{
	setTimeout(function()
	{
		var process = functions.shift();
		process.call(context);

		if (functions.length > 0)
		{
			setTimeout(arguments.callee, 25);
		}
	}, 25);
}

// Improve chunk with < 50ms per op time
//Copyright 2009 Nicholas C. Zakas. All rights reserved.
//MIT Licensed
function timedChunk(items, process, context, callback){
    var todo = items.concat();   //create a clone of the original

    setTimeout(function(){

        var start = +new Date();

        do {
             process.call(context, todo.shift());
        } while (todo.length > 0 && (+new Date() - start < 50));

        if (todo.length > 0){
            setTimeout(arguments.callee, 25);
        } else {
            callback(items);
        }
    }, 25);
}

// This replaces sth. like this while the array is reduced in every step
// foreach (item in items) { process(item); }
// Usage: chunk(items, process);
// To avoid destruction of original array: chunk(items.concat(), process);
function chunk(array, process, context)
{
	setTimeout(function()
	{
		var item = array.shift();
		process.call(context, item);

		if (array.length > 0)
		{
			setTimeout(arguments.callee, 25);
		}
	}, 25);
}

function chunkPreserve(array, process, context)
{
	var items = array.concat();   //clone the array
	setTimeout(function()
	{
		var item = items.shift();
		process.call(context, item);

		if (items.length > 0)
		{
			setTimeout(arguments.callee, 25);
		}
	}, 100);
}

function chunkAccessToIndex(array, process, context)
{
	var i=0;
	setTimeout(function()
	{
		var item = array.shift();
		process.call(context,i,item);
		i++;
		if (array.length > 0)
		{
			setTimeout(arguments.callee, 25);
		}
	}, 10);
}

// To use like this for recursive functions with numbers as return types:
// Crockford
/*
var fibonacci =
    memoizerNumbers([0, 1], function (recur, n) {
       return recur(n - 1) + recur(n - 2);
    });

// instead of:
function fibonacci (n) {
    return n < 2 ? n :
            fibonacci(n - 1) +
            fibonacci(n - 2);
};
*/
function memoizerNumbers(memo, fundamental) 
{
	var shell = function (n) 
	{
		var result = memo[n];
		if (typeof result !== 'number') 
		{
			result = fundamental(shell, n);
			memo[n] = result;
		}
		return result;
	};
	return shell;
};

// http://www.nczonline.net/blog/2009/01/27/speed-up-your-javascript-part-3/
/*
var fibonacci =
    memoizer(function (recur, n) {
       return recur(n - 1) + recur(n - 2);
    }, {"0":0, "1":1});

*/
function memoizer(fundamental, cache){
    cache = cache || {}
    var shell = function(arg){
        if (!cache.hasOwnProperty(arg)){
            cache[arg] = fundamental(shell, arg)
        }
        return cache[arg];
    };
    return shell;
}

/*
 * Mergesort
 *
 */
function merge(left, right){
    var result = [];

    while (left.length > 0 && right.length > 0){
        if (left[0] < right[0]){
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return result.concat(left).concat(right);
}

//recursive merge sort algorithm
function mergeSort(items){

    if (items.length == 1) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

/*
 * Mergesort iterative
 *
//iterative merge sort algorithm
function mergeSort(items){
    if (items.length == 1) {
        return items;
    }

    var work = [];
    for (var i=0, len=items.length; i < len; i++){
        work.push([items[i]]);
    }
    work.push([]);  //in case of odd number of items

    for (var lim=len; lim > 1; lim = (lim+1)/2){
        for (var j=0,k=0; k < lim; j++, k+=2){
            work[j] = merge(work[k], work[k+1]);
        }
        work[j] = [];  //in case of odd number of items
    }

    return work[0];
}
*/

/*
 * Stringbuffer class for fast concatenation
 *
 */

function StringBuffer() 
{ 
	this.buffer = []; 
} 

StringBuffer.prototype.append = function append(string) 
{ 
	this.buffer.push(string); 
	//return this; 
}; 
 
// this is slow
StringBuffer.prototype.toString = function toString() 
{ 
return this.buffer.join(""); 
}; 
 /* Usage:
 var buf = new StringBuffer();

 buf.append("hello");
 buf.append("world");

 alert(buf.toString());
*/





