class Game {
  constructor(){
    this.player = new Player(name);
    this.question = new Question();
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
    
    const labelnamesRoot = document.createElement('p'); //создаем текст к input для ввода имени 
    labelnamesRoot.innerText = ("Player's name:");
    this.root.appendChild(labelnamesRoot); 

    const namesRoot = document.createElement('input'); //создаем input для ввода имени 
    this.root.appendChild(namesRoot); 


    const labelSizeQuizRoot = document.createElement('p'); //создаем текст к input для определения кол-ва вопросов
    labelSizeQuizRoot.innerText = ("Please choose number of questions:");
    this.root.appendChild(labelSizeQuizRoot); 

    const divSizeQuiz = document.createElement('div'); //создаем input для радиокнопок
    this.root.appendChild(divSizeQuiz); 

    const sizeQuizRadio5 = document.createElement('input'); //создаем input для выбора 5 вопросов 
    divSizeQuiz.appendChild(sizeQuizRadio5);
    sizeQuizRadio5.type = 'radio';
    sizeQuizRadio5.name = 'sizeQuizRadio'; // задаём обеим кнопкам одно имя, чтобы (или)
    sizeQuizRadio5.id = 'radio5';
    const labelRadio5 = document.createElement('label'); //создаем лейбл к input для выбора 5 вопросов 
    labelRadio5.for = ('radio5');
    labelRadio5.innerText = ('5');
    divSizeQuiz.appendChild(labelRadio5);

    const sizeQuizRadio10 = document.createElement('input'); //создаем input для выбора 10 вопросов 
    divSizeQuiz.appendChild(sizeQuizRadio10);
    sizeQuizRadio10.type = 'radio';
    sizeQuizRadio10.name = 'sizeQuizRadio';  // задаём обеим кнопкам одно имя, чтобы (или)
    sizeQuizRadio10.id = 'radio10';
    const labelRadio10 = document.createElement('label'); //создаем лейбл к input для выбора 10 вопросов 
    labelRadio10.for = ('radio10');
    labelRadio10.innerText = ('10');
    divSizeQuiz.appendChild(labelRadio10);

    const btnGo = document.createElement('button'); //создаем кнопку GO как элемент 
    btnGo.innerHTML = 'Go!'; 
    this.root.appendChild(btnGo);
    btnGo.addEventListener('click', (event) => { // вместо обычной ф мы пишем лямбда ф, которая позволяет ссылаться на внешнюю область видимости, так как иначе мы не можем писать её ведь у лямбды нет свойства this она по умолчанию ищет ее выше, на уровне класса.
      this.go();
    })
    
  }

  go () {
    console.log ('nanana');
  }






  
  
  takeQuests_10 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=10')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  takeQuests_5 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  takeQuests_5 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }
}




//five question
  fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=5&tags=JavaScript')
  .then((response) => response.json())
  .then((json) => console.log(json));

//one question
  fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
  .then((response) => response.json())
  .then((json) => console.log(json))