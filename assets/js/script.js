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