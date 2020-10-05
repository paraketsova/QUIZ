class Game {
  constructor(){
    this.player = null;
    this.questionList = null;
    this.currentQuestion = 0;

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
    labelRadio5.for = ('radio5');
    labelRadio5.innerText = ('5');
    divSizeQuiz.appendChild(labelRadio5);

   let sizeQuizRadio10 = document.createElement('input'); //создаем input для выбора 10 вопросов 
    divSizeQuiz.appendChild(sizeQuizRadio10);
    sizeQuizRadio10.type = 'radio';
    sizeQuizRadio10.name = 'sizeQuizRadio';  // задаём обеим кнопкам одно имя, чтобы (или)
    sizeQuizRadio10.id = 'radio10';
    sizeQuizRadio10.value = 'radio10';

    let labelRadio10 = document.createElement('label'); //создаем лейбл к input для выбора 10 вопросов 
    labelRadio10.for = ('radio10');
    labelRadio10.innerText = ('10');
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

    if (sizeQuizRadio5.checked) {  // поскольку для 5 и 10 вопросов разница лишь в хвосте ф и цифре 5/10, упрощаем код для скачивания 5 или 10 вопросов.
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
    questionCounter.innerHTML = (this.currentQuestion + 1);  // TODO - выводить номер вопроса начиная с 1 = (i=o +1)
    this.root.appendChild(questionCounter); 
  
    let questText = document.createElement('div'); //создаем поле для вывода текста вопроса
    questText.innerHTML = this.questionList.items[this.currentQuestion].question;  
    this.root.appendChild(questText); 
  
    let answerList = document.createElement('ul'); //создаем поле для слота ответов
    this.root.appendChild(answerList); 
    
    for (let key in this.questionList.items[this.currentQuestion].answers) { // пройтись по всем ответам и вывести только ненулевые
      const element = this.questionList.items[this.currentQuestion].answers[key];
      if (element !== null) {
        let answerText = document.createElement('li'); //создаем поле для текста каждого ответа
        answerText.innerHTML = escapeHTML(element);  
        answerList.appendChild(answerText);
      }
    }
    //TODO переделать поля с ответами в чекбоксы. 

    let btnNext = document.createElement('input');
    btnNext.type = 'image';
    btnNext.src = 'btnNext.png';
    btnNext.id = 'btnNext';
    this.root.appendChild(btnNext); 

    btnNext.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      //TODO отправить выбранный ответ в массив (ответов на все вопросы квиза)
      this.currentQuestion++;
      if (this.currentQuestion < this.questionList.size) {
        this.askCurrentQuestion();
      }
      else {
        console.log('lalala');
      };
    })

  }
  /* getResult() {
    console.log(lalala);
  } */
}

// кнопки туда-сюда.
    /* const btnBack = document.createElement('input'); //создаем кнопку назад 
    btnBack.type ='image';
    btnBack.src = 'btnBck.png';
    btnBack.id = 'btnBack';
    this.root.appendChild(btnBack); 

    const btnForward = document.createElement('input'); //создаем кнопку вперёд
    btnForward.type ='image';
    btnForward.src = 'btnFrwrd.png';
    btnForward.id = 'btnForward';
    this.root.appendChild(btnForward); */


/*   takeQuests_1 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }  */
