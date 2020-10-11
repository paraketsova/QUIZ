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
    
    let labelnamesRoot = document.createElement('p'); // skapar text för input (för namn)
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

    if (sizeQuizRadio5.checked) {  // поскольку для 5 и 10 вопросов разница лишь в цифре 5/10, упрощаем код для скачивания 5 или 10 вопросов.
      size = '5'; 
    } else {size = '10'; 
    } 
    
    this.questionList = new QuestionList(size);
    this.questionList.load().then((result) => {  //The then() method returns a Promise. It takes an argument: callback function for the success
      this.askCurrentQuestion(); 
    });
  }

  askCurrentQuestion() {     // - для каждого вопроса из QuestionList  item[i]:

    root.innerHTML = '';  // delete name/size block with btn 
    let questionCounter = document.createElement('div'); //создаем строку с номером текущего вопроса
    questionCounter.id = 'questionCounter';
    questionCounter.innerHTML = ((this.currentQuestion + 1) + " / " + this.questionList.size);  // выводим номер вопроса / size
    this.root.appendChild(questionCounter); 
  
    let questText = document.createElement('div'); //создаем поле для вывода текста вопроса
    questText.id = 'questText';
    questText.innerHTML = this.escapeHTML(this.questionList.items[this.currentQuestion].question);  // användar function för att korrekt skildring HTML taggar i text med frågan
    this.root.appendChild(questText); 
  
    let answerList = document.createElement('ul'); //создаем поле для слота ответов
    answerList.id = 'answerList';
    this.root.appendChild(answerList); 
    
    for (let key in this.questionList.items[this.currentQuestion].answers) { // пройтись по всем ответам и вывести только ненулевые
      const element = this.questionList.items[this.currentQuestion].answers[key];
      if (element !== null) {
        let answerTextWrap = document.createElement('li'); //skapar checkbox wrap
        answerList.appendChild(answerTextWrap);
        let answerText = document.createElement('input'); //skapar checkbox för varje svar
        answerText.type = 'checkbox';
        answerText.id = (key);
        answerText.name = ('answer_' + this.currentQuestion);

        let labelAnswerText = document.createElement('label'); //skapar label för checkbox (text med svar)
        labelAnswerText.setAttribute('for', key);
        
        labelAnswerText.innerHTML = this.escapeHTML(element); // användar function för att korrekt skildring HTML taggar i text med svar
        answerTextWrap.appendChild(answerText);
        answerTextWrap.appendChild(labelAnswerText);
      }
    }
   
    let btnNext = document.createElement('button');
    btnNext.innerHTML = 'NEXT';
    btnNext.id = 'btnNext';
    this.root.appendChild(btnNext); 

    btnNext.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      this.savePlayersAnswer(); //отправляем выбранный ответ в массив (ответов на все вопросы квиза)

      if (this.currentQuestion < this.questionList.size - 1) {
        this.currentQuestion++;
        this.askCurrentQuestion();
      } else {
        this.showResults(); //  переход к окну с результатом после последнего вопроса.
      };
    })
  }

  savePlayersAnswer() {      // проверить checked answers и пушнуть в массив (size = кол-во элм в массиве) имя ответа игрока 
    let checkboxList = document.getElementsByName('answer_' + this.currentQuestion);
    let playersAnswer = [];
    for (let i=0; i < checkboxList.length; i++) {
      if (checkboxList[i].checked) {
        playersAnswer.push(checkboxList[i].id);
      }
    }
    this.playersAnswerList.push(playersAnswer); 
  }

  showResults() {
    root.innerHTML = '';  // delete question's block with btn 
    let resultField = document.createElement('div'); //создаем текстовый блок с результатами
    resultField.id = 'resultField';
    this.root.appendChild(resultField);

    let sumPoints = this.getPoints();

    let resultField1 = document.createElement('p'); //создаем строку блока
    let resultField2 = document.createElement('p'); 
    resultField1.innerHTML = ('Good game, ' + this.player.name + '!');
    resultField2.innerHTML = ('You got '+ sumPoints + ' out of ' + this.questionList.size + ' answers correct!');
    resultField.appendChild(resultField1);
    resultField.appendChild(resultField2);

    let btnPlayAgain =  document.createElement('button'); //add button 'Play again' btnNext.type = 'image';
    btnPlayAgain.innerHTML = 'NEW GAME'; 
    btnPlayAgain.id = 'btnPlayAgain';
    this.root.appendChild(btnPlayAgain);
    btnPlayAgain.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      this.reset();
      this.play();
    });
  }

  getPoints() {
    console.log(this.playersAnswerList); // TEST

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

  compareOneAnswer(playersAnswer, correctAnswer) {
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
        // This option is correct, must be in the player's answer
        if (!playersAnswer.includes(option2)) {
          return false;
        }
      } else {
        // This option is incorrect, must not be in the player's answer
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

  escapeHTML(text) {
    return text
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;');
  }
}