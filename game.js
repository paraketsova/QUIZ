class Game {
  constructor(){
    this.player = null;
    this.questionList = null;
    this.currentQuestion = 0;
    this.playersAnswerList = [];  // [[0],[1]..] array.length = size.


    this.root = document.getElementById('root'); //Eftersom vi anävnder den constanta i flera metoder, kan vi skapa det som egenskap för den klass.
  }

  start (event) {
    const btnPlay = document.createElement('button'); //skapar button som element 
    btnPlay.id = 'btnPlay';
    btnPlay.innerHTML = 'PLAY NOW'; 
    btnPlay.addEventListener('click', (event) => { // vi använder lambda function och då kan vi hänvisa ('this') till yttre område, därför att Lambda function har inte 'this' egenskap.
      this.play();
    });
    this.root.appendChild(btnPlay); // addera knapp i div root
  }

  play() { //om spelet början skapar vi fält för att fråga namn och hur många frågor i Quiz måste vi skapa

    this.root.innerHTML = ''; //  då root är tom
    
    let labelnamesRoot = document.createElement('p'); // skapar fält text för input (spelarens namn)
    labelnamesRoot.innerText = ("Player's name:");
    this.root.appendChild(labelnamesRoot); 

    let namesRoot = document.createElement('input'); // skapar input (för namn)
    this.root.appendChild(namesRoot);
    namesRoot.id = 'name';


    let labelSizeQuizRoot = document.createElement('p'); // skapar text för input (hur många frågor)
    labelSizeQuizRoot.innerText = ("Please choose number of questions:");
    this.root.appendChild(labelSizeQuizRoot); 

    let divSizeQuiz = document.createElement('div'); //skapar input för radiobutton
    divSizeQuiz.id = 'divSizeQuiz';
    this.root.appendChild(divSizeQuiz);
 
    let sizeQuizRadio5 = document.createElement('input'); //skapar input för att väljer 5 frågor 
    divSizeQuiz.appendChild(sizeQuizRadio5);
    sizeQuizRadio5.type = 'radio';
    sizeQuizRadio5.name = 'sizeQuizRadio'; // skapar en namn för båda radiobutton 
    sizeQuizRadio5.id = 'radio5';
    sizeQuizRadio5.value = 'radio5';
    sizeQuizRadio5.checked = true; // skapar default 'checked' position

    let labelRadio5 = document.createElement('label'); //  skapar label till input för att väljer 5 frågor 
    labelRadio5.setAttribute('for', 'radio5');
    labelRadio5.innerText = '5';
    divSizeQuiz.appendChild(labelRadio5);

    let sizeQuizRadio10 = document.createElement('input'); //skapar input för att väljer 10 frågor
    divSizeQuiz.appendChild(sizeQuizRadio10);
    sizeQuizRadio10.type = 'radio';
    sizeQuizRadio10.name = 'sizeQuizRadio';  // *skapar en namn för båda radiobutton 
    sizeQuizRadio10.id = 'radio10';
    sizeQuizRadio10.value = 'radio10';

    let labelRadio10 = document.createElement('label'); // skapar label till input för att väljer 10 frågor  
    labelRadio10.setAttribute('for', 'radio10');
    labelRadio10.innerText = '10';
    divSizeQuiz.appendChild(labelRadio10);

    let btnAskQ = document.createElement('button'); //skapar button GO som element 
    btnAskQ.innerHTML = 'GO';
    btnAskQ.id = 'btnAskQ';

    this.root.appendChild(btnAskQ);
    btnAskQ.addEventListener('click', (event) => { // vi använder lambda function och då kan vi hänvisa ('this') till yttre område, därför att Lambda function har inte 'this' egenskap.
      this.askNameSize();
    })
  }

  askNameSize () {
    let nameInput = document.getElementById('name');
    this.player = new Player(nameInput.value);

    let sizeQuizRadio5 = document.getElementById('radio5');

    let size = 0;

    if (sizeQuizRadio5.checked) {  // vi tilldellar size värde 5 eller 10 beror på mängd frågor som använder vhar valt.
      size = '5'; 
    } else {size = '10'; 
    } 
    
    this.questionList = new QuestionList(size);
    this.questionList.load().then((result) => {  //The then() method returns a Promise. It takes an argument: callback function for the success
      this.askCurrentQuestion(); 
    });
  }

  askCurrentQuestion() {     // - för varje question QuestionList  item[i]:

    root.innerHTML = '';  // tar borta name/size block med btn GO
    let questionCounter = document.createElement('div'); // skapar fält med nummer current question
    questionCounter.id = 'questionCounter';
    questionCounter.innerHTML = ((this.currentQuestion + 1) + " / " + this.questionList.size);  // skriver nummer current question and size för den Quis
    this.root.appendChild(questionCounter); 
  
    let questText = document.createElement('div'); // skapar fält för text med fråga
    questText.id = 'questText';
    questText.innerHTML = this.escapeHTML(this.questionList.items[this.currentQuestion].question);  // användar metod escapeHTML (function för att korrekt skildring HTML taggar i text med frågan
    this.root.appendChild(questText); 
  
    let answerList = document.createElement('ul'); //skapar fält för svarens wrap
    answerList.id = 'answerList';
    this.root.appendChild(answerList); 
    
    for (let key in this.questionList.items[this.currentQuestion].answers) { //  for... in   = går genom svaren för att skriva bara svar med ngn text (utan tomma svaren)
      const element = this.questionList.items[this.currentQuestion].answers[key];
      if (element !== null) {
        let answerTextWrap = document.createElement('li'); //skapar checkbox wrap
        answerList.appendChild(answerTextWrap);
        let answerText = document.createElement('input'); //skapar checkbox för varje svar
        answerText.type = 'checkbox';
        answerText.id = (key);
        answerText.name = ('answer_' + this.currentQuestion);

        let labelAnswerText = document.createElement('label'); //skapar label för checkbox (text med svar)
        labelAnswerText.setAttribute('for', key); // labelAnswerText
        
        labelAnswerText.innerHTML = this.escapeHTML(element); // användar function för att korrekt skildring HTML taggar i text med svar
        answerTextWrap.appendChild(answerText);
        answerTextWrap.appendChild(labelAnswerText);
      }
    }
   
    let btnNext = document.createElement('button'); 
    btnNext.innerHTML = 'NEXT';
    btnNext.id = 'btnNext';
    this.root.appendChild(btnNext); 

    btnNext.addEventListener('click', (event) => { 
      this.savePlayersAnswer(); // anropar metoden  savePlayersAnswer()    отправляем выбранный ответ в массив (ответов на все вопросы квиза)

      if (this.currentQuestion < this.questionList.size - 1) {
        this.currentQuestion++; //späder på this.currentQuestion
        this.askCurrentQuestion(); //anropar _den_ metoden igen
      } else {
        this.showResults(); //  om det är sista frågan , anropar vi metodet showResult
      };
    })
  }

  savePlayersAnswer() {      // pushar checked answers i playersAnswer[] och den i i this.playersAnswerList[]
    let checkboxList = document.getElementsByName('answer_' + this.currentQuestion); //skapar HTML collection 
    let playersAnswer = [];  // vi skapar tomt array för playersAnswer 
    for (let i=0; i < checkboxList.length; i++) {
      if (checkboxList[i].checked) {
        playersAnswer.push(checkboxList[i].id); //push den checkbox id i array playersAnswer
      }
    }
    this.playersAnswerList.push(playersAnswer); //pushar varje playersAnswer[] i this.playersAnswerList[]
  }

  showResults() {   //fick och visar poäng, restart game
    root.innerHTML = '';  // ta borta question's block med btn 
    let resultField = document.createElement('div'); // skapar fält för result
    resultField.id = 'resultField';
    this.root.appendChild(resultField);

    let sumPoints = this.getPoints(); // skapar en variabel sumPoints. Hit returnerar vi värde from metoden this.getPoints() ---186

    let resultField1 = document.createElement('p'); //skapar paragraf för sträng med resultaten
    let resultField2 = document.createElement('p'); 
    resultField1.innerHTML = ('Good game, ' + this.player.name + '!');
    resultField2.innerHTML = ('You got '+ sumPoints + ' out of ' + this.questionList.size + ' answers correct!');
    resultField.appendChild(resultField1);
    resultField.appendChild(resultField2);

    let btnPlayAgain =  document.createElement('button'); //add button 'Play again' btnNext.type = 'image';
    btnPlayAgain.innerHTML = 'NEW GAME'; 
    btnPlayAgain.id = 'btnPlayAgain';
    this.root.appendChild(btnPlayAgain);
    btnPlayAgain.addEventListener('click', (event) => { 
      this.reset();
      this.play();
    });
  }

  getPoints() {  // beräknar poäng   (sumPoints, som vi returnerar i showrResult )
    console.log(this.playersAnswerList); // TEST provar titta på this.playersAnswerList (för debugging)

    const sumPoints = this.playersAnswerList.reduce(
      (points, playersAnswer, i) => {
        const isCorrect = this.compareOneAnswer(
          playersAnswer,
          this.questionList.items[i].correct_answers
        );

        if (isCorrect) {
          return points + 1;
        }

        return points;
      },
      0
    );

    return sumPoints;
  }

  compareOneAnswer(playersAnswer, correctAnswer) { // jämför spelarens svaren med korrekt svaren 
    /* Example:
      
      playersAnswer = [
        'answer_b', 
        'answer_c'
      ]
      
      correctAnswer = {
        answer_a_correct: "false", 
        answer_b_correct: "true", 
        answer_c_correct: "true", 
        answer_d_correct: "false"
      }
    */

    for (let option in correctAnswer) {
      const option2 = option.slice(0, -8); // 'answer_c_correct' -> 'answer_c'
      
      // Example: option = 'answer_c_correct'
      // Example: option2 = 'answer_c'
      
      if (correctAnswer[option] === 'true') {
        // den option är korrect, och måste finns i spelarens svaren
        if (!playersAnswer.includes(option2)) { //method determines whether an array includes a certain element, returning true or false as appropriate.
          return false;
        }
      } else {
        // den option är inte korrect, och den ska bli finns i spelarens svaren
        if (playersAnswer.includes(option2)) {
          return false;
        }
      }
    } 
    
    return true;
  }

  reset() {
    this.player = null;
    this.questionList = null;
    this.currentQuestion = 0;
    this.playersAnswerList = []; 
  }

  escapeHTML(text) {  //det är function för att korrekt skildring HTML taggar i text med frågan
    return text
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;');
  }
}
