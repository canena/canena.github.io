
(function(){var Water=window.Water=function(){var doc=document;var version="0.01";var img=undefined;var canvas=undefined;var context=undefined;var selectedBuffer=0;var nextBuffer=1;var buffer1=[];var buffer2=[];var input=null;var inputData=null;var output=null;var outputData=null;var height=-1;var width=-1;var damping=0.95;var targetFramerate=50;var internalTimeoutMs=1;var isRunning=false;var maxIntensity=1024;var xOffset=0;var yOffset=0;var shading=0;var x=0;var y=0;var i=0;var j=0;function init(canvasId,imgObjId){if(typeof canvasId==='string'&&typeof imgObjId==='string')
{canvas=doc.getElementById(canvasId);img=doc.getElementById(imgObjId);}
else
{throw new Error('water.init(canvasId:\'string\', imgObjId:\'string\') | Invalid argument(s) passed.\n'+'(canvasId:\''+(typeof canvasId)+'\')'+', (imgObjId:\''+(typeof imgObjId)+'\')');}
if(canvas!==null&&img!==null)
{canvas.onmousemove=trigger;canvas.onmousedown=trigger;context=canvas.getContext("2d");width=canvas.width;height=canvas.height;context.drawImage(img,0,0,width,height);input=context.getImageData(0,0,canvas.width,canvas.height);output=context.createImageData(width,height);inputData=input.data;outputData=output.data;for(y=0;y<height;y++)
{buffer1[y]=[];buffer2[y]=[];for(x=0;x<width;x++)
{buffer1[y][x]=0;buffer2[y][x]=0;if((x===0||x===width-1)||(y===0||y===height-1))
{i=(x+y*width)*4;outputData[i]=inputData[i];outputData[i+1]=inputData[i+1];outputData[i+2]=inputData[i+2];outputData[i+3]=inputData[i+3];}}}}
else
{throw new Error('At least one specified element doesn\'t exist.');}}
function trigger(e)
{var iX=1,iY=1;if(e.x===undefined){iX=e.pageX;iY=e.pageY;}
else{iX=e.x;iY=e.y;}
buffer1[Math.min(height-2,Math.max(1,iY))][Math.min(width-2,Math.max(1,iX))]=Math.round(Math.random()*maxIntensity);if(isRunning===false)
{start();}}
function toggle(){if(isRunning===true){stop();}else{start();}}
function start(){isRunning=true;Scripting.queue([calculation,renderFast],window);}
function stop(){isRunning=false;}
function calculation()
{(function(){nextBuffer=-(selectedBuffer-1);if(selectedBuffer===0)
{for(y=1;y<height-1;y++)
{for(x=1;x<width-1;x++)
{buffer2[y][x]=((buffer1[y][x-1]+
buffer1[y][x+1]+
buffer1[y+1][x]+
buffer1[y-1][x])/2-buffer2[y][x])*damping;}}
selectedBuffer=nextBuffer;}
else
{for(y=1;y<height-1;y++)
{for(x=1;x<width-1;x++)
{buffer1[y][x]=((buffer2[y][x-1]+
buffer2[y][x+1]+
buffer2[y+1][x]+
buffer2[y-1][x])/2-buffer1[y][x])*damping;}}
selectedBuffer=nextBuffer;}
if(isRunning)
{window.setTimeout(arguments.callee,internalTimeoutMs);}})();}
function renderFast()
{(function(){if(selectedBuffer===0)
{for(y=1;y<height-1;y++)
{for(x=1;x<width-1;x++)
{i=(x+y*width)*4;shading=0;xOffset=buffer2[y][x-1]-buffer2[y][x+1];yOffset=buffer2[y-1][x]-buffer2[y+1][x];shading=xOffset;j=(Math.floor(Math.max(1,Math.min(width-1,x+xOffset)))+Math.floor(Math.max(1,Math.min(height-1,y+yOffset)))*width)*4;outputData[i]=inputData[j]+shading;outputData[i+1]=inputData[j+1]+shading;outputData[i+2]=inputData[j+2]+shading;outputData[i+3]=inputData[j+3]+shading;}}}
else
{for(y=1;y<height-1;y++)
{for(x=1;x<width-1;x++)
{i=(x+y*width)*4;shading=0;xOffset=buffer2[y][x-1]-buffer2[y][x+1];yOffset=buffer2[y-1][x]-buffer2[y+1][x];shading=xOffset;j=(Math.floor(Math.max(1,Math.min(width-1,x+xOffset)))+Math.floor(Math.max(1,Math.min(height-1,y+yOffset)))*width)*4;outputData[i]=inputData[j]+shading;outputData[i+1]=inputData[j+1]+shading;outputData[i+2]=inputData[j+2]+shading;outputData[i+3]=inputData[j+3]+shading;}}}
context.putImageData(output,0,0);if(isRunning)
{window.setTimeout(arguments.callee,(1000/targetFramerate));}})();}return{init:init,trigger:trigger,toggle:toggle};}();})();