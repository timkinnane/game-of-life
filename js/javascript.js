$(function() {

	//React GameOfLife Class below.
	var GameOfLife = React.createClass({
		getInitialState: function() {
			return { squareElements: this.props.squares };
		},

		render: function() {
			var idNumber = 1500,
					changeCell = this.changeCell;

			//Function that creates 50 squares to be returned within a row element.
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
			return <div>{createRows()}</div>;
		},

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

	ReactDOM.render(<GameOfLife />, document.getElementById('grid'));
});