class QuestionList {
  constructor(size) {
    this.size = size;
    this.items = []; //весь блок с вопросами и пр
  }

  load() {
    let link = ('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&tags=JavaScript&limit=' + this.size);
   
    return fetch(link)
      .then((response) => response.json())
      .then((data) => {
        
        for (let i=0; i<data.length; i++) { //цикл пройтись по массиву, передать свойства элементов как свойства Кк и пушнуть в айтемс массив
          const question = new Question(data[i]);
          this.items.push(question);
        }
        return this.items; 
      });
    }
}