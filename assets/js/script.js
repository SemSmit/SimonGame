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

	function powerSwitch(){
		if (powerButton.innerHTML == "Off") {
			power = "On";
			powerButton.innerHTML = "On";
		}
		else if (powerButton.innerHTML == "On") {
			power = "Off";
			return powerButton.innerHTML ="Off";
		}
	};

	function strictSwitch(){
		if (strictButton.innerHTML == "Off") {
			strictButton.innerHTML = "On";
		}
		else if (strictButton.innerHTML == "On") {
			return strictButton.innerHTML ="Off";
		}
	};

	function startGame(){
		if (power = "On") {

		}
	}

	function computerAdd(){
		let random = Math.floor(Math.random() * 4);
		computerOrder.push[computerOrder[random]];
	}