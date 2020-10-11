class Game {
  constructor(){
    this.player = null;
    this.questionList = null;
    this.currentQuestion = 0;
    this.playersAnswerList = [];  // [[0],[1]..] array.length = size.


    this.root = document.getElementById('root'); //так как используем в неск ф, то выносим её наверх и вместо константы она становится проперти данного класса.
  }

  start (event) {
    const btnPlay = document.createElement('button'); //создаем кнопку как элемент 

    btnPlay.innerHTML = 'Play now!'; 
    btnPlay.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      this.play();
    });
    this.root.appendChild(btnPlay); // добавляем кнопку как потомка в див root
  }

  play() { //игрок запустил игру, мы выводим диал окно с запросом имени и кол-ва вопросов квиза
    this.root.innerHTML = ''; //удаляем кнопку play now, теперь root пуст
    
    let labelnamesRoot = document.createElement('p'); //создаем текст к input для ввода имени 
    labelnamesRoot.innerText = ("Player's name:");
    this.root.appendChild(labelnamesRoot); 

    let namesRoot = document.createElement('input'); //создаем input для ввода имени 
    this.root.appendChild(namesRoot);
    namesRoot.id = 'name';


    let labelSizeQuizRoot = document.createElement('p'); //создаем текст к input для определения кол-ва вопросов
    labelSizeQuizRoot.innerText = ("Please choose number of questions:");
    this.root.appendChild(labelSizeQuizRoot); 

    let divSizeQuiz = document.createElement('div'); //создаем input для радиокнопок
    this.root.appendChild(divSizeQuiz); 



    let sizeQuizRadio5 = document.createElement('input'); //создаем input для выбора 5 вопросов 
    divSizeQuiz.appendChild(sizeQuizRadio5);
    sizeQuizRadio5.type = 'radio';
    sizeQuizRadio5.name = 'sizeQuizRadio'; // задаём обеим кнопкам одно имя, чтобы (или)
    sizeQuizRadio5.id = 'radio5';
    sizeQuizRadio5.value = 'radio5';

    let labelRadio5 = document.createElement('label'); //создаем лейбл к input для выбора 5 вопросов 
    labelRadio5.for = 'radio5';
    labelRadio5.innerText = '5';
    divSizeQuiz.appendChild(labelRadio5);

   let sizeQuizRadio10 = document.createElement('input'); //создаем input для выбора 10 вопросов 
    divSizeQuiz.appendChild(sizeQuizRadio10);
    sizeQuizRadio10.type = 'radio';
    sizeQuizRadio10.name = 'sizeQuizRadio';  // задаём обеим кнопкам одно имя, чтобы (или)
    sizeQuizRadio10.id = 'radio10';
    sizeQuizRadio10.value = 'radio10';

    let labelRadio10 = document.createElement('label'); //создаем лейбл к input для выбора 10 вопросов 
    labelRadio10.for = 'radio10';
    labelRadio10.innerText = '10';
    divSizeQuiz.appendChild(labelRadio10);

    let btnAskQ = document.createElement('button'); //создаем кнопку GO как элемент 
    btnAskQ.innerHTML = 'Go!'; 
    this.root.appendChild(btnAskQ);
    btnAskQ.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      this.askNameSize();
    })
  }

  askNameSize () {
    let nameInput = document.getElementById('name');
    this.player = new Player(nameInput.value);
    console.log(this.player.name); ////    TEST


    let sizeQuizRadio5 = document.getElementById('radio5');
    let size = 0;

    if (sizeQuizRadio5.checked) {  // поскольку для 5 и 10 вопросов разница лишь в цифре 5/10, упрощаем код для скачивания 5 или 10 вопросов.
      size = '5'; 
    } 
    else {size = '10'; 
    } 
    
    this.questionList = new QuestionList(size);
    this.questionList.load().then((result) => {
      this.askCurrentQuestion(); 
      console.log(this.questionList); //TEST
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
    questText.innerHTML = this.questionList.items[this.currentQuestion].question;  
    this.root.appendChild(questText); 
  
    let answerList = document.createElement('ul'); //создаем поле для слота ответов
    answerList.id = 'answerList';
    this.root.appendChild(answerList); 
    
    for (let key in this.questionList.items[this.currentQuestion].answers) { // пройтись по всем ответам и вывести только ненулевые
      const element = this.questionList.items[this.currentQuestion].answers[key];
      if (element !== null) {
        let answerTextWrap = document.createElement('li'); //создаем поле для checkbox каждого ответа
        answerList.appendChild(answerTextWrap);
        let answerText = document.createElement('input'); //создаем checkbox для текста каждого ответа
        answerText.type = 'checkbox';
        answerText.id = (key);
        answerText.name = ('answer_' + this.currentQuestion);

        let labelAnswerText = document.createElement('label'); //создаем лейбл к checkbox для answer text
        labelAnswerText.for = ('answer_' + this.currentQuestion);
        

        labelAnswerText.innerHTML = escapeHTML(element); // применяем функцию для корректного отображения HTML тегов в тексте вопроса
        answerTextWrap.appendChild(answerText);
        answerTextWrap.appendChild(labelAnswerText);
      }
    }
   
    let btnNext = document.createElement('button');
    btnNext.innerHTML = 'NEXT';
    btnNext.id = 'btnNext';
    this.root.appendChild(btnNext); 

    btnNext.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      
      console.log (this.currentQuestion);
      if (this.currentQuestion < this.questionList.size - 1) {
        this.checkAnswers(); //отправляем выбранный ответ в массив (ответов на все вопросы квиза)
        this.currentQuestion++;
        this.askCurrentQuestion();
      } else {
        console.log('YAOOOO'); //  TEST
        this.checkAnswers();
        console.log(this.playersAnswerList);  //  TEST
        this.getResult(); //  переход к окну с результатом после последнего вопроса.
      };
    })
  }

  checkAnswers() {
    // TODO проверить checkad answers и пушнуть в массив (size = кол-во элм в массиве) имя ответа игрока 

    let checkboxList = document.getElementsByName('answer_' + this.currentQuestion);
    let playersAnswer = [];
    for (let i=0; i < checkboxList.length; i++) {
      if (checkboxList[i].checked) {
        playersAnswer.push(checkboxList[i].id);
      } else {
        console.log('bobobo'); //  TEST
      }
    }
    this.playersAnswerList.push(playersAnswer); 
    console.log(this.playersAnswerList);  //  TEST
  }

  getResult () {
    let summPoints = 0;     // TEST   !!!!

    root.innerHTML = '';  // delete question's block with btn 
    let resultField = document.createElement('div'); //создаем текстовый блок с результатами
    this.root.appendChild(resultField);

    //TODO сравниваем i массив из массива ответов пользователя с  i объектом в  объекте корректных ответов
    for (let i = 0; i < this.playersAnswerList.length; i++) {
      console.log(this.playersAnswerList[i]); //  TEST
      for (let key in  this.questionList.items[i].correct_answers) { //TEST найти объект с корректными ответами для одного вопроса и проверить кто из них верен
        if ( this.questionList.items[i].correct_answers[key] === 'true') { //перебор в объекте с корректными отв
          if ( (this.playersAnswerList[i] + '_correct') === key) {
            summPoints++;
            console.log ( this.playersAnswerList[i] + ' = ' + key);  //TEST
          } else { 
            console.log (0);
          }
        }
      }

    }


    let resultField1 = document.createElement('p'); //создаем строку блока
    let resultField2 = document.createElement('p'); 
    let resultField3 = document.createElement('p'); 
    resultField1.innerHTML = ('Good Try, ' + this.player.name + '!');
    resultField2.innerHTML = (' You got '+ summPoints + ' out of ' + this.questionList.size + ' answers correct!');
    resultField3.innerHTML = ('');
    resultField.appendChild(resultField1);
    resultField.appendChild(resultField2);
    resultField.appendChild(resultField3);

    console.log(this.questionList.items[0].correct_answers);

    let btnPlayAgain =  document.createElement('button'); //add button 'Play again' btnNext.type = 'image';
    //btnPlayAgain.src = 'btnNext.png';
    btnPlayAgain.innerHTML = 'Play new game!'; 
    btnPlayAgain.id = 'btnPlayAgain';
    this.root.appendChild(btnPlayAgain);
    btnPlayAgain.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      this.play();
    });
  }
}