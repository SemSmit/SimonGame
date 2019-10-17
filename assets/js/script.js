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

//     -   Hide name input form etc. Then shows name with first letter uppercase and selection between games
let input = document.getElementById("nameInput");
let name;

function submitName() {

    name = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    if (name.length !== 0){
        $(".namesection").hide();
        $(".gamesection").css('display', 'table-cell');
        $(".simon").hide();
        typingEffect();
    }else{
        $("#nameInput").attr("placeholder", "Enter a name!");
    }
};


//     -   Typing effect after name input

let i = 0;
let speed = 180; /* speed in miliseconds */

function typingEffect() {
    if (i < name.length) {
        document.getElementById("name-title").innerHTML += name.charAt(i);
        i++;
        setTimeout(typingEffect, speed);
    }
    setTimeout(function() {
        $('#green, #red, #blue, #yellow').css("height", $('#green').width()); //so colors are always as high as wide
        $(".simon").fadeIn(1700);
    }, name.length * speed + 150)
}


//________________________SIMON GAME_______________________________

let powerButton = document.getElementById("power");
let strictButton = document.getElementById("strict");
let power = "Off";
let strict = "Off";
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

//_______________________


//buttons not clickable on page-load
$(function() {
    $('#green, #red, #blue, #yellow').css("pointer-events", "none");
});



//when clicked on startbutton, (re)starts the game
$('#start').on('click', function() {
    if (power == "On") {
        playerOrder = [];
        computerOrder = [];
        playerCount = "0";
        masterTurn("startClicked");
    }
});




let flashTime = 1000; //sets the length of flashes in miliseconds.

//functions below include the background-image color changes per button.

$('#green').on('click', function() {
    $(this).css("background-image", "linear-gradient(70deg, #0cbf00, #99f59c)");
    audio1.play();
    setTimeout(function flash() {
        $("#green").css("background-image", "linear-gradient(70deg, #21b916, #659e67)");
    }, flashTime);
});

$('#red').on('click', function() {
    $(this).css("background-image", "linear-gradient(160deg, red, #ff7878)");
    audio2.play();
    setTimeout(function flash() {
        $("#red").css("background-image", "linear-gradient(160deg, #c21212, #c55a5a)");
    }, flashTime);
});

$('#blue').on('click', function() {
    $(this).css("background-image", "linear-gradient(250deg, #0043ff, #50b7f2)");
    audio3.play();
    setTimeout(function flash() {
        $("#blue").css("background-image", "linear-gradient(250deg, #2800ff, #7d75c3)");
    }, flashTime);
});

$('#yellow').on('click', function() {
    $(this).css("background-image", "linear-gradient(340deg, #ffb716, #fffcaa)");
    audio4.play();
    setTimeout(function flash() {
        $("#yellow").css("background-image", "linear-gradient(340deg, #be8912, #d5d38c)");
    }, flashTime);
});

//_________________




//Turns the power on when powerbutton is clicked. Everything is turned off when clicked off.
function powerSwitch() {
    if (powerButton.innerHTML == "Off") {
        playerCount = "-";
        power = "On";
        $("#power").addClass("on-button");
        $("body").removeClass("backgroundblack");
        document.getElementById("counter").innerHTML = playerCount;
        powerButton.innerHTML = "On";
    } else if (powerButton.innerHTML == "On") {
        playerCount = "";
        power = "Off";
        strict = "Off";
        $("#strict").removeClass("on-button");
        $("#power").removeClass("on-button");
        $("body").addClass("backgroundblack");
        $('#green, #red, #blue, #yellow').css("pointer-events", "none");
        document.getElementById("counter").innerHTML = playerCount;
        powerButton.innerHTML = "Off";
        strictButton.innerHTML = "Off";
    }
};

//changes strict mode button layout when clicked.
function strictSwitch() {
    if (power == "On") {
        if (strictButton.innerHTML == "Off") {
            strict = "On";
            $("#strict").addClass("on-button");
            strictButton.innerHTML = "On";
        } else if (strictButton.innerHTML == "On") {
            strict = "Off";
            $("#strict").removeClass("on-button");
            strictButton.innerHTML = "Off";
        }
    }
};

//handles turns between computer and player
function masterTurn(turn) {
    if (turn == computerTurn) {
        setTimeout(function() {
            turn();
        }, 2000);
    } else if (turn == playerTurn) {
        setTimeout(function() {
            turn();
        }, 0);
    } else if (turn == "startClicked") {
        setTimeout(function() {
            computerTurn();
        }, 500);
    }
};

//executes computer turn, in which it adds a new color to sequence and flashes the colours
function computerTurn() {
    playerOrder = [];
    playerClicks = -1;
    computerAdd();
    if (playerCount == "-") {
        playerCount = "1";
        document.getElementById("counter").innerHTML = playerCount;
    } else {
        playerCount = Number(playerCount) + 1;
        document.getElementById("counter").innerHTML = playerCount;
    }
    if (power == "On") {
        computerFlash();
    } else {
        document.getElementById("counter").innerHTML = "";
    }
};

//adds a random colour to the computerOrder
function computerAdd() {
    let random = Math.floor(Math.random() * 4);
    computerOrder.push(colors[random]);
};

//iterates between computerOrder and then makes the colours flash
function computerFlash() {
    let i = 0;
    $.each(computerOrder, function(placeInOrder) {
        var that = this;
        var t = setTimeout(function() {
            $('#green, #red, #blue, #yellow').off('click.uniform');
            if (power == "On") {
                $("#" + that).click();
            } else {
                document.getElementById("counter").innerHTML = "";
            }
            i = i + 1;
            if (i === computerOrder.length) {

                setTimeout(function() {

                    //executes when computer has flashed its last flash.
                    if (viaStrict === false) {
                        masterTurn(playerTurn);
                    } else {
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


//players turn. Allows player to click a colour, adds it to playerOrder and checks it.
//also the actions it does depending on if strict is -on- or -off- are written in this function.
function playerTurn() {
    if (power == "On") {
        $('#green, #red, #blue, #yellow').css("pointer-events", "all");
    }
    var currentPlayerOrder = playerOrder;
    $('#green, #red, #blue, #yellow').on('click.uniform', function() {
        playerOrder.push(this.id);
        playerClicks = playerClicks + 1;
        if (checkOrder(this.id, computerOrder[playerClicks])) {
            if (playerOrder.length == computerOrder.length) {
                if (playerOrder.length === 20) { // the value here is the limit of the game; when reached player has won
                    let intervalamount = 0;
                    let intervalID = setInterval(function() {
                        document.getElementById("counter").innerHTML = "<i class='fa fa-star'></i><i class='fa fa-star-o'></i><i class='fa fa-star'></i>";
                        setTimeout(function() {
                            document.getElementById("counter").innerHTML = "<i class='fa fa-star-o'></i><i class='fa fa-star'></i><i class='fa fa-star-o'></i>";
                        }, 300);
                        if (++intervalamount === 5) {
                            window.clearInterval(intervalID);
                        }
                    }, 600);
                    $('#green, #red, #blue, #yellow').css("pointer-events", "none");
                    setTimeout(function() {
                        playerOrder = [];
                        computerOrder = [];
                        playerClicks = -1;
                        var playerCount = "0";
                        document.getElementById("counter").innerHTML = playerCount;
                    }, 3800);
                    return;
                } else {
                    $('#green, #red, #blue, #yellow').css("pointer-events", "none");
                    $('#green, #red, #blue, #yellow').off('click.uniform');
                    masterTurn(computerTurn);
                }
            }
        } else {
            $('#green, #red, #blue, #yellow').css("pointer-events", "none");
            let intervalamount = 0;
            let intervalID = setInterval(function() {
                document.getElementById("counter").innerHTML = "";
                setTimeout(function() {
                    document.getElementById("counter").innerHTML = playerCount;
                }, 200);
                if (++intervalamount === 3) {
                    window.clearInterval(intervalID);
                }
            }, 600);
            if (strict == "On") {
                setTimeout(function() {
                    playerOrder = [];
                    computerOrder = [];
                    playerClicks = -1;
                    playerCount = "0";
                    document.getElementById("counter").innerHTML = playerCount;
                }, 2200);
            } else if (strict == "Off") {
                setTimeout(function() {
                    viaStrict = true;
                    playerOrder = [];
                    playerClicks = -1;
                    computerFlash();
                    return;
                }, 2200);
            }
        }
    })
};

//checks if the color added by the player is the one it should be according to computerOrder.
function checkOrder(currentColor, compColor) {
    if (currentColor === compColor) {
        return true;
    }
    return false;
};