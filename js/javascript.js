$(function() {
	
	//React GameOfLife Class below.
	var GameOfLife = React.createClass({
		getInitialState: function() {
			return { squareElements: this.props.squares };
		},

		render: function() {
			var idNumber = 1500;
			var createSquares = function() {
				var squares = [];
				for(var i=50; i>0; i--) {
					squares.push(<div className='square' key={idNumber} id={idNumber}></div>);
					idNumber--;
				}
				return squares;
			};

			var createRows = function() {
				var rows = [];
				for(var i=30; i>0; i--) {
					rows.push(<div className='row' key={i}>{createSquares()}</div>);
				}
				return rows;
			};
			return <div>{createRows()}</div>;
		}
	});

	ReactDOM.render(<GameOfLife />, document.getElementById('grid'));
});