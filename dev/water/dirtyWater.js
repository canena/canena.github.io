/*
 * Water quick and dirty
 *
 */
 
//(function($){

var useBigBuffer = false;

var img = null;
var canvas = null;
var context = null;

// Buffers
var selectedBuffer = 0;
var nextBuffer = 1;
//var buffers = [];
var buffer1 = [];
var buffer2 = [];

// Source image
var input = null;
var inputData = null;
var output = null;
var outputData = null;
		
var height = -1;
var width = -1;

// Animation settings
var damping = 0.95;
var targetFramerate = 50;
var isRunning = false;
var myInterval = null;
var maxIntensity = 1024;

// Private fields
var xOffset = 0;
var yOffset = 0;
var shading = 0;


var x = 0;
var y = 0;
var i = 0;
var j = 0;


function prepare(canvasId, imgObjId)
{
	img = document.getElementById(imgObjId);
	
	canvas = document.getElementById(canvasId);
	context = canvas.getContext("2d");
	
	width = canvas.width;
	height = canvas.height;
	
	context.drawImage(img, 0, 0, width, height);
	input = context.getImageData(0, 0, canvas.width, canvas.height);
	output = context.createImageData(width, height);
	
	inputData = input.data;
	outputData = output.data;
	
	//buffers[0] = [];
	//buffers[1] = [];
	
	// Filling source image
	for (y = 0; y < height; y++)
	{
		// Adding a row to the image and buffers
		buffer1[y] = [];
		buffer2[y] = [];
		
		//buffers[0][y] = [];
		//buffers[1][y] = [];
		
		// Filling the columns
		for (x = 0; x < width; x++)
		{
			buffer1[y][x] = 0;
			buffer2[y][x] = 0;
			
			//buffers[0][y][x] = 0;
			//buffers[1][y][x] = 0;
			
			// Filling the edge region
			// it isn't touch by the algorithm
			if ((x === 0 || x === width-1) || (y === 0 || y === height-1))
			{
				i = (x + y*width) * 4;
				
				outputData[i] = inputData[i];
				outputData[i+1] = inputData[i+1];
				outputData[i+2] = inputData[i+2];
				outputData[i+3] = inputData[i+3];
			}
		}
		//for x
	}
	//for y
	
	
	return true;
	
}

function trigger(e)
{
	//var intensity = ;
	
	
	buffer1[e.pageY][e.pageX] = Math.round(Math.random()*maxIntensity);
	
	if (isRunning === false)
	{
		start();
	}
	//buffers[selectedBuffer][e.pageY][e.pageX] = Math.round(Math.random()*maxIntensity);
	
	/*var minX = Math.max(0, e.pageX);
	var maxX = Math.min(width-1, e.pageX);
	var minY = Math.max(0, e.pageY);
	var maxY = Math.min(height-1, e.pageY);
	buffer1[minY][minX] = intensity;
	buffer1[maxY][maxX] = intensity;
	buffer1[minY][maxX] = intensity;
	buffer1[maxY][minX] = intensity;*/
}

function toggle()
{
	if (isRunning === true)
	{
		stop();
	}
	else
	{
		start();
	}
}

function start()
{
	steps = 0;
	isRunning = true;
	//this.bufferPixel(1, 1);
	//console.log(""+this.getPixel(1, 1));
	
	//this.setBufferPixel(1, 1, 0, 10);
	
	//buffer1[Math.floor(height2) + 1][Math.floor(width2) + 1] = 256;
	//buffer1[Math.floor(height2)][Math.floor(width2)] = 255;
	//buffer1[1][1] = 256;
	//buffer1[1][width-2] = 256;
	
	//alert('starting');
	//window.setInterval("calculation()", (1000 / 25));
	//myInterval = window.setInterval("renderFast()", (1000 / targetFramerate));
	
	//calculation();
	//renderFast();
	
	// Asynchronously calling the calculation and rendering
	Scripting.queue([calculation, renderFast], window);
}

function stop()
{
	isRunning = false;
	//window.clearInterval(myInterval);
	//alert("max = " + max + ", min = " + min);
}

function calculation()
{
	(function(){
		// Dirty js
		nextBuffer = -(selectedBuffer - 1);
		
		if (selectedBuffer === 0)
		{
			for (y = 1; y < height - 1; y++)
			{
				for (x = 1; x < width - 1; x++)
				{
					buffer2[y][x] =  
						((buffer1[y][x-1] +
						buffer1[y][x+1] +
						buffer1[y+1][x] +
						buffer1[y-1][x]) / 2 - buffer2[y][x]) * damping;
				}
				//for x
			}
			//for y
			
			selectedBuffer = nextBuffer;
		}
		else
		{
			for (y = 1; y < height - 1; y++)
			{
				for (x = 1; x < width - 1; x++)
				{
					buffer1[y][x] =  
						((buffer2[y][x-1] +
						buffer2[y][x+1] +
						buffer2[y+1][x] +
						buffer2[y-1][x]) / 2 - buffer1[y][x]) * damping;
				}
				//for x
			}
			//for y
			
			selectedBuffer = nextBuffer;
		}
		
		if (isRunning)
		{
			window.setTimeout(arguments.callee, 1);
		}
	})();

	/*
	 * This is for using a 3d-array buffer which lacks performance
	 *
	(function(){
		// Dirty js
		nextBuffer = -(selectedBuffer - 1);
		
		for (y = 1; y < height - 1; y++)
		{
			for (x = 1; x < width - 1; x++)
			{
				(function(){
				buffers[nextBuffer][y][x] =  
					((buffers[selectedBuffer][y][x-1] +
					buffers[selectedBuffer][y][x+1] +
					buffers[selectedBuffer][y+1][x] +
					buffers[selectedBuffer][y-1][x]) / 2 - buffers[nextBuffer][y][x]) * damping;
				})();
			}
			//for x
		}
		//for y
		
		selectedBuffer = nextBuffer;
		
		if (isRunning)
		{
			window.setTimeout(arguments.callee, 10);
		}
	})();*/
}

function renderFast()
{
	(function(){
		if (selectedBuffer === 0)
		{
			// The voodoo magic
			for (y = 1; y < height - 1; y++)
			{
				for (x = 1; x < width - 1; x++)
				{
					i = (x + y*width) * 4;
					shading = 0;
					
					xOffset = buffer2[y][x-1] - buffer2[y][x+1];
					yOffset = buffer2[y-1][x] - buffer2[y+1][x];
					
					shading = xOffset;

					var j = (Math.floor(Math.max(1, Math.min(width-1, x+xOffset))) + Math.floor(Math.max(1, Math.min(height-1, y+yOffset)))*width)*4;
					
					outputData[i] = inputData[j] + shading;
					outputData[i+1] = inputData[j+1] + shading;
					outputData[i+2] = inputData[j+2] + shading;
					outputData[i+3] = inputData[j+3] + shading;
				}
			}
		
		}
		else
		{
			// The voodoo magic
			for (y = 1; y < height - 1; y++)
			{
				for (x = 1; x < width - 1; x++)
				{
					i = (x + y*width) * 4;
					shading = 0;
					
					xOffset = buffer2[y][x-1] - buffer2[y][x+1];
					yOffset = buffer2[y-1][x] - buffer2[y+1][x];
					
					shading = xOffset;

					j = (Math.floor(Math.max(1, Math.min(width-1, x+xOffset))) + Math.floor(Math.max(1, Math.min(height-1, y+yOffset)))*width)*4;
					
					outputData[i] = inputData[j] + shading;
					outputData[i+1] = inputData[j+1] + shading;
					outputData[i+2] = inputData[j+2] + shading;
					outputData[i+3] = inputData[j+3] + shading;
				}
			}
		}
		
		context.putImageData(output, 0, 0);
		
		if (isRunning)
		{
			window.setTimeout(arguments.callee, (1000 / targetFramerate));
		}
	})();
		/*(function(){
			// The voodoo magic
			for (y = 1; y < height - 1; y++)
			{
				for (x = 1; x < width - 1; x++)
				{
					i = (x + y*width) * 4;
					shading = 0;
					
					xOffset = buffers[nextBuffer][y][x-1] - buffers[nextBuffer][y][x+1];
					yOffset = buffers[nextBuffer][y-1][x] - buffers[nextBuffer][y+1][x];
					
					shading = xOffset;

					j = (Math.floor(Math.max(1, Math.min(width-1, x+xOffset))) + Math.floor(Math.max(1, Math.min(height-1, y+yOffset)))*width)*4;
					
					outputData[i] = inputData[j] + shading;
					outputData[i+1] = inputData[j+1] + shading;
					outputData[i+2] = inputData[j+2] + shading;
					outputData[i+3] = inputData[j+3] + shading;
				}
			}
			
			context.putImageData(output, 0, 0);
			
			if (isRunning)
			{
				window.setTimeout(arguments.callee, (1000 / targetFramerate));
			}
		})();*/
}

// Rendering 
/*function render()
{	
	// Dirty js
	nextBuffer = -(selectedBuffer - 1);
	
	if (selectedBuffer === 0)
	{
		for (y = 1; y < height - 1; y++)
		{
			for (x = 1; x < width - 1; x++)
			{
				buffer2[y][x] =  
					((buffer1[y][x-1] +
					buffer1[y][x+1] +
					buffer1[y+1][x] +
					buffer1[y-1][x]) / 2 - buffer2[y][x]) * damping;
			}
			//for x
		}
		//for y
		
		selectedBuffer = nextBuffer;

		// The voodoo magic
		for (y = 1; y < height - 1; y++)
		{
			for (x = 1; x < width - 1; x++)
			{
				xOffset = buffer2[y][x-1] - buffer2[y][x+1];
				yOffset = buffer2[y-1][x] - buffer2[y+1][x];
				
				shading = xOffset;
				value = input[y][x];
				
				value += shading + 120;
				
				// SetPixel
				img.data.splice((x + y * img.width) * 4, 4, value, value, value, 255);
			}
		}
	
	}
	else
	{
		for (y = 1; y < height - 1; y++)
		{
			for (x = 1; x < width - 1; x++)
			{
				buffer1[y][x] =  
					((buffer2[y][x-1] +
					buffer2[y][x+1] +
					buffer2[y+1][x] +
					buffer2[y-1][x]) / 2 - buffer1[y][x]) * damping;
			}
			//for x
		}
		//for y
		
		selectedBuffer = nextBuffer;

		// The voodoo magic
		for (y = 1; y < height - 1; y++)
		{
			for (x = 1; x < width - 1; x++)
			{
				xOffset = buffer1[y][x-1] - buffer1[y][x+1];
				yOffset = buffer1[y-1][x] - buffer1[y+1][x];
				
				shading = xOffset;
				value = input[y][x];
				
				value += shading + 120;
				
				// SetPixel
				img.data.splice((x + y * img.width) * 4, 4, value, value, value, 255);
			}
		}
	}
	
	
	context.putImageData(img, 0, 0);
}*/

/*
$(window).bind('load', function() 
{
	if (prepare('pool', 'waterImg') === true)
	{
		//document.getElementById('pool').onclick = toggle;
		document.getElementById('pool').onmousemove = trigger;
		//document.getElementById('pool').onmousedown = trigger;
		
		//document.getElementById('pool').onclick = renderFast;
		//start();
	}
	else
	{
		alert('preparation failed');
	}
});
*/

/// Initialization

if (prepare('pool', 'waterImg') === true)
{
	//document.getElementById('pool').onclick = toggle;
	document.getElementById('pool').onmousemove = trigger;
	//document.getElementById('pool').onmousedown = trigger;
	
	//document.getElementById('pool').onclick = renderFast;
	//start();
}
else
{
	alert('preparation failed');
}

//})(jQuery);