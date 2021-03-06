window.addEventListener("load", main);

function main() {
  /* ------------------------------------------------------------------- */
  /*                      Function to add floating navbar                */
  /* ------------------------------------------------------------------- */
  window.addEventListener('scroll', function(){setFloat()});
  var navbar = document.getElementById('navbar');
  // var navimg = document.getElementById('navImg');
  var header = document.getElementById('header');
  var offset = navbar.offsetTop;
  function setFloat(){
    if (window.pageYOffset>=offset){
      navbar.classList.add('sticky');
      // navimg.classList.add('sticky');
      header.style.marginBottom='5vw';
    }
    else{
      navbar.classList.remove('sticky');
      // navimg.classList.remove('sticky');
      header.style.marginBottom='20px';
    }
  }


  /* ---------------------------------------------------------------------------------- */
  /*                                Initilizing Variables                               */
  /* ---------------------------------------------------------------------------------- */
  var answerValues = [ // master array for JS
    /*Q0*/[[3],[2],[1],[0]],
    /*Q1*/[[0],[1,2],[3]],
    /*Q2*/[[0],[1,2],[3]],
    /*Q3*/[[2],[1],[0],[3]],
    /*Q4*/[[2,3],[1],[0]],
    /*Q5*/[[2,3],[1],[0]],
    /*Q6*/[[2,3],[1],[0]],
    /*Q7*/[[2,3],[1],[0]],
    /*Q8*/[[0],[1],[2,3]],
    /*Q9*/[[2,3],[1],[0]],
    /*Q10*/[[0],[1],[2,3]],
    /*Q11*/[[0],[1],[2,3]],
    /*Q12*/[[3,2,1],[0]],
    /*Q13*/[[3],[0],[1,2]],
    /*Q14*/[[3],[0],[1,2]]
  ];

  /* ------------------------------------ Levels ---------------------------------------- */
  var levels = ['Amateur', 'Proficient', 'Expert', 'Environmentalist'];
  /*               0         1             2               3        */
  var levelCounts = new Array(levels.length).fill(0);

  /* ------------------------------ Question information ------------------------------ */
  //This creates an array of the number of answer choices in each question for later loops
  var arrayOfAnsChoices = new Array(answerValues.length);
  for (i=0;i<answerValues.length;i++){
    arrayOfAnsChoices[i]=answerValues[i].length;
  };
  //This sets the maximum number of answer choices for later loops initilizing variables
  var maxNumOfAnsChoices = Math.max(...arrayOfAnsChoices);

  /* ------------------------------ Initilizing Buttons for page ------------------------------ */
  // This creates an array with length of the number of questions
  var a = new Array(answerValues.length);
  // creates arrays within the array with length of maximum number of answer choices
  for (i=0;i<a.length;i++){
    a[i] = new Array(arrayOfAnsChoices[i]);
  };
  // assigns each id to each location in the array
  for (i=0;i<answerValues.length;i++){
    for (j=0;j<=arrayOfAnsChoices[i];j++){
      a[i][j] = document.getElementById(`q${i}a${j}`);
    };
  };
  /* ------------------------------ Initilizing dots for page ------------------------------ */
  // This creates an array with length of the number of questions
  var dots = new Array(answerValues.length);
  // creates arrays within the array with length of maximum number of answer choices
  for (i=0;i<dots.length;i++){
    dots[i] = new Array(arrayOfAnsChoices[i]);
  };
  // assigns each id to each location in the array
  for (i=0;i<answerValues.length;i++){
    for (j=0;j<arrayOfAnsChoices[i];j++){
      dots[i][j] = document.getElementById(`q${i}a${j}rad`);
    };
  };


  /* -------------------------------------------------------------------------------------------- */
  /*                                Event Listeners for all buttons                               */
  /* -------------------------------------------------------------------------------------------- */
  // Funtion to add an event listener to the question and answer passed in
  function add(question, answer){
    a[question][answer].addEventListener('click', function(){
      select(question,answer);
    });
  };
  // Loop that adds an event listener to each question and answer
  for (i=0;i<answerValues.length;i++){
    for (j=0;j<arrayOfAnsChoices[i];j++){
      add(i,j);
    };
  };

  /* ------------------------------------------------------------------------------------------------- */
  /*                      Function to visually select user answer choice                               */
  /* ------------------------------------------------------------------------------------------------- */
  // Function that intakes the question number and answer number to highlight the correct answer and choose the button
  function select(question, answer){
    a[question][answer].classList.add('selected');
    console.log({question, answer})
    dots[question][answer] = true;
    for (i=0;i<arrayOfAnsChoices[question];i++){
      if (i!=answer){
        a[question][i].classList.remove('selected');
      };
    };
  };

  /* ----------------------------------------------------------------------------------- */
  /*                      Function to score answer choices and alert user                */
  /* ----------------------------------------------------------------------------------- */
  // Adds a listener for the calculate results button
  document.getElementById('calcResults').addEventListener('click', function(){
    calcResults();
  });

  // Creates a function to loop through every answer on the page, check if the radio input is checked, and add one point to each hall that is chosen
  function calcResults(){
    console.log("blahblah")
    var numChecked = 0;
    console.log("dots checking")
    console.table(dots)
    for (i=0;i<answerValues.length;i++){
      for (j=0;j<arrayOfAnsChoices[i];j++){
        if (dots[i][j]){
          numChecked++;
          for (k=0;k<answerValues[i][j].length;k++){
            levelCounts[answerValues[i][j][k]]++;
          };
        };
      };
    };
    // checks to see if the user has answered all questions
    if (numChecked!=answerValues.length){
      swal("You haven't answered all of the questions!",'');
      var negAudio = new Audio('audio/computerErrorAlert.mp3');
      var posAudio = new Audio(' ');

      posAudio.play();
      negAudio.currentTime=0
      negAudio.play();
      negAudio.currentTime=0;
    }
    else{
      var audio = new Audio('audio/cartoon_success_fanfair.mp3');
      audio.play();
      var dif_levels = levels.slice(0,3);
      /*var ama_level = levels.find(0);
      var pro_level = levels.find(1);
      var exp_level = levels.find(2);
      var env_level = levels.find(3);*/
      var levelScores = levelCounts.slice(0,3);
      var maxLevel = Math.max(...levelScores);
      var levelMatch = new Array();
      for (i=0;i<levelScores.length;i++){
        if (levelScores[i]==maxLevel){
          levelMatch.push(dif_levels[i]);
        };
      };

      swal(`You are a:`, ` ${levelMatch.join(', ')} \r\n Look at the page called | Tips and Other Recommendations | to find tips on how to become more sustainable based on your current lifestyle.`);
    };
  };
};
