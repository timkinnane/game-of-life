$(function() {

	// React GameOfLife Class below.
	var GameOfLife = React.createClass({

		// Initiates the generation count. 
		getInitialState: function() {
			return { 
				generationCount: 0
			};
		},

		render: function() {
			var idNumber = 1500,
					changeCell = this.changeCell,
					squareObjects = [];

			// Function that creates 50 squares to be returned within a row element through the createRows function.
			var createSquares = function() {

				// Object contructor for making squares.
				function squareObj(id) {
					this.status = 'dead';
					this.state = 'unchanged';
					this.neighbors = 0;
					this.id = id;
				}

				// Empty array that <div> square elements will be pushed into.
				var squares = [];

				// Loop that creates 50 new square objects and 50 <div> square elements.
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

			// Function that creates 30 rows and calls upon the createSquare function within each row element.
			var createRows = function() {
				var rows = [];
				for(var i=30; i>0; i--) {
					rows.push(<div className='row' key={i}>{createSquares()}</div>);
				}
				return rows;
			};
			return (<div>
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

		// Function that runs the Game of Life algorithm. 
		runGame: function(squareObjects) {
			var bank = [],
			returnSq = this.returnSquareObj,
			center, bottom, top, left, right, topLeft,
			topRight, bottomLeft, bottomRight, possiblePositions;
			
			function checkPositions(position) {
				// If position and center exists.
				// and if position is alive and unchanged, increment center square's neighbor attribute by 1.
				if(position && position.status == 'alive') {
					center.neighbors++;
					if(bank.indexOf(center) == -1) {
						bank.push(center);
					}
				}
			}

			// Function that takes all positions and decrements the neighbors by 1.
			function decrementNeighbors(position) {
				position.filter( pos => {
					if(pos.neighbors >= 1) {
						pos.neighbors--;
						//console.log('DECREMENTED: '+ pos.id + " now has " + pos.neighbors);
					}
				});
			}

			function defineNeighbors(i) {
				// Define the 8 possible neighboring positions.
				// Include all 8 positions within possiblePositions array to be used
				// with checkPositions function.
				center = returnSq(squareObjects, i.toString());
				bottom = returnSq(squareObjects, (i-50).toString());
				top = returnSq(squareObjects, (i+50).toString());
				right = returnSq(squareObjects, (i-1).toString());
				left = returnSq(squareObjects, (i+1).toString());
				topLeft = returnSq(squareObjects, (i+50+1).toString());
				topRight = returnSq(squareObjects, (i+50-1).toString());
				bottomLeft = returnSq(squareObjects, (i-50+1).toString());
				bottomRight = returnSq(squareObjects, (i-50-1).toString());
				possiblePositions = [bottom,top,right,left,topLeft,topRight,bottomLeft,bottomRight];
			}

			// Function that changes the state of each square based on how many neighbors it has.
			function changeState() {
				for(var i = 1500; i>=0; i--) {
					defineNeighbors(i);

					if(!center) {
						console.log('center square '+i+' does not exist.');
					} else if(center.neighbors < 2) {
						center.status = 'dead';
					} else if(center.neighbors > 3) {
						center.status = 'dead';
					} else if(center.neighbors == 3) {
						center.status = 'alive';
					}

					if(center) {
						if(center.status == 'alive') {
							$('#'+center.id).removeClass('dead');
							$('#'+center.id).addClass('alive');
						} else {
							$('#'+center.id).removeClass('alive');
							$('#'+center.id).addClass('dead');
						}
					}
				}
			}

			// Iterates through all squareObjects. 
			for(var i = 1500; i>=0; i--) {
				// Passes numbers 0-1500 into defineNeighbors() to check all 1500 squares on the grid.
				// and increment the neighbors property if necessary. 
				defineNeighbors(i);

				// Iterates through all posible positions of current square and passes it to
				// checkPositions function as a parameter.
				possiblePositions.filter(pos => {
					checkPositions(pos);
				});
			// End of for loop.
			}

			changeState();

			bank.filter(x => {
				console.log(x);
			});

		},

		// Function that is used as an onClick event for each square to change the status of 
		// a clicked square from dead to alive or vice versa.
		changeCell: function(squareId, squareObjects) {
			var clickedSquare = squareId.toString();

			// Retrieves the object equivalent of clickedSquare from squareObjects array.
			var squareObj = this.returnSquareObj(squareObjects, squareId);

			// Toggles the 'dead' or 'alive' class and changes the object status attribute to match it.
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

			// Resets the generation count back to 0.
			this.setState({generationCount: 0});
			$('#generations').html('Generations: 0');

			// Change class of all square ids back to being dead.
			for(var id = 1500; id > 0; id--) {
				if($("#" + id.toString()).hasClass('alive')) {
					$("#" + id.toString()).removeClass('alive');
					$("#" + id.toString()).addClass('dead');
				}
			}

			// Sets status attribute of all square objects to "dead".
			squareObjects.filter(sqObj => {
				sqObj.status = "dead";
			});
		},

		// Function that takes the squareId, then finds the square object within the squareObjects 
		// array that matches the squareId, then returns it. 
		returnSquareObj: function(squareObjects, squareId) {
			function findSquareById(square) {
				return square.id == squareId;
			}
			var foundSquare = squareObjects.find(findSquareById);
			return foundSquare;
		}
	// End of GameOfLfe React module.
	});

	ReactDOM.render(<GameOfLife />, document.getElementById('gameOfLife'));
});