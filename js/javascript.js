$(function() {

	//React GameOfLife Class below.
	var GameOfLife = React.createClass({

		//Initiates the generation count. 
		getInitialState: function() {
			return { 
				generationCount: 0
			};
		},

		render: function() {
			var idNumber = 1500,
					changeCell = this.changeCell,
					squareObjects = [];

			//Function that creates 50 squares to be returned within a row element through the createRows function.
			var createSquares = function() {

				//Object contructor for making squares.
				function squareObj(id) {
					this.status = 'dead';
					this.state = 'unchecked';
					this.neighbors = 0;
					this.id = id;
				}

				//Empty array that <div> square elements will be pushed into.
				var squares = [];

				//Loop that creates 50 new square objects and 50 <div> square elements.
				for(var i=50; i>0; i--) {
					var newSquare = new squareObj(idNumber);
					squareObjects.push(newSquare);
					squares.push(<div className='square dead' key={idNumber} 
												onClick={changeCell.bind(null, idNumber, squareObjects)} 
												id={idNumber} ></div>);
					idNumber--;
				}
				return squares;
			};

			//Function that creates 30 rows and calls upon the createSquare function within each row element.
			var createRows = function() {
				var rows = [];
				for(var i=30; i>0; i--) {
					rows.push(<div className='row' key={i}>{createSquares()}</div>);
				}
				return rows;
			};
			return (
				<div>
					<h2 className="title">Conway's Game of Life</h2>
					<div className="control-buttons row col-md-12">
		  			<button className="btn-success" onClick={this.runGame.bind(null, squareObjects)}>Run</button>
		  			<button className="btn-info">Pause</button>
		  			<button className="btn-danger" onClick={this.clearGame.bind(null, squareObjects)}>Clear</button>
		  			<a id="generations">Generations: 0</a>
		  		</div>
		  		<div id="grid">{createRows()}</div>
	  		</div>
  		)
		},

		//Function that runs the Game of Life algorithm. 
		runGame: function(squareObjects) {

			function checkPositions(position) {
				//If position and center exists.
				if(position) {
					//If position is alive, increment center square's neighbor attribute by 1.
					if(position.status == 'alive') {
						center.neighbors++;
						//console.log(position)
					}
				}
			}

			//Function that takes all positions and decrements the neighbors by 1.
			function decrementNeighbors(position) {
				alert('decrement function run!');
				position.filter( pos => {
					if(pos.neighbors >= 1) {
						pos.neighbors--;
						alert('DECREMENTED: '+ pos.id + " now has " + pos.neighbors);
					}
				});
			}

			//Currently not being used.
			function incremateNeighbors(position) {
				if(position) {
					position.neighbors++;
				}
			}

			//Iterates through all squareObjects. 
			for(var i = 1500; i>=0; i--) {
				//Define the 8 possible neighboring positions.
				//Include all 8 positions within possiblePositions array to be used
				//with checkPositions function.
				var center = this.returnSquareObj(squareObjects, i.toString()),
						bottom = this.returnSquareObj(squareObjects, (i-50).toString()),
						top = this.returnSquareObj(squareObjects, (i+50).toString()),
						right = this.returnSquareObj(squareObjects, (i-1).toString()),
						left = this.returnSquareObj(squareObjects, (i+1).toString()),
						topLeft = this.returnSquareObj(squareObjects, (i+50+1).toString()),
						topRight = this.returnSquareObj(squareObjects, (i+50-1).toString()),
						bottomLeft = this.returnSquareObj(squareObjects, (i-50+1).toString()),
						bottomRight = this.returnSquareObj(squareObjects, (i-50-1).toString()),
						possiblePositions = [
																 bottom,
																 top,
																 right,
																 left,
																 topLeft,
																 topRight,
																 bottomLeft,
																 bottomRight
																];

				//Iterates through all posible positions of current square and passes it to
				//checkPositions function as a parameter.
				possiblePositions.filter(pos => {
					checkPositions(pos);
				});
			}
			//End of for loop.

			//Second for loop that determines if a cell dies, reproduces, or stands still.
			for(var i = 1500; i>=0; i--) {
				var center = this.returnSquareObj(squareObjects, i.toString()),
						bottom = this.returnSquareObj(squareObjects, (i-50).toString()),
						top = this.returnSquareObj(squareObjects, (i+50).toString()),
						right = this.returnSquareObj(squareObjects, (i-1).toString()),
						left = this.returnSquareObj(squareObjects, (i+1).toString()),
						topLeft = this.returnSquareObj(squareObjects, (i+50+1).toString()),
						topRight = this.returnSquareObj(squareObjects, (i+50-1).toString()),
						bottomLeft = this.returnSquareObj(squareObjects, (i-50+1).toString()),
						bottomRight = this.returnSquareObj(squareObjects, (i-50-1).toString()),
						possiblePositions = [
																 bottom,
																 top,
																 right,
																 left,
																 topLeft,
																 topRight,
																 bottomLeft,
																 bottomRight
																];

				//Rules of reproduction, death, or standstill.
				if(center) {
					//if square had less than two neighbors OR if square had more than 3 neighbors AND is alive
					//change status to dead.
					if((center.neighbors < 2 || center.neighbors > 3) && center.status == 'alive') {
						//Sets status of current square to dead, and decrements all neighbors squares by 1.
						center.status = 'dead';
						center.neighbors = 0;
						alert('changing status of ' + center.id + ' to ' + center.status);
						decrementNeighbors(possiblePositions);
					
						//Changes the div element from 'alive' to 'dead'.
						$('#' + center.id.toString()).removeClass('alive');
						$('#' + center.id.toString()).addClass('dead');

						//if square has 2 or 3 neighbors while alive, live on to next generation.
					}	else if(center.neighbors == 2 || center.neighbors == 3 && center.status == 'alive') {
						
						//if square is dead and has 3 neighbors, it comes to life.
					} else if(center.status == 'dead' && center.neighbors == 3) {
						center.status = 'alive';

						$('#' + center.id.toString()).removeClass('dead');
						$('#' + center.id.toString()).addClass('alive');
					}
					//console.log(center)
				}
			}
			//End of second for loop.
		},

		//Function that is used as an onClick event for each square to change the status of 
		//a clicked square from dead to alive or vice versa.
		changeCell: function(squareId, squareObjects) {
			var clickedSquare = squareId.toString();

			//Retrieves the object equivalent of clickedSquare from squareObjects array.
			var squareObj = this.returnSquareObj(squareObjects, squareId);

			//Toggles the 'dead' or 'alive' class and changes the object status attribute to match it.
			if( $("#" + clickedSquare).hasClass('dead') ) {
				$("#" + clickedSquare).removeClass('dead');
				$("#" + clickedSquare).addClass('alive');
				squareObj.status = 'alive';
			} else {
				$("#" + clickedSquare).removeClass('alive');
				$("#" + clickedSquare).addClass('dead');
				squareObj.status = 'dead';
			}
		},

		clearGame: function(squareObjects) {

			//Resets the generation count back to 0.
			this.setState({generationCount: 0});
			$('#generations').html('Generations: 0');

			//Change class of all square ids back to being dead.
			for(var id = 1500; id > 0; id--) {
				if($("#" + id.toString()).hasClass('alive')) {
					$("#" + id.toString()).removeClass('alive');
					$("#" + id.toString()).addClass('dead');
				}
			}

			//Sets status attribute of all square objects to "dead".
			squareObjects.filter(sqObj => {
				sqObj.status = "dead";
			});
		},

		//Function that takes the squareId, then finds the square object within the squareObjects 
		//array that matches the squareId, then returns it. 
		returnSquareObj: function(squareObjects, squareId) {
			function findSquareById(square) {
				return square.id == squareId;
			}
			var foundSquare = squareObjects.find(findSquareById);
			return foundSquare;
		}
	//End of GameOfLfe React module.
	});

	ReactDOM.render(<GameOfLife />, document.getElementById('gameOfLife'));
});