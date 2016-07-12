$(function() {
	console.log("javascript loaded successfully");
	var idNumber = 1500;

	for(var i = 30; i > 0; i--) {
		var divSquares = [];

		for(var squares=50; squares > 0; squares--) {
			divSquares.push("<div class='square' id='"+idNumber+"'></div>");
			idNumber--;
		}

		divSquares = "<div class='row'>"+divSquares.join('')+"</div>";

		console.log(divSquares);

		$('#grid').append(divSquares);
	}
});