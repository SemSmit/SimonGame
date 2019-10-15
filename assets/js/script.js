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
		$(".gamesection").css('display', 'table-cell');
		$(".simon").hide();
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
	  setTimeout(function(){
	  	$(".simon").slideDown('slow');
	  }, name.length * speed + 150)
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
	const audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	const audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	const audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	const audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

	function powerSwitch(){
		if (powerButton.innerHTML == "Off") {
			playerCount = "-";
			power = "On";
			$("#power").addClass("on-button");
			document.getElementById("counter").innerHTML = playerCount;
			return powerButton.innerHTML = "On";
		}
		else if (powerButton.innerHTML == "On") {
			playerCount = "";
			power = "Off";
			$("#power").removeClass("on-button");
			document.getElementById("counter").innerHTML = playerCount;
			return powerButton.innerHTML ="Off";
		}
	};

	function strictSwitch(){
		if (strictButton.innerHTML == "Off") {
			strict = "On";
			$("#strict").addClass("on-button");
			return strictButton.innerHTML = "On";
		}
		else if (strictButton.innerHTML == "On") {
			strict = "Off";
			$("#strict").removeClass("on-button");
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

		        	//executes when computer has flashed its last flash.
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
			$('#green, #red, #blue, #yellow').on('click.uniform', function() {
				playerOrder.push(this.id);
				playerClicks = playerClicks + 1;
				console.log(playerOrder);
				if (checkOrder(this.id) === true){
					if (playerOrder.length == computerOrder.length) {
						if (playerOrder.length === 3) { // the value here is the limit of the game; when reached player has won
						let intervalamount = 0;
						let intervalID = setInterval(function () {
						   document.getElementById("counter").innerHTML = "<i class='fa fa-star'></i><i class='fa fa-star-o'></i><i class='fa fa-star'></i>";
						   setTimeout( function(){
						   		document.getElementById("counter").innerHTML = "<i class='fa fa-star-o'></i><i class='fa fa-star'></i><i class='fa fa-star-o'></i>";
						   },300);
						   if (++intervalamount === 5) {
						       	window.clearInterval(intervalID);
							   }	
						}, 600);
						setTimeout( function(){
							playerOrder = [];
							computerOrder = [];
							playerClicks = -1;
							var playerCount = "0";
						   	document.getElementById("counter").innerHTML = playerCount;
						}, 3800);
						}else{
						$('#green, #red, #blue, #yellow').css("pointer-events", "none");
						$('#green, #red, #blue, #yellow').off('click.uniform');
						masterTurn(computerTurn);
						}
					}
				}else{
					$('#green, #red, #blue, #yellow').css("pointer-events", "none");
						let intervalamount = 0;
						let intervalID = setInterval(function () {
						   document.getElementById("counter").innerHTML = "";
						   setTimeout( function(){
						   		document.getElementById("counter").innerHTML = playerCount;
						   },200);
						   if (++intervalamount === 3) {
						       window.clearInterval(intervalID);
						   }
						}, 600);
					if (strict == "On") {
						console.log("testo");
						setTimeout( function(){
						playerOrder = [];
						computerOrder = [];
						playerClicks = -1;
						playerCount = "0";
						document.getElementById("counter").innerHTML = playerCount;
						return;}, 2200);
					}else if (strict == "Off") {
						
						setTimeout( function(){
						viaStrict = true;
						playerOrder = [];
						playerClicks = -1;
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
		audio1.play();
		setTimeout(function flash(){
			$("#green").css("background-image", "linear-gradient(70deg, #21b916, #659e67)");
		}, flashTime);
	});

	$('#red').on('click', function() {
		$(this).css("background-image", "linear-gradient(160deg, red, #ff7878)");
		audio2.play();
		setTimeout(function flash(){
			$("#red").css("background-image", "linear-gradient(160deg, #c21212, #c55a5a)");
		}, flashTime);
	});

	$('#blue').on('click', function() {
		$(this).css("background-image", "linear-gradient(250deg, #0043ff, #50b7f2)");
		audio3.play();
		setTimeout(function flash(){
			$("#blue").css("background-image", "linear-gradient(250deg, #2800ff, #7d75c3)");
		}, flashTime);
	});

	$('#yellow').on('click', function() {
		$(this).css("background-image", "linear-gradient(340deg, #ffb716, #fffcaa)");
		audio4.play();
		setTimeout(function flash(){
			$("#yellow").css("background-image", "linear-gradient(340deg, #be8912, #d5d38c)");
		}, flashTime);
	});
