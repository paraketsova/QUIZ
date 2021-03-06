class QuestionList {
  constructor(size) {
    this.size = size;
    this.items = []; 
  }

  load() {
    let link = ('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&tags=JavaScript&limit=' + this.size);
   
    return fetch(link) 
      .then((response) => response.json())
      .then((data) => {
        
        for (let i=0; i<data.length; i++) { //för varje element data [i] vi skapar constanta question (det är class Question egenskap) och vi pushar varje guestion in items[].
          const question = new Question(data[i]);
          this.items.push(question);
        }
        console.log(this.items); //TEST provar titta på this.playersAnswerList (för debugging)
        return this.items; 
      }); 
  }
}

