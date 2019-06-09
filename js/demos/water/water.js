define(["core"], function (Core) {

    Core.use(function (use) {
        use(water);
    });

    function water(Y) {
        Y.log("widget:water init with sandbox", Y);

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
        var damping = 0.98;
        var targetFramerate = 120;
        var isRunning = false;
        var maxIntensity = 2048;

        var xOffset = 0;
        var yOffset = 0;
        var tmp = 0;

        var x = 0;
        var y = 0;
        var i = 0;
        var j = 0;

        var instant = null;
        var hasElapsed = false;

        function init(canvasNode, imgNode, bufferNode) {
            canvas = canvasNode;
            img = imgNode;
            bufferCanvas = bufferNode;

            context = canvas.getContext("2d");
            bufferContext = bufferCanvas.getContext("2d");

            width = canvas.width;
            height = canvas.height;

            context.drawImage(img, 0, 0, width, height);

            // getImageData in ff only accessible from a webserver!
            input = context.getImageData(0, 0, width, height);
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

            canvas.onmousemove = trigger;
            canvas.onmousedown = trigger;
        }

        function trigger(e) {
            if (!isRunning) {
                return;
            }

            var rect = e.target.getBoundingClientRect();
            var x = Math.floor(e.clientX - rect.left);
            var y = Math.floor(e.clientY - rect.top);

            buffers[0][y][x] = maxIntensity;
        }

        function start() {
            isRunning = true;
            step();
        }

        function stop() {
            isRunning = false;
        }

        function step(timestamp) {
            if (!instant) {
                instant = timestamp;
            }
            hasElapsed = (timestamp - instant) > (1000 / targetFramerate);

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
                    // Compute next iteration
                    buffers[nextBuffer][y][x] =
                        ((buffers[selectedBuffer][y][x-1] +
                        buffers[selectedBuffer][y][x+1] +
                        buffers[selectedBuffer][y+1][x] +
                        buffers[selectedBuffer][y-1][x]) / 2 - buffers[nextBuffer][y][x]) * damping;

                    // Render current iteration
                    i = (x + y*width) * 4;

                    xOffset = buffers[selectedBuffer][y][x-1] - buffers[selectedBuffer][y][x+1];
                    yOffset = buffers[selectedBuffer][y-1][x] - buffers[selectedBuffer][y+1][x];

                    j = (Math.floor(Math.max(1, Math.min(width-1, x+xOffset))) + Math.floor(Math.max(1, Math.min(height-1, y+yOffset)))*width)*4;

                    outputData[i] = inputData[j];
                    outputData[i+1] = inputData[j+1];
                    outputData[i+2] = inputData[j+2];
                    outputData[i+3] = inputData[j+3];

                    bufferData[i] = xOffset;
                    bufferData[i+1] = yOffset;
                    bufferData[i+2] = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
                    bufferData[i+3] = 255;
                }
                //for x
            }
            //for y

            selectedBuffer = nextBuffer;

            context.putImageData(output, 0, 0);
            bufferContext.putImageData(buffer, 0, 0);

            if (isRunning) {
                window.requestAnimationFrame(step);
            }
        }

        // Newer setup stuff

        const startButton = document.querySelector(".code-demo.water [data-trigger='water.start']");
        startButton.disabled = false;
        function handleStart() {
            if (!canvas) {
                document.querySelector(".code-demo.water .code-demo__content--hidden").classList.remove("code-demo__content--hidden");
                init(
                    document.querySelector(".code-demo.water .water__pool"),
                    document.querySelector(".code-demo.water .water__pool img"),
                    document.querySelector(".code-demo.water .water__buffer")
                );
            }
            startButton.disabled = true;
            stopButton.disabled = false;
            start();
        }
        startButton.addEventListener("click", handleStart);

        const stopButton = document.querySelector(".code-demo.water [data-trigger='water.stop']");
        function handleStop() {
            startButton.disabled = false;
            stopButton.disabled = true;
            stop();
        }
        stopButton.addEventListener("click", handleStop);

        handleStart();

        return function cleanup() {
            Y.log("water.cleanup", Y);
            stop();

            startButton.removeEventListener("click", handleStart);
            stopButton.removeEventListener("click", handleStop);

            if (canvas) {
                canvas.onmousedown = null;
                canvas.onmousemove = null;
            }
            canvas = null;
            img = null;
            bufferCanvas = null;

            context = null;
            bufferContext = null;

            input = null;
            output = null;
            buffer = null;

            inputData = null;
            outputData = null;
            bufferData = null;
        };
    }
});
