// document.onload=function(){

    var video = document.querySelector('#camFeed');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    var pText = document.getElementById('positions');
    var drawPath;

    if (navigator.getUserMedia) {       
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        console.log('Error occured here: '+e.printStackTrace())
    }

    var ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(video);

    function positionLoop() {
        // var t0 = performance.now();
        requestAnimationFrame(positionLoop);
        var positions = ctracker.getCurrentPosition();
        // positions = [[x_0, y_0], [x_1,y_1], ... ]
        // do something with the positions ...
        //  var positionString = "";
        //   if (positions) {
        //     for (var p = 0;p < 10;p++) {
        //       positionString += "featurepoint "+p+" : ["+positions[p][0].toFixed(2)+","+positions[p][1].toFixed(2)+"]<br/>";
        //     }
        //     pText.innerHTML = positionString;
        //   }
          
        //   var t1 = performance.now();
        // //   console.log('positionLoop() took '+ (t1-t0) + 'time to work.')
        // console.log(positions.length);
        drawPath=positions;
    }
    positionLoop();

    var canvasInput = document.getElementById('drawCanvas');
    var cc = canvasInput.getContext('2d');
    function drawLoop() {
        requestAnimationFrame(drawLoop);
        cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
        ctracker.draw(canvasInput);
    }
    drawLoop();

// }


