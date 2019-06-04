(function(){

/**
 * Water simulation via javascript drawn onto a canvas
 *
 */
var Water = window.Water = function(){
	/// <summary>
	/// Private elements
	/// </summary>
	var doc = document;
	var version = "0.01";

	var img = undefined;
	var canvas = undefined;
	var context = undefined;

	// Buffers
	var selectedBuffer = 0;
	var nextBuffer = 1;
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
	var internalTimeoutMs = 1;
	var isRunning = false;
	var maxIntensity = 1024;

	var xOffset = 0;
	var yOffset = 0;
	var shading = 0;


	var x = 0;
	var y = 0;
	var i = 0;
	var j = 0;
	
	function init(canvasId, imgObjId) {
		
		if (typeof canvasId === 'string' && typeof imgObjId === 'string')
		{
			canvas = doc.getElementById(canvasId);
			img = doc.getElementById(imgObjId);
		}
		else
		{
			throw new Error(
				'water.init(canvasId:\'string\', imgObjId:\'string\') | Invalid argument(s) passed.\n' +
				'(canvasId:\''+(typeof canvasId)+'\')'+
				', (imgObjId:\''+(typeof imgObjId)+'\')');
		}

		if (canvas !== null && img !== null)
		{
			canvas.onmousemove = trigger;
			canvas.onmousedown = trigger;
			
			context = canvas.getContext("2d");
			
			width = canvas.width;
			height = canvas.height;
			
			context.drawImage(img, 0, 0, width, height);
			
			// getImageData in ff only accessible from a webserver!
			input = context.getImageData(0, 0, canvas.width, canvas.height);
			output = context.createImageData(width, height);
			
			inputData = input.data;
			outputData = output.data;
			
			// Filling source image
			for (y = 0; y < height; y++)
			{
				// Adding a row to the image and buffers
				buffer1[y] = [];
				buffer2[y] = [];
				
				// Filling the columns
				for (x = 0; x < width; x++)
				{
					buffer1[y][x] = 0;
					buffer2[y][x] = 0;
					
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

		}
		else
		{
			throw new Error('At least one specified element doesn\'t exist.');
		}		
	}
	
	function trigger(e)
	{
		var iX = 1, iY = 1;
		if (e.x === undefined) {
			iX = e.pageX;
			iY = e.pageY;
		}
		else {
			iX = e.x;
			iY = e.y;
		}
		
		buffer1[Math.min(height-2, Math.max(1,iY))][Math.min(width-2, Math.max(1, iX))] = Math.round(Math.random()*maxIntensity);
			
		if (isRunning === false)
		{
			start();
		}
	}
	
	function toggle() {
		
		if (isRunning === true) {
			stop();
		} else {
			start();
		}
	}
	
	function start() {
		
		isRunning = true;

		// Asynchronously calling the calculation and rendering
		Scripting.queue([calculation, renderFast], window);
	}

	function stop() {
	
		isRunning = false;
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
				window.setTimeout(arguments.callee, internalTimeoutMs);
			}
		})();
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

						j = (Math.floor(Math.max(1, Math.min(width-1, x+xOffset))) + Math.floor(Math.max(1, Math.min(height-1, y+yOffset)))*width)*4;
						
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
		
	} return {
	/**
	 * Public elements
	 *
	 */
		init: init, trigger: trigger, toggle: toggle
		//, damping: damping, targetFramerate: targetFramerate, maxIntensity: maxIntensity
	};
}();


})();