var canvas;
var gl;

var vBufferFish1;
var vBufferFish2;
var vBufferFish3;
var vBufferFish4;
var vBufferFish5;
var vBufferFish6;
var vBufferFish7;
var vBufferFish8;
var vBufferFish9;
var vBufferFish10;
var vBufferCube;

var vPosition;

var NumVertices  = 9;
var NumVerticesCube  = 24;
var NumBody = 6;
var NumTail = 3;
var NumFin2 = 3;

// Hn�tar fisks � xy-planinu
var vertices = [
    // l�kami (spjald)
    vec4( -0.5,  0.0, 0.0, 1.0 ),
	vec4(  0.2,  0.2, 0.0, 1.0 ),
	vec4(  0.5,  0.0, 0.0, 1.0 ),
	vec4(  0.5,  0.0, 0.0, 1.0 ),
	vec4(  0.2, -0.15, 0.0, 1.0 ),
	vec4( -0.5,  0.0, 0.0, 1.0 ),
	// spor�ur (�r�hyrningur)
    vec4( -0.5,  0.0, 0.0, 1.0 ),
    vec4( -0.65,  0.15, 0.0, 1.0 ),
    vec4( -0.65, -0.15, 0.0, 1.0 ),
    
	// uggar (�r�hyrningur)
    vec4( -0.5,  0.0, 0.0, 1.0 ),
    vec4( -0.65,  0.0, 0.15, 1.0 ),
    vec4( -0.65, 0.0, -0.15, 1.0 )
];


var movement = false;     // Er m�sarhnappur ni�ri?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var rotTail = 0.0;        // Sn�ningshorn spor�s
var incTail = 2.0;        // Breyting � sn�ningshorni

var fish1;
var fish2;
var fish3;
var fish4;
var fish5;
var fish6;
var fish7;
var fish8;
var fish9;
var fish10;

var zView = 2.0;          // Sta�setning �horfanda � z-hniti

var proLoc;
var mvLoc;
var colorLoc;

var cohesion = 0.0;
var seperation = 0.0;
var alignment = 0.0;


// the 8 vertices of the fishtank
var v = [
    vec4( -1.0, -1.0,  1.0, 1.0),
    vec4( -1.0,  1.0,  1.0, 1.0 ),
    vec4(  1.0,  1.0,  1.0, 1.0 ),
    vec4(  1.0, -1.0,  1.0, 1.0 ),
    vec4( -1.0, -1.0, -1.0, 1.0 ),
    vec4( -1.0,  1.0, -1.0, 1.0 ),
    vec4(  1.0,  1.0, -1.0, 1.0 ),
    vec4(  1.0, -1.0, -1.0, 1.0 )
];

var lines = [ v[0], v[1], v[1], v[2], v[2], v[3], v[3], v[0],
              v[4], v[5], v[5], v[6], v[6], v[7], v[7], v[4],
              v[0], v[4], v[1], v[5], v[2], v[6], v[3], v[7]
            ];


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.95, 1.0, 1.0, 1.0 );
 
    gl.enable(gl.DEPTH_TEST);

    fish1 = new Fish(vec4(0.1, 0.6, 0.2, 1.0), 0.0, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish2 = new Fish(vec4(0.1, 0.1, 0.9, 1.0), 0.1, 0.005-Math.random()*0.01, 0.1, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish3 = new Fish(vec4(0.5, 0.6, 0.9, 1.0), -0.4, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish4 = new Fish(vec4(0.9, 0.1, 0.1, 1.0), -0.6, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish5 = new Fish(vec4(0.3, 0.5, 0.5, 1.0), -0.3, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish6 = new Fish(vec4(0.9, 0.9, 0.1, 1.0), -0.2, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish7 = new Fish(vec4(0.9, 0.1, 0.9, 1.0), 0.5, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish8 = new Fish(vec4(0.5, 0.5, 0.5, 1.0), 0.7, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish9 = new Fish(vec4(0.8, 0.7, 0.6, 1.0), 0.3, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    fish10 = new Fish(vec4(0.6, 0.7, 0.8, 1.0), -0.5, 0.005-Math.random()*0.01, 0.0, 0.005-Math.random()*0.01, 0.0, Math.random()*5.0, 0.0);
    
    
 
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    vBufferFish1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish4 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    vBufferFish5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish5 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish6 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish6 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish7 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish7 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish8 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish8 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish9 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish9 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vBufferFish10 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferFish10 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    
    //Fishtank section
    vBufferCube = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferCube );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(lines), gl.STATIC_DRAW );
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "fColor" );

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    // Setjum ofanvarpsfylki h�r � upphafi
    var proj = perspective( 90.0, 1.0, 0.1, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    

    // Atbur�af�ll fyrir m�s
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY += (e.offsetX - origX) % 360;
            spinX += (e.offsetY - origY) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );
    
    // Atbur�afall fyrir lyklabor�
     window.addEventListener("keydown", function(e){
         switch( e.keyCode ) {
            case 38:	// upp �r
                zView += 0.2;
                break;
            case 40:	// ni�ur �r
                zView -= 0.2;
                break;
         }
     }  );  

    // Atbur�afall fyri m�sarhj�l
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zView += 0.2;
         } else {
             zView -= 0.2;
         }
     }  );  

    document.getElementById("cohesionSlider").onchange = function(event) {
        cohesion = event.target.value/10.0;
    };

    document.getElementById("alignMentSlider").onchange = function(event) {
        alignment = event.target.value/10.0;
    };

    document.getElementById("seperationSlider").onchange = function(event) {
        seperation = event.target.value/10.0;
    };

    render();
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = lookAt( vec3(0.0, 0.0, zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );


    //fishTank
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferCube );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( colorLoc, vec4(0.0, 0.5, 0.8, 1.0) );
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.LINES, 0, NumVerticesCube );
    

    //Fish1
    fish1.incrementFish();
    fish1.incrementTail();
    adjustSteering(1, fish1);

    //Fish2
    fish2.incrementFish();
    fish2.incrementTail();
    adjustSteering(2, fish2);
    
    //Fish 3
    fish3.incrementFish();
    fish3.incrementTail();
    
    adjustSteering(3, fish3);
    
    //Fish 4
    fish4.incrementFish();
    fish4.incrementTail();

    adjustSteering(4, fish4);

    //Fish 5
    fish5.incrementFish();
    fish5.incrementTail();

    adjustSteering(5, fish5);

    //Fish 6
    fish6.incrementFish();
    fish6.incrementTail();

    adjustSteering(6, fish6);
    
    //Fish 7
    fish7.incrementFish();
    fish7.incrementTail();

    adjustSteering(7, fish7);
    
    //Fish 8
    fish8.incrementFish();
    fish8.incrementTail();

    adjustSteering(8, fish8);
    
    //Fish 9
    fish9.incrementFish();
    fish9.incrementTail();

    adjustSteering(9, fish9);


    //Fish 10
    fish10.incrementFish();
    fish10.incrementTail();

    adjustSteering(10, fish10);


    fish1.adjustTheSteering();
    fishesDraw(vBufferFish1, fish1.getColorFish(), fish1.getXDirFish(), fish1.getZDirFish(), 0.0, fish1.getRotateXFish(), fish1.getRotTail());

    fish2.adjustTheSteering();
    fishesDraw(vBufferFish2, fish2.getColorFish(), fish2.getXDirFish(), fish2.getZDirFish(), 0.1, fish2.getRotateXFish(), fish2.getRotTail());

    fish3.adjustTheSteering();
    fishesDraw(vBufferFish3, fish3.getColorFish(), fish3.getXDirFish(), fish3.getZDirFish(), 0.5, fish3.getRotateXFish(), fish3.getRotTail());

    fish4.adjustTheSteering();
    fishesDraw(vBufferFish4, fish4.getColorFish(), fish4.getXDirFish(), fish4.getZDirFish(), -0.5, fish4.getRotateXFish(), fish4.getRotTail());

    fish5.adjustTheSteering();
    fishesDraw(vBufferFish5, fish5.getColorFish(), fish5.getXDirFish(), fish5.getZDirFish(), -0.7, fish5.getRotateXFish(), fish5.getRotTail());

    fish6.adjustTheSteering();
    fishesDraw(vBufferFish6, fish6.getColorFish(), fish6.getXDirFish(), fish6.getZDirFish(), 0.7, fish6.getRotateXFish(), fish6.getRotTail());

    fish7.adjustTheSteering();
    fishesDraw(vBufferFish7, fish7.getColorFish(), fish7.getXDirFish(), fish7.getZDirFish(), -0.6, fish7.getRotateXFish(), fish7.getRotTail());

    fish8.adjustTheSteering();
    fishesDraw(vBufferFish8, fish8.getColorFish(), fish8.getXDirFish(), fish8.getZDirFish(), 0.6, fish8.getRotateXFish(), fish8.getRotTail());
    
    fish9.adjustTheSteering();
    fishesDraw(vBufferFish9, fish9.getColorFish(), fish9.getXDirFish(), fish9.getZDirFish(), 0.9, fish9.getRotateXFish(), fish9.getRotTail());

    fish10.adjustTheSteering();
    fishesDraw(vBufferFish10, fish10.getColorFish(), fish10.getXDirFish(), fish10.getZDirFish(), -0.9, fish10.getRotateXFish(), fish10.getRotTail());

    requestAnimFrame( render );
}
function fishesDraw(bufferIdFish, colorIn, xDir0, zDir0, startY, rotatateX0, rotateFinAndTail){
    mv = lookAt( vec3(0.0, 0.0, zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFish );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    

    
	gl.uniform4fv( colorLoc, colorIn );

	// Teikna l�kama fisks (�n sn�nings)
    mv = mult( mv, translate ( xDir0, startY, zDir0 ) ); //Forward and back
    mv = mult( mv, scalem( 0.1, 0.1, 0.1 ) );
    mv = mult( mv, rotateY(rotatateX0) );
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, NumBody );
    

    // Teikna spor� og sn�a honum
	mv = mult( mv, translate ( -0.5, 0.0, 0.0 ) );
    mv = mult( mv, rotateY( rotateFinAndTail ) );
	mv = mult( mv, translate ( 0.5, 0.0, 0.0 ) );
	
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, NumBody, NumTail );

    
    
	// Teikna ugga og sn�a honum
    mv = mult( mv, translate ( -0.5, 0.0, 0.0 ) );
    mv = mult( mv, rotateY( -rotateFinAndTail ) );
	mv = mult( mv, translate ( 1.25, 0.0, 0.0 ) );
    mv = mult( mv, rotateX( rotateFinAndTail ) );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, NumBody+NumTail, NumFin2 );
}

function adjustSteering(currentFishNumber, currentFish){
    var currX = currentFish.getXDirFish();
    var currZ = currentFish.getZDirFish();
    var tempX = 0.0;
    var tempZ = 0.0;

    //Cohesion section
    var midpointX = -10.0;
    var midpointZ = -10.0;
    var cohesionSumXDir = 0.0;
    var cohesionSumZDir = 0.0;
    
    var cohesionCount = 0.0;

    //Alignment section
    var sumXInc = 0.0;
    var sumZInc = 0.0;
    
    var countXInc = 0.0;
    var countZInc = 0.0;

    var alignmentXSteering = 0.0;
    var alignmentZSteering = 0.0;

    //Seperation section
    var lowestDistX = -10;
    var lowestDistZ = -10;
    var currLowestDist = 10;

    var seperationXSteering = 0.0;
    var seperationZSteering = 0.0;
    var result;

    
    if(currentFishNumber != 1){
        tempX = fish1.getXDirFish();
        tempZ = fish1.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir+=tempX;
            cohesionSumZDir+=tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish1.getIncXDirFish();
            sumZInc += fish1.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }
    if(currentFishNumber != 2){
        tempX = fish2.getXDirFish();
        tempZ = fish2.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish2.getIncXDirFish();
            sumZInc += fish2.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }
    
    if(currentFishNumber != 3){
        tempX = fish3.getXDirFish();
        tempZ = fish3.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish3.getIncXDirFish();
            sumZInc += fish3.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }
    
    
    if(currentFishNumber != 4){
        tempX = fish4.getXDirFish();
        tempZ = fish4.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish4.getIncXDirFish();
            sumZInc += fish4.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }

    
    if(currentFishNumber != 5){
        tempX = fish5.getXDirFish();
        tempZ = fish5.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish5.getIncXDirFish();
            sumZInc += fish5.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }

    
    if(currentFishNumber != 6){
        tempX = fish6.getXDirFish();
        tempZ = fish6.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish6.getIncXDirFish();
            sumZInc += fish6.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }

    
    if(currentFishNumber != 7){
        tempX = fish7.getXDirFish();
        tempZ = fish7.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish7.getIncXDirFish();
            sumZInc += fish7.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }

    
    if(currentFishNumber != 8){
        tempX = fish8.getXDirFish();
        tempZ = fish8.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish8.getIncXDirFish();
            sumZInc += fish8.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }

    
    if(currentFishNumber != 9){
        tempX = fish9.getXDirFish();
        tempZ = fish9.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish9.getIncXDirFish();
            sumZInc += fish9.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }

    
    if(currentFishNumber != 10){
        tempX = fish10.getXDirFish();
        tempZ = fish10.getZDirFish();
        var currTempX = tempX-currX;
        var currTempZ = tempZ-currZ;
        
        var distance = calcDistance(currTempX, currTempZ);
        if(distance <= cohesion){
            cohesionSumXDir += tempX;
            cohesionSumZDir += tempZ;

            cohesionCount += 1; 
        }
        if(distance <= alignment){
            sumXInc += fish10.getIncXDirFish();
            sumZInc += fish10.getIncZDirFish();
            countXInc += 1;
            countZInc += 1;
        }
        if(distance <= seperation){
            if(distance < currLowestDist){
                currLowestDist = distance;
                lowestDistX = currTempX;
                lowestDistZ = currTempZ;
            }
        }
    }
    var adjustXBy = 0.0;
    var adjustZBy = 0.0;
    var cohesionXSteering;
    var cohesionZSteering;

    if(cohesionCount != 0.0){
        midpointX = cohesionSumXDir/cohesionCount;
        midpointZ = cohesionSumZDir/cohesionCount;
        
        cohesionXSteering = midpointX-currX;
        cohesionZSteering = midpointZ-currZ;
        adjustXBy = cohesionXSteering*(cohesion/100);
        adjustZBy = cohesionZSteering*(cohesion/100);

    }

    if(sumXInc != 0.0 && sumZInc != null){
        alignmentXSteering = sumXInc/countXInc;
        alignmentZSteering = sumZInc/countZInc;

        adjustXBy =+ alignmentXSteering*alignment;
        adjustZBy =+ alignmentZSteering*alignment;
    }

    if(lowestDistX != -10 && lowestDistZ != -10){
        lowestDistX*=-1;
        lowestDistZ*=-1;
        seperationXSteering = lowestDistX;
        seperationZSteering = lowestDistZ;

        adjustXBy =+ seperationXSteering*(seperation/100);
        adjustZBy =+ seperationZSteering*(seperation/100);
    }
    currentFish.setAdjustXSteering(adjustXBy);
    currentFish.setAdjustZSteering(adjustZBy);
}


function calcDistance(distX, distZ)
{
    return Math.sqrt(Math.pow((distX),2) +  Math.pow((distZ),2));
}


class Fish {
    constructor(colorFish, xDirFish, incXDirFish, zDirFish, incZDirFish, rotTail, incRotTail, rotatateXFish) {
      this.colorFish = colorFish;
      this.xDirFish = xDirFish;
      this.incXDirFish = incXDirFish;
      this.rotatateXFish = rotatateXFish;

      
      this.zDirFish = zDirFish;
      this.incZDirFish = incZDirFish;

      this.ORGincXDirFish = incXDirFish;
      this.ORGincZDirFish = incZDirFish;
      this.rotatateZFish = 270.0;

      this.rotTail = rotTail;
      this.incRotTail = incRotTail;

      this.adjustedXsteering = 0.0;
      this.adjustedZsteering = 0.0;

      this.count = 0;


    }

    incrementFish(){
        this.xDirFish += this.incXDirFish;
        if( this.xDirFish > 0.96){
            this.rotatateXFish = 180.0;
            this.incXDirFish *= -1;
        }
        if(this.xDirFish < -0.96 ){
            this.rotatateXFish = 0.0;
            this.incXDirFish *= -1;
        }
    
        this.zDirFish += this.incZDirFish;
        if( this.zDirFish > 0.96){
            this.rotatateZFish = 90.0;
            this.incZDirFish *= -1;
        }
        if(this.zDirFish < -0.96 ){
            this.rotatateZFish = 270.0;
            this.incZDirFish *= -1;
        }
    }

    incrementTail(){
        this.rotTail += this.incRotTail;
        if( this.rotTail > 35.0  || this.rotTail < -35.0 )
            this.incRotTail *= -1;
    }

    getRotTail(){
        return this.rotTail;
    }

    getColorFish(){
        return this.colorFish;
    }

    getIncXDirFish(){
        return this.incXDirFish;
    }

    getIncZDirFish(){
        return this.incZDirFish;
    }
    

    getXDirFish(){
        return this.xDirFish;
    }


    getRotateXFish(){
        return this.getAngleDegFromInc();
    }

    getZDirFish(){
        return this.zDirFish;
    }

    getAdjustXSteering(){
        return this.adjustedXsteering;
    }

    getAdjustZSteering(){
        return this.adjustedZsteering;
    }
    

    setAdjustXSteering(adjX){
        this.adjustedXsteering = adjX;
    }

    setAdjustZSteering(adjZ){
        this.adjustedZsteering = adjZ;
    }
    adjustTheSteering(){
        if(this.adjustedXsteering != 0.0 && this.adjustedZsteering != 0.0 && (Math.abs(this.adjustedXsteering-this.xDirFish) < 0.93) && Math.abs(this.adjustedZsteering-this.zDirFish) < 0.93 && Math.abs(this.adjustedXsteering) > 0.0005 && Math.abs(this.adjustedZsteering) > 0.0005){
            this.incXDirFish = this.adjustedXsteering;
            this.incZDirFish = this.adjustedZsteering;
        }

    }

     getAngleDegFromInc(){
        var angleRad = Math.atan(Math.abs(this.incZDirFish)/Math.abs(this.incXDirFish-0));
        var angleDeg = angleRad * 180 / Math.PI;

        if(this.incXDirFish > 0.0 && this.incZDirFish > 0.0)
            return -angleDeg;
        if(this.incXDirFish < 0.0 && this.incZDirFish > 0.0)
            return 180.0+angleDeg;
        if(this.incXDirFish < 0.0 && this.incZDirFish < 0.0)
            return 180.0-angleDeg;
        if(this.incXDirFish > 0.0 && this.incZDirFish < 0.0)
            return angleDeg;
     }

  }

