	var pacman = {
		x: 1,
		y: 1
	};

	var score = 0;

	//TODO #3: add createWorld() function to randomly generate "world" arrays

	var world = generateMaze();

	function displayWorld(){
		var output = '';

		for (var i=0; i<world.length; i++){
			output += "\n<div class='row'>\n";
			for (var j=0; j<world[i].length; j++){
				if (world[i][j] === 2){
					output += "<div class='brick'></div>";
				}
				else if(world[i][j] === 1){
					output += "<div class='coin'></div>";
				}
				else if(world[i][j] === 3){
					output += "<div class='cherries'></div>";
				}
				if (world[i][j] === 0){
					output += "<div class='empty'></div>";
				}
			}
			output += "\n</div>";
		}
	document.getElementById('world').innerHTML = output;
	}

	function displayPacman(){
		document.getElementById('pacman').style.top = pacman.y*20+'px';
		document.getElementById('pacman').style.left = pacman.x*20+'px';
	}

	displayWorld();
	displayPacman();

	document.onkeydown = function(e){
		if (e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2){
			pacman.x--;
			document.getElementById('pacman').style.transform = "rotate(180deg)";
		}
		else if (e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2){
			pacman.y--;
			document.getElementById('pacman').style.transform = "rotate(-90deg)";
		}
		else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2){
			pacman.x++;
			document.getElementById('pacman').style.transform = "rotate(0deg)";
		}
		else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2){
			pacman.y++;
			document.getElementById('pacman').style.transform = "rotate(90deg)";
		}
		if (world[pacman.y][pacman.x] === 1){
			world[pacman.y][pacman.x] = 0;
			score += 1;
			displayWorld();
			displayScore();
		}
		if (world[pacman.y][pacman.x] === 3){
			world[pacman.y][pacman.x] = 0;
			score += 50;
			displayWorld();
			displayScore();
		}
		displayPacman()
	}

	function displayScore(){
		document.getElementById('score').innerHTML = "<p>" + score + "</p>";
	}
    
    displayScore();

	function generateMaze(){
		var maze = [];
		for(let i=0;i<10;i++){
			if(i==0 || i==9){
				maze.push(outerWall());
			}
			else{
				let newRow = [];
				for(let k=0;k<10;k++){
					if(k==0 || k==9){
						newRow.push(2);
					}
					else{
						newRow.push(1);
					}
				}
				maze.push(newRow);
			}
        }
        maze = buildInnerWalls(maze);
		maze[1][1] = 0;
		return maze;
	}

	function outerWall(){
		var row = []
		for(let i=0;i<10;i++){
			row.push(2);
		}
		return row;
	}

	function buildInnerWalls(currentMaze){
        // how many walls?
        // to begin the experiment, let's build five.
        for(let w=0;w<5;w++){
            buildWall(currentMaze);
        }
		return currentMaze;
    }
    
    function buildWall(currentMaze){
        //pick a direction:
        var mazeSize = currentMaze.length - 2;
        var direction = randomizer(2);
        var initialSquare = [randomizer(mazeSize) + 1, randomizer(mazeSize) + 1];
        maxDistanceFirst = randomizer(mazeSize);
        if(direction==1){
            var pivotPoint = verticalBlock(currentMaze, initialSquare);
        }
        else{
            pivotPoint = horizontalBlock(currentMaze, initialSquare);
        }

        //then turn:
        var turn = Math.floor(Math.random() * 2);
        maxDistanceNext = randomizer(mazeSize);
        if(turn==1){
            if(direction==1){
                horizontalBlock(currentMaze, pivotPoint);
            }
            else{
                verticalBlock(currentMaze, pivotPoint);
            }
        }
    }

    function verticalBlock(currentMaze, startAt){
        if(currentMaze[startAt[0] + 1][startAt[1]] != 2){
            currentMaze[startAt[0][startAt[1]]] = 2;
            startAt[0]++;
            verticalBlock(currentMaze, startAt);
        }
        else{
            return startAt;
        }
    }

    function horizontalBlock(currentMaze, startAt){
        if(currentMaze[startAt[0]][startAt[1] + 1] != 2){
            currentMaze[startAt[0][startAt[1]]] = 2;
            startAt[1]++;
            horizontalBlock(currentMaze, startAt);
        }
        else{
            return startAt;
        }
    }

    function randomizer(max){
        return Math.floor(Math.random() * max)
    }