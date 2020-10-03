class QuestionList {
  constructor(size) {
    this.size = size;
    this.items = [];
  }

  load() {
    let link = ('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=' + this.size);
   
    return fetch(link)
      .then((response) => response.json())
      .then((json) => {
        this.items = json;
        return this.items; 
      });
  }

}