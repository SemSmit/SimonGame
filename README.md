# Simon Game

In this project I tested my interactive front-end skills to build a SIMON game.

In this game the goal is to mimic the actions of the computer by clicking the
same color(s) as the computer, until round 20.
It is pretty challenging, but that's the fun of the game.
 
## UX
 
The game is made for people of every age who're looking to have a fun time playing a nice braintrainer.

- When making the game I focused on making it fun and smooth.
  A smooth and colourful design, with easy interactions and nice sounds.
- The player knows what to do with minimal reading/instructions because of the design.
  With enough testing I made it so that nothing could go wrong when normally playing it.

1. User Story: I am presented with a random series of button presses.
2. User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
3. User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
4. User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
5. User Story: I can see how many steps are in the current series of button presses.
6. User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
7. User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
8. User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.
*my mentor Ignatius_Ukwuoma send me these User Stories*


My wireframe is located in */simon game/wireframes/simongame_wireframe.jpg*


## Features

 
### Existing Features
- Name submit: allows user to input name into form, submit it, and then it will type out 
  at the top of the gamesection. Once completed; the game is visible and ready to play
- Power button: player is able to turn the power of the game on by clicking a power button.
  once clicked: 1. the button will change from "off" to "on" and turn green.
	2. the counter will "turn on" and show a "-".
	3. the background will become lighter to give the user more of a feeling it turned on.
	4. other buttons now become clickable.
- Strict button: once playing the player can choose to play the strict-modus.
  once clicked: 1. the button will change from "off" to "on" and turn green.
  2. when the player makes a mistake during the game, it now will reset completely and the user has to start over.
- Start button: once clicked the game starts
- Overall game: When the game has been turned on the computer clicks a button, it then lights up and gives a sound. Players have to click the same color.
				Then the computer clicks the previous color(s) and the player has to repeat it again. Once done correctly and reached 20, the player has 
				won and a winning message will show up. Player could replay anytime they want.

I also added a function which prevents people from using spaces in the username and limit 
the maximum amount of characters to prevent cross site scripting (XSS).

## Technologies Used

- [HTML5]
	- The project uses **HTML5** to build the structure of the website

- [CSS3]
	- The project uses **CSS3** to style the HTML5/structure of the website.

- [Javascript](https://www.javascript.com/)
	- The project uses **Javascript** to make the project interactive.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Jasmine](https://jasmine.github.io/)
  - The project uses **Jasmine** for automated testing.

- [Google Fonts](https://fonts.google.com/)
	- The project uses **Google Fonts** to use fonts not included in the browser.

- [Bootstrap Fontawesome](https://fontawesome.bootstrapcheatsheets.com/)
	- The project uses **Bootstrap Fontawesome** to use icons for a more pleasant user experience.



## Testing

The most testing was done through building the game for over a month.
Thought of a lot the possible ways to perform unusual actions, like clicking the power button on random moments.
Tested it on multiple devices with various screen sizes/ratio's.
Unfortunately it is not compatible with internet explorer.

But it is on Safari, Chrome, Firefox.

I also did some automated (Jasmine) testing. It can be found in the "testing" directory.

## Deployment

I deployed the site using GitHub. Everything is the same.
The site can be found on: (https://semsmit.github.io/SimonGame/)


## Credits

  Thanks to the slack community of CodeInstitute for helping me out a few times

  And to my mentor Ignatius Ukwuoma for giving me tips through the project

### Media
- The background is obtained from (https://www.freepik.com/)
- The buttonsounds are obtained from (https://www.freecodecamp.org/)

### Acknowledgements

- I received inspiration for this project from the Simon game from Hasbro.
