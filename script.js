// My Pomofarm - A gamified pomodoro techinique game
//Created by SirNooby 

//Declare key variables
var money = localStorage.getItem("money");
var completed_pomodoros = 0
var siteState = "idle";
var timer_active = false;

//Declare audio files

const timer_completed = new Audio("Contents/Sounds/timeup.wav");
const silence = new Audio("Contents/Sounds/silence.mp3");




//Create money system (save and load)

function money_updater() {
  const bank_display = document.getElementById("bank");
  bank_display.textContent = `Funds: $${money}`;
  money = money ? parseInt(money) : 0;
}


//Create timer system

function pomodoro_timer(time) {

  //Declare HTML Variables to change
  const timer = document.getElementById("timer");
  const timer_count = document.getElementById("timer_count")
  const pomo_count = document.getElementById("pomo_count")
  const overlay = document.getElementById("overlay")
  const overlay_text = document.querySelectorAll(".overlay_text")

  //If the timer button is clicked, start the timer
  timer.addEventListener("click", function () {

    if (timer_active === false) {
      if (completed_pomodoros % 2 === 0) {
        time = 1500
      }
      else if (completed_pomodoros % 8 === 0) {
        time = 900
      }
      else {
        time = 300
      }
      var minutes = Math.floor(time / 60);
      var seconds = time % 60;
      timer_active = true;
      

      console.log("The timer has started");
      
      //Change the proporties of the website
      overlay_text.forEach(overlay_text => {
        overlay_text.style.opacity = "1"
        overlay_text.style.visibility = "visible"
      });

      overlay.style.opacity = "1"
      overlay.style.visibility = "visible"
      overlay.style.pointerEvents = "auto"
      timer_count.style.opacity = "1"
      timer_count.style.visibility = "visible"

      pomo_count.innerHTML = `${"Pomodoro #" + (completed_pomodoros+1 )} - ${"Get Ready to Focus!"}`






      //Queue sound effects

      silence.play()
      
     
      //Start the clock function
      const clock = setInterval(function () {
        
        timer_count.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;  
        document.title = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} - My Pomofarm`;

        // If/Else Statement controlling the timer
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          // Time is up
          clearInterval(clock);
          timer_active = false;
          overlay.style.opacity = "0"
          overlay.style.visibility = "hidden"
          overlay.style.pointerEvents = "none"

          timer_completed.play()
          console.log("The timer has ended");
          completed_pomodoros = completed_pomodoros + 1
          console.log(completed_pomodoros)
        }
      }, 1000);

    }
  });
}

      


































































// Hardcoded 10x10 grid data using numbers
const gridData = `
6, 6, 6, 6, 6, 6, 6, 6, 6, 6
2, 2, 2, 2, 2, 2, 2, 2, 2, 2
2, 2, 2, 2, 2, 2, 2, 2, 2, 2
2, 2, 2, 2, 2, 2, 2, 2, 2, 2
2, 2, 2, 2, 2, 2, 2, 2, 2, 2
2, 2, 2, 2, 2, 2, 2, 2, 2, 2
7, 7, 7, 7, 7, 7, 7, 7, 7, 7
3, 6, 6, 6, 6, 6, 6, 6, 6, 8
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
4, 0, 0, 0, 0, 0, 0, 0, 0, 9
5, 7, 7, 7, 7, 7, 7, 7, 7, 10
`;




// Function to generate the map
function grid_generator(gridID, grid_data) {
  const grid = document.getElementById(gridID);
  const rows = grid_data.trim().split("\n"); // Trim to remove extra whitespace

  rows.forEach((row, row_index) => {
    const tiles = row.split(",");
    tiles.forEach((tile_type, col_index) => {
      const tile = document.createElement("div");
      tile.classList.add("tile");

      // Assign tile classes based on the number

      //Functional Tiles
        if (tile_type.trim() === '0') {
        tile.classList.add("farm_tile");
      } else if (tile_type.trim() === "2") {
        tile.classList.add("path");
        
      //All Grass Tiles
      } else if (tile_type.trim() === "3") {
        tile.classList.add("grass_topleft");
      } else if (tile_type.trim() === "4") {
        tile.classList.add("grass_middleleft");
      } else if (tile_type.trim() === "5") {
        tile.classList.add("grass_bottomleft");
      } else if (tile_type.trim() === "6") {
        tile.classList.add("grass_topcenter");
      } else if (tile_type.trim() === "7") {
        tile.classList.add("grass_bottomcenter");
      } else if (tile_type.trim() === "8") {
        tile.classList.add("grass_topright");
      } else if (tile_type.trim() === "9") {
        tile.classList.add("grass_middleright");
      } else if (tile_type.trim() === "10") {
        tile.classList.add("grass_bottomright");
      }


      // Detect tile clicks
      tile.addEventListener("click", () => {
        console.log(`Tile clicked in ${gridID}: Row ${row_index + 1}, Column ${col_index + 1}, Tile: ${tile.classList}`);
        if (tile.classList.contains("farm_tile")) {
          console.log("ITS GARSS")
          tile.classList.add("planted")
          money += 10;
          localStorage.setItem("money", money);
          tile.classList.remove("farm_tile")
        }
        money_updater();
      });

      grid.appendChild(tile);
    });
  });
}



// Generate three 10x10 grids using the hardcoded data
grid_generator('farm1', gridData);
grid_generator('farm2', gridData);
grid_generator('farm3', gridData);


// Update cash display
money_updater();

pomodoro_timer(10);

