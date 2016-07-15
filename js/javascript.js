$(function() {

	//React GameOfLife Class below.
	var GameOfLife = React.createClass({
		getInitialState: function() {
			return { squareElements: this.props.squares };
		},

		render: function() {
			var idNumber = 1500,
					changeCell = this.changeCell;

			//Function that creates 50 squares to be returned 
			//within a row element through the createRows function.
			var createSquares = function() {
				var squares = [];
				for(var i=50; i>0; i--) {
					squares.push(<div className='square dead' key={idNumber} onClick={changeCell.bind(this, idNumber)} id={idNumber} ></div>);
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
		  			<button className="btn-success">Run</button>
		  			<button className="btn-info">Pause</button>
		  			<button className="btn-danger">Clear</button>
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
		}
	});

	ReactDOM.render(<GameOfLife />, document.getElementById('gameOfLife'));
});