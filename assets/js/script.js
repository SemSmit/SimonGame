//     -   No spaces allowed in Name Input
	$("#nameInput").on({
	  keydown: function(e) {
	    if (e.which === 32)
	      return false;
	  },
	  change: function() {
	    this.value = this.value.replace(/\s/g, "");
	  }
	});

//     -   When pressing Enter in the name-input, it clicks the button below
	let input = document.getElementById("nameInput");
	let name;
	
	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	   document.getElementById("btn").click();
	  }
	});

//     -   Hide name input form etc. Then shows name with first letter uppercase and selection between games
	function submitName(){
		name = input.value.charAt(0).toUpperCase() + input.value.slice(1);
		$(".namesection").hide();
		$(".gamesection").show();
		typingEffect();
	};

 
//     -   Typing effect
	let i = 0;
	let speed = 200; /* speed in miliseconds */

	function typingEffect() {
	  if (i < name.length) {
	    document.getElementById("name-title").innerHTML += name.charAt(i);
	    i++;
	    setTimeout(typingEffect, speed);
	  }
	}

	//________________________SIMON GAME_______________________________

	let powerButton = document.getElementById("power");
	let strictButton = document.getElementById("strict");
	let power = "Off";
	let strict = "On";
	let start = document.getElementById("start");
	let green = document.getElementById("green");
	let red = document.getElementById("red");
	let blue = document.getElementById("blue");
	let yellow = document.getElementById("yellow");
	let colors = ["green", "red", "blue", "yellow"];
	let computerOrder = [];
	let playerOrder = [];
	let playerCount = "-";
	let playerClicks = -1;

	function powerSwitch(){
		if (powerButton.innerHTML == "Off") {
			power = "On";
			return powerButton.innerHTML = "On";
		}
		else if (powerButton.innerHTML == "On") {
			power = "Off";
			return powerButton.innerHTML ="Off";
		}
	};

	function strictSwitch(){
		if (strictButton.innerHTML == "Off") {
			return strictButton.innerHTML = "On";
		}
		else if (strictButton.innerHTML == "On") {
			return strictButton.innerHTML ="Off";
		}
	};

	$('#start').on('click', function(){
		if (power == "On") {
			playerOrder = [];
			computerOrder = [];
			playerCount = "-";
			masterTurn("startClicked");
		}
	});

	function masterTurn(turn){
		if (turn == computerTurn) {
		setTimeout( function(){
			turn();
		}, 2000);
		}else if (turn == playerTurn) {
			setTimeout( function(){
				turn();
			}, 0);
		}else if (turn == "startClicked") {
			setTimeout( function(){
				computerTurn();
			}, 500);
		}
	};

	function computerTurn(){
		playerOrder = [];
		playerClicks = -1;
		console.log("now computer turn:");
		computerAdd();
		if (playerCount == "-") {
			playerCount = "1";
			document.getElementById("counter").innerHTML = playerCount;
		}else{
			playerCount = Number(playerCount) + 1;
			document.getElementById("counter").innerHTML = playerCount;
		}
		console.log(computerOrder);
		computerFlash();
	};

	function computerAdd(){
		let random = Math.floor(Math.random() * 4);
		computerOrder.push(colors[random]);
	};

	function computerFlash(){
			let i = 0;   
		    $.each( computerOrder, function(placeInOrder) {    
		        var that = this;
		        var t = setTimeout(function() { 
		            $("#" + that).click();
		            i = i + 1;
		            if (i === computerOrder.length) {
		        	
		        	setTimeout( function(){

		        		console.log("done flashing"); //executes when computer has flashed its last flash.
		        		masterTurn(playerTurn);

		        	}, 1200);

		        }     
		        }, 1200 * placeInOrder);   
		    }) 
	};

	function playerTurn(){
		console.log("playerturn");
			$('#green, #red, #blue, #yellow').on('click.uniform', function() {
				playerOrder.push(this.id);
				playerClicks = playerClicks + 1;
				console.log(playerOrder);
				if (checkOrder(this.id) === true){
					if (playerOrder.length == computerOrder.length) {
						console.log("end of playerTurn");
						$('#green, #red, #blue, #yellow').off('click.uniform');
						masterTurn(computerTurn);
					}
				}else{
					console.log("af");
				}
		})
	};	

	function checkOrder(currentColor){
		if (currentColor === computerOrder[playerClicks]){
			return true;
		}
	};



	let flashTime = 1000; //sets the length of flashes in miliseconds.

	$('#green').on('click', function() {
		$(this).css("background-image", "linear-gradient(70deg, #0cbf00, #99f59c)");
		setTimeout(function flash(){
			$("#green").css("background-image", "linear-gradient(70deg, #21b916, #659e67)");
		}, flashTime);
	});

	$('#red').on('click', function() {
		$(this).css("background-image", "linear-gradient(160deg, red, #ff7878)");
		setTimeout(function flash(){
			$("#red").css("background-image", "linear-gradient(160deg, #c21212, #c55a5a)");
		}, flashTime);
	});

	$('#blue').on('click', function() {
		$(this).css("background-image", "linear-gradient(250deg, #0043ff, #50b7f2)");
		setTimeout(function flash(){
			$("#blue").css("background-image", "linear-gradient(250deg, #2800ff, #7d75c3)");
		}, flashTime);
	});

	$('#yellow').on('click', function() {
		$(this).css("background-image", "linear-gradient(340deg, #ffb716, #fffcaa)");
		setTimeout(function flash(){
			$("#yellow").css("background-image", "linear-gradient(340deg, #be8912, #d5d38c)");
		}, flashTime);
	});