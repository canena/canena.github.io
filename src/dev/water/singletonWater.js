/// <summary>
/// Water simulation via javascript drawn onto a canvas
/// </summary>
var Water = window.Water = (function () {
    var doc = document;
    var version = "0.01";

    var img = undefined;
    var canvas = undefined;
    var context = undefined;
    var bufferContext = undefined;
    var bufferCanvas = undefined;

    // Buffers
    var selectedBuffer = 0;
    var nextBuffer = 1;
    var buffers = [[], []];

    // Source image
    var input = null;
    var inputData = null;
    var output = null;
    var outputData = null;
    var buffer = null;
    var bufferData = null;

    var height = -1;
    var width = -1;

    // Animation settings
    var damping = 0.97;
    var depth = 1;
    var targetFramerate = 60;
    var isRunning = false;
    var maxIntensity = 1024;

    var xOffset = 0;
    var yOffset = 0;
    var shading = 0;
    var tmp = 0;

    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;

    function init(canvasId, imgObjId, bufferId) {
        if (typeof canvasId === 'string' && typeof imgObjId === 'string') {
            canvas = doc.getElementById(canvasId);
            img = doc.getElementById(imgObjId);
            bufferCanvas = doc.getElementById(bufferId);
        } else {
            throw new Error(
                'water.init(canvasId:\'string\', imgObjId:\'string\') | Invalid argument(s) passed.\n' +
                '(canvasId:\''+(typeof canvasId)+'\')'+
                ', (imgObjId:\''+(typeof imgObjId)+'\')');
        }

        if (canvas !== null && img !== null) {
            canvas.onmousemove = trigger;
            canvas.onmousedown = trigger;

            context = canvas.getContext("2d");
            bufferContext = bufferCanvas.getContext("2d");

            width = canvas.width;
            height = canvas.height;

            context.drawImage(img, 0, 0, width, height);

            // getImageData in ff only accessible from a webserver!
            input = context.getImageData(0, 0, canvas.width, canvas.height);
            output = context.createImageData(width, height);
            buffer = bufferContext.createImageData(width, height);

            inputData = input.data;
            outputData = output.data;
            bufferData = buffer.data;

            // Filling source image
            for (y = 0; y < height; y++) {
                // Adding a row to the image and buffers
                buffers[0][y] = [];
                buffers[1][y] = [];

                // Filling the columns
                for (x = 0; x < width; x++) {
                    buffers[0][y][x] = 0;
                    buffers[1][y][x] = 0;

                    // Filling the edge region
                    // it isn't touch by the algorithm
                    if ((x === 0 || x === width-1) || (y === 0 || y === height-1)) {
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

        } else {
            throw new Error('At least one specified element doesn\'t exist.');
        }
    }

    function trigger(e) {
        if (e.x === undefined) {
            buffers[0][e.pageY][e.pageX] = maxIntensity;
        } else {
            buffers[0][e.y][e.x] = maxIntensity;
        }

        if (isRunning === false) {
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
        step();
    }

    function stop() {
        isRunning = false;
    }

    var instant = null;
    var hasElapsed = false;
    var diff = 0;

    function step(timestamp) {
        if (!instant) {
            instant = timestamp;
        }
        diff = timestamp - instant;
        hasElapsed = diff > (1000 / targetFramerate);

        if (!hasElapsed) {
            if (isRunning) {
                window.requestAnimationFrame(step);
            }
            return;
        }

        instant = timestamp;

			  nextBuffer = -(selectedBuffer - 1);

				for (y = 1; y < height - 1; y++) {
					  for (x = 1; x < width - 1; x++) {
						    buffers[nextBuffer][y][x] =
							      ((buffers[selectedBuffer][y][x-1] +
							        buffers[selectedBuffer][y][x+1] +
							        buffers[selectedBuffer][y+1][x] +
							        buffers[selectedBuffer][y-1][x]) / 2 - buffers[nextBuffer][y][x]) * damping;
					  }
					  //for x
				}
				//for y

				// The voodoo magic
				for (y = 1; y < height - 1; y++) {
            for (x = 1; x < width - 1; x++) {
                i = (x + y*width) * 4;
                shading = 0;

                xOffset = depth*(buffers[selectedBuffer][y][x-1] - buffers[selectedBuffer][y][x+1]);
                yOffset = depth*(buffers[selectedBuffer][y-1][x] - buffers[selectedBuffer][y+1][x]);

                shading = 0;//xOffset;

                j = (Math.floor(Math.max(1, Math.min(width-1, x+xOffset))) + Math.floor(Math.max(1, Math.min(height-1, y+yOffset)))*width)*4;

                outputData[i] = inputData[j] + shading;
                outputData[i+1] = inputData[j+1] + shading;
                outputData[i+2] = inputData[j+2] + shading;
                outputData[i+3] = inputData[j+3] + shading;

                //tmp = Math.floor(255 * buffers[selectedBuffer][y][x] / maxIntensity);
                bufferData[i] = xOffset;
                bufferData[i+1] = yOffset;
                bufferData[i+2] = 255;
                bufferData[i+3] = 255;

                //bufferData[i] = tmp;
                //bufferData[i+1] = tmp;
                ////bufferData[i+1] = Math.max(0, Math.min(255, Math.sqrt(xOffset*xOffset + yOffset*yOffset)));
                //bufferData[i+2] = tmp;
                //bufferData[i+3] = 255;
                ////bufferData[i+3] = Math.sqrt(xOffset*xOffset + yOffset*yOffset);//buffers[selectedBuffer][y][x];
            }
				}

				selectedBuffer = nextBuffer;

        context.putImageData(output, 0, 0);
        bufferContext.putImageData(buffer, 0, 0);

			  if (isRunning) {
				    window.requestAnimationFrame(step);
			  }
    }

    return {
        init: init, trigger: trigger, toggle: toggle
    };
}());
