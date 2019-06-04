/*
 * Water simulation using JavaScript
 * The algorithm credits to somewhere here:
 * http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
 *
 */
 
(function($){
	var Water = window.Water =
	{
		img: null,
		canvasContext: null,
		
		// Buffers
		selectedBuffer: 0,
		buffers: [],
		realPixels: [],
		
		// Source image
		srcImage: [],
		height: 100,
		width: 100,
		
		// Animation settings
		damping: 0.9,
		targetFramerate: 10,
		isRunning: false,
		myInterval: null,
		steps: 0,
		maxSteps: 200,
		
		// Private fields
		xOffset: 0,
		yOffset: 0,
		shading: 0,
		
		// Constructor
		prepare: function(canvasId) 
		{
			
			this.canvasContext = document.getElementById(canvasId).getContext("2d");
			this.img = this.canvasContext.getImageData(0, 0, this.width, this.height);
			
			
			this.buffers[0] = [];
			this.buffers[1] = [];
			
			// Filling source image
			for (y = 0; y < this.height; y++)
			{
				// Adding a row to the image and buffers
				this.srcImage[y] = [];
				this.realPixels[y] = [];
				this.buffers[0][y] = [];
				this.buffers[1][y] = [];
				
				// Filling the columns
				for (x = 0; x < this.width; x++)
				{
					if (x % 2 === 0 || y % 2 === 0)
					{
						this.srcImage[y][x] = 0;
						this.buffers[0][y][x] = 0;
						this.buffers[1][y][x] = 0;
						
						
					}
					else
					{
						this.srcImage[y][x] = 0;
						this.buffers[0][y][x] = 0;
						this.buffers[1][y][x] = 0;
					}
					
					//$(this.incarnation).append("<div id='x"+x+"_y"+y+"' style='position: absolute; background-color: #ffffff; top: "+y+"px; left: "+x+"px; width: 1px; height: 1px;'></div>");
					//this.realPixels[y][x] = $("#x"+x+"_y"+y);
				}
				//for x
			}
			//for y
			
			
			return true;
		},
		
		start: function()
		{
			this.steps = 0;
			this.isRunning = true;
			//this.bufferPixel(1, 1);
			//console.log(""+this.getPixel(1, 1));
			
			//this.setBufferPixel(1, 1, 0, 10);
			
			this.buffers[0][Math.floor(this.height / 2)][Math.floor(this.width / 2)] = 255;
			
			
			this.myInterval = window.setInterval("Water.step()", (1000 / this.targetFramerate));
			$(this.incarnation).css('background', '#333333');
		},
		
		stop: function()
		{
			this.isRunning = false;
			window.clearInterval(this.myInterval);
			$(this.incarnation).css('background', '#ff0000');
		},
		
		step: function()
		{
			if (this.steps < this.maxSteps)
			{
				this.waterAlgorithmStep();
				this.render();
			}
			else
			{
				this.stop();
			}
			
			this.steps++;
		},
		
		getPixel: function(x, y)
		{
			x = Math.floor(Math.min(this.width-1, Math.max(0, x)));
			y = Math.floor(Math.min(this.height-1, Math.max(0, y)));
			
			//x = Math.floor(x);
			//y = Math.floor(y);
		
			return this.srcImage[y][x];
		},
		
		setPixel: function(x, y, value)
		{
			var index = (x + y * this.img.width) * 4;
			this.img.data.splice(index, 4, value, value, value, 255);
		},
		
		getBufferPixel: function(x, y, bufNo)
		{
			//x = Math.floor(Math.min(this.width-1, Math.max(0, x)));
			//y = Math.floor(Math.min(this.height-1, Math.max(0, y)));
			
			x = Math.floor(x);
			y = Math.floor(y);
			
			if (typeof(bufNo) !== 'number')
			{
				bufNo = this.selectedBuffer;
			}
			
			if (console !== null)
			{
				//console.log("buffer = " + bufNo + ", x = " + x + ", y = " + y);
			}
			
			return this.buffers[bufNo][y][x];
			
		},
		
		setBufferPixel: function(x, y, bufNo, value)
		{
			//x = Math.floor(Math.min(this.width-1, Math.max(0, x)));
			//y = Math.floor(Math.min(this.height-1, Math.max(0, y)));
			
			x = Math.floor(x);
			y = Math.floor(y);
			
			if (typeof(bufNo) !== 'number')
			{
				bufNo = this.selectedBuffer;
			}
			
			if (console !== null)
			{
				//console.log("buffer = " + bufNo + ", x = " + x + ", y = " + y);
			}
			
			this.buffers[bufNo][y][x] = value;
			
		},
		
		// The voodoo magic
		waterAlgorithmStep: function()
		{
			// Dirty js
			var nextBuf = !this.selectedBuf;
			
			for (y = 1; y < this.height - 1; y++)
			{
				for (x = 1; x < this.width - 1; x++)
				{
					this.setBufferPixel(x, y, nextBuf, 
						((this.getBufferPixel(x-1, y) +
						this.getBufferPixel(x+1, y) +
						this.getBufferPixel(x, y+1) +
						this.getBufferPixel(x, y-1)) / 2 - this.getBufferPixel(x, y, nextBuf)) * this.damping);
				}
				//for x
			}
			//for y
			
			this.selectedBuf = nextBuf;
		},
		
		// Rendering 
		render: function()
		{
			for (y = 1; y < this.height - 1; y++)
			{
				for (x = 1; x < this.width - 1; x++)
				{
					this.xOffset = this.getBufferPixel(x-1, y) - this.getBufferPixel(x+1, y);
					this.yOffset = this.getBufferPixel(x, y-1) - this.getBufferPixel(x, y+1);
					
					this.shading = this.xOffset;
					
					this.setPixel(x, y, (this.getPixel(x+this.xOffset, y+this.yOffset) + this.shading));
				}
			}
			
			if (this.img !== null && this.canvasContext !== null)
			{
				this.canvasContext.putImageData(this.img, 0, 0);
			}
		},
		
		// Rendering 
		renderToText: function()
		{
			var sMsg = "";

			for (y = 1; y < this.height - 1; y++)
			{
				for (x = 1; x < this.width - 1; x++)
				{
					this.xOffset = this.getBufferPixel(x-1, y) - this.getBufferPixel(x+1, y);
					this.yOffset = this.getBufferPixel(x, y-1) - this.getBufferPixel(x, y+1);
					
					this.shading = this.xOffset;
					
					sMsg += (this.getPixel(x+this.xOffset, y+this.yOffset) + this.shading) + "\t";
				}
				
				sMsg += "\n";
			}
			
			if (this.steps === (this.maxSteps - 1))
			{
				alert(sMsg);
			}
		}
	};
	
	$(document).ready(function()
	{
		if (Water.prepare('pool') === true)
		{
			Water.start();
		}
		
		$('#pool').click(function() {
			if (Water.isRunning === true)
			{
				Water.stop();
			}
			else
			{
				Water.start();
			}
		});
	});
	
})(jQuery);