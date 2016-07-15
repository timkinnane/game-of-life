$(function() {

	//React GameOfLife Class below.
	var GameOfLife = React.createClass({
		getInitialState: function() {
			return { 
				squareElements: this.props.squares,
				generationCount: 0
			};
		},

		render: function() {
			var idNumber = 1500,
					changeCell = this.changeCell;

			//Function that creates 50 squares to be returned 
			//within a row element through the createRows function.
			var createSquares = function() {
				var squares = [];
				for(var i=50; i>0; i--) {
					squares.push(<div className='square dead' key={idNumber} onClick={changeCell.bind(null, idNumber)} id={idNumber} ></div>);
					idNumber--;
				}
				return squares;
			};

			//Function that creates 30 rows and calls upon the createSquare 
			//function within each row element.
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
		  			<button className="btn-success" onClick={this.runGame}>Run</button>
		  			<button className="btn-info">Pause</button>
		  			<button className="btn-danger" onClick={this.clearGame}>Clear</button>
		  			<a id="generations">Generations: </a>
		  		</div>
		  		<div id="grid">{createRows()}</div>
	  		</div>
  		)
		},

		//Function that is used as an onClick event for each square
		//to change the status of a clicked square from dead to alive or vice versa.
		changeCell: function(squareId) {
			var clickedSquare = squareId.toString();
			if( $("#" + clickedSquare).hasClass('dead') ) {
				$("#" + clickedSquare).removeClass('dead');
				$("#" + clickedSquare).addClass('alive');
			} else {
				$("#" + clickedSquare).removeClass('alive');
				$("#" + clickedSquare).addClass('dead');
			}
		},

		clearGame: function() {
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
		},

		//Function that runs the game.
		runGame: function() {

			//for loop that iterates through all square id's.
			for(var id = 1500; id > 0; id--) {

				//Declare current square div's and all neighboring squares.
				var currentSq = $("#" + id.toString()),
						sqTop = $("#" + (id + 50).toString()),
						sqBott = $("#" + (id - 50).toString()),
						sqLeft = $("#" + (id + 1).toString()),
						sqRight = $("#" + (id - 1).toString()),
						sqTopLeft = $("#" + (id + 50 + 1).toString()),
						sqTopRight = $("#" + (id + 50 -1).toString()),
						sqBottLeft = $("#" + (id - 50 + 1).toString()),
						sqBottRight = $("#" + (id - 50 -1).toString());

				if(currentSq.hasClass('alive')) {

					//if square has no alive neighbors.
					if(sqTop.hasClass('dead') && sqBott.hasClass('dead') 
							&& sqLeft.hasClass('dead') && sqRight.hasClass('dead') 
							&& sqTopLeft.hasClass('dead') && sqTopRight.hasClass('dead') 
							&& sqBottLeft.hasClass('dead') && sqBottRight.hasClass('dead')
						) {
						currentSq.removeClass('alive');
						currentSq.addClass('dead');

						this.state.generationCount++;
						$('#generations').html('Generations: ' + this.state.generationCount);
					}
					//if top square is alive and the others are dead.
					else if
						(sqTop.hasClass('alive') && sqBott.hasClass('dead') 
							&& sqLeft.hasClass('dead') && sqRight.hasClass('dead') 
							&& sqTopLeft.hasClass('dead') && sqTopRight.hasClass('dead') 
							&& sqBottLeft.hasClass('dead') && sqBottRight.hasClass('dead')
						) {	
						currentSq.removeClass('alive');
						currentSq.addClass('dead');
						var runGame = this.runGame;
						setTimeout(function() {
							runGame();
						}, 200);

						this.state.generationCount++;
						$('#generations').html('Generations: ' + this.state.generationCount);
					} 
					//if bottom square is alive and others are dead.
					else if
						(sqBott.hasClass('alive') && sqTop.hasClass('dead') 
							&& sqLeft.hasClass('dead') && sqRight.hasClass('dead') 
							&& sqTopLeft.hasClass('dead') && sqTopRight.hasClass('dead') 
							&& sqBottLeft.hasClass('dead') && sqBottRight.hasClass('dead')
					  ) {
							currentSq.removeClass('alive');
							currentSq.addClass('dead');
							var runGame = this.runGame;
							setTimeout(function() {
								runGame();
							}, 200);

							this.state.generationCount++;
							$('#generations').html('Generations: ' + this.state.generationCount);
					}
				}
			}
		}
	});

	ReactDOM.render(<GameOfLife />, document.getElementById('gameOfLife'));
});