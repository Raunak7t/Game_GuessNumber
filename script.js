const btn = document.querySelector("#clickbtn");
const lowercontent = document.querySelector(".lowercontent");
const container = document.querySelector(".container");

btn.addEventListener("click", () => {
  // container.style.height = "90vh";
  lowercontent.style.display = "flex";
});

/* main game code */

let randomnumber = parseInt(Math.random() * 100 + 1);
// console.log(randomnumber);

const submitbtn = document.querySelector("#submitbtn");
const userinput = document.querySelector("#userinput");
const guessslot = document.querySelector("#previousguess");
const guessremaining = document.querySelector("#guessremaining");
const lowhi = document.querySelector("#lowhigh");
const startover = document.querySelector(".resultparas");


let playgame = true;
let previousguesses = [];
let remaininguess = 0;

let p = document.createElement("p");

if (playgame == true) {
  submitbtn.addEventListener("click", function (e) {
    e.preventDefault();
    const userguess = parseInt(userinput.value);
    validateguess(userguess);
  });
}

function validateguess(userguess) {
  if (isNaN(userguess)) {
    alert("plz enter a valid number");
  } else if (userguess < 1) {
    alert("plz enter a number greater than 1");
  } else if (userguess > 100) {
    alert("plz enter a number smaller than 100 ");
  } else {
    previousguesses.push(userguess);
    if (remaininguess === 6) {
      displayguess(userguess);
      displaymsg(`Game Over  Random number was  ${randomnumber}`);
      endgame();
    } else {
      displayguess(userguess);
      checkguess(userguess);
    }
  }
}

function checkguess(userguess) {
  if (userguess === randomnumber) {
    displaymsg(`you guessed it right`);
    endgame();
  } else if (userguess > randomnumber) {
    displaymsg(`Number is Too High`);
  } else if (userguess < randomnumber) {
    displaymsg(`Number is Too Low`);
  }
}

function displayguess(userguess) {
  userinput.value = "";
  guessslot.innerHTML += `${userguess},  `;
  guessslot.style.backgroundColor = '#000';
  guessslot.style.padding = '5px'
  guessslot.style.border_radius = '10px';
  remaininguess++;
  guessremaining.innerHTML = `${6 - remaininguess}`;
  guessremaining.style.backgroundColor = '#000';
  guessremaining.style.padding = '5px'
  guessremaining.style.border_radius = '10px';
}

function displaymsg(message) {
  lowhi.innerHTML = `<h2>${message}</h2>`;
}

function endgame() {
  userinput.value = "";
  userinput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = '<h3 id="startoverbtn">Restart</h3>';
  startover.appendChild(p);
  playgame = false;
  newgame();
}

function newgame() {
  const startoverbtn = document.querySelector("#startoverbtn");
  startoverbtn.addEventListener("click", () => {
    randomnumber = parseInt(Math.random() * 100 + 1);
    userinput.removeAttribute("disabled");
    previousguesses = [];
    guessslot.innerHTML = "";
    guessremaining.innerHTML = `${6 - remaininguess}`;
    startover.removeChild(p);
    lowhi.innerHTML = "";
    playgame = true;
  });
}
