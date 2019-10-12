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
	let strict = "Off";
	let start = document.getElementById("start");
	let green = document.getElementById("green");
	let red = document.getElementById("red");
	let blue = document.getElementById("blue");
	let yellow = document.getElementById("yellow");
	let colors = ["green", "red", "blue", "yellow"];
	let computerOrder = [];
	let playerOrder = [];
	let playerCount = "";
	let playerClicks = -1;
	let viaStrict = false;

	function powerSwitch(){
		if (powerButton.innerHTML == "Off") {
			playerCount = "-";
			power = "On";
			document.getElementById("counter").innerHTML = playerCount;
			return powerButton.innerHTML = "On";
		}
		else if (powerButton.innerHTML == "On") {
			playerCount = "";
			power = "Off";
			document.getElementById("counter").innerHTML = playerCount;
			return powerButton.innerHTML ="Off";
		}
	};

	function strictSwitch(){
		if (strictButton.innerHTML == "Off") {
			strict = "On";
			return strictButton.innerHTML = "On";
		}
		else if (strictButton.innerHTML == "On") {
			strict = "Off";
			return strictButton.innerHTML = "Off";
		}
	};

	$('#start').on('click', function(){
		if (power == "On") {
			playerOrder = [];
			computerOrder = [];
			playerCount = "0";
			masterTurn("startClicked");
		}
	});

	$(function() {
		$('#green, #red, #blue, #yellow').css("pointer-events", "none");
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
		        	$('#green, #red, #blue, #yellow').off('click.uniform');
		            $("#" + that).click();
		            i = i + 1;
		            if (i === computerOrder.length) {
		        	
		        	setTimeout( function(){

		        		console.log("done flashing, viastrict =" + viaStrict); //executes when computer has flashed its last flash.
		        		if (viaStrict === false) {
		        			masterTurn(playerTurn);
		        		}else{
		        			$('#green, #red, #blue, #yellow').css("pointer-events", "all");
		        			$('#green, #red, #blue, #yellow').on('click.uniform');
		        			viaStrict = false;
		        			playerTurn();
		        		}

		        	}, 1200);

		        }     
		        }, 1200 * placeInOrder);   
		    }) 
	};

	function playerTurn(){
		$('#green, #red, #blue, #yellow').css("pointer-events", "all");
		var currentPlayerOrder = playerOrder;
		console.log("playerturn");
		console.log("PlayerOrder =" + playerOrder + ". ComputerOrder =" + computerOrder + ". playerClicks =" + playerClicks);
			$('#green, #red, #blue, #yellow').on('click.uniform', function() {
				playerOrder.push(this.id);
				playerClicks = playerClicks + 1;
				console.log(playerOrder);
				if (checkOrder(this.id) === true){
					if (playerOrder.length == computerOrder.length) {
						$('#green, #red, #blue, #yellow').css("pointer-events", "none");
						console.log("end of playerTurn");
						$('#green, #red, #blue, #yellow').off('click.uniform');
						masterTurn(computerTurn);
					}
				}else{
					console.log("strict = " + strict);
					$('#green, #red, #blue, #yellow').css("pointer-events", "none");
						var intervalamount = 0;
						var intervalID = setInterval(function () {
						   document.getElementById("counter").innerHTML = "<i class='fa fa-times-circle'></i>";
						   setTimeout( function(){
						   		document.getElementById("counter").innerHTML = playerCount;
						   },450);
						   if (++intervalamount === 3) {
						       window.clearInterval(intervalID);
						   }
						}, 600);
					if (strict == "On") {
						setTimeout( function(){
						playerOrder = [];
						computerOrder = [];
						playerClicks = -1;
						playerCount = "0";
						return;}, 2200);
					}else if (strict == "Off") {
						
						setTimeout( function(){
						viaStrict = true;
						console.log("wrong2");
						playerOrder = [];
						console.log("haha playerorder " + playerOrder);
						playerClicks = -1;
						console.log("playerorder after strictoff " + playerOrder);
						computerFlash();
						return;}, 2200);
					}	
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
