class Game {
  constructor(){
    this.player = null;
    this.questionList = null;
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
      this.askQ();
    })
  }

  askQ () {
    let nameInput = document.getElementById('name');
    this.player = new Player(nameInput.value);
    console.log(this.player.name); ////    TEST

    let sizeQuizRadio5 = document.getElementById('radio5');
    let sizeQuizRadio10 = document.getElementById('radio10');

    if (sizeQuizRadio5.checked) {
      fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=5&tags=JavaScript')
      .then((response) => response.json())
      .then((json) => console.log(json));
    }
    else {
      fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=10')
      .then((response) => response.json())
      .then((json) => console.log(json));
    }
  }






  
  
  /* takeQuests_10 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=10')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  takeQuests_5 () {
      fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=5&tags=JavaScript')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  takeQuests_1 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
    .then((response) => response.json())
    .then((json) => console.log(json));
  } */
}
