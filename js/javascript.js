$(function() {
	console.log("javascript loaded successfully");
	var idNumber = 1500,
			squareRows = [];

	function genDivElements() {
		//This loop will append a 50x30 grid with 1500 squares each having an id 
		//number, in numerical order, from descending order.
		for(var i = 30; i > 0; i--) {
			var divSquares = [];
			//for every 50 div elements, put the elements between a
			//<div class="row"> tag and append it to <div id="grid"> within the
			//HTML document.
			for(var squares=50; squares > 0; squares--) {
				divSquares.push("<div class='square' id='"+idNumber+"'></div>");
				idNumber--;
			}
			divSquares = "<div class='row'>"+divSquares.join('')+"</div>";
			squareRows.push(divSquares);
		}
	}	

	genDivElements();

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
					squares.push(<div className='square' id={idNumber}></div>);
					idNumber--;
				}
				return squares;
			};

			var createRows = function() {
				var rows = [];
				for(var i=30; i>0; i--) {
					rows.push(<div className='row'>{createSquares()}</div>);
				}
				return rows;
			};
			return <div>{createRows()}</div>;
		}
	});

	ReactDOM.render(<GameOfLife squares={squareRows}/>, document.getElementById('grid'));
});