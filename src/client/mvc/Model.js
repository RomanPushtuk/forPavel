// import requests from './Requests';
import { generateId, dynamicSort } from './helpers';

class Model {

  constructor(data = []){
    this.data = data;
  }

  async hostels() {
    // Все данные из таблицы получаются этим методом
    const data = await requests.getAllHostels();
    const item = await data.json(); // obj
    return item;
  }

  checkedToDo(id){
    return this.getToDo(id)[0]
  }

  getToDo(id){
    return this.data.filter(item => {
      if(item.id == id){
        item.checked = !item.checked;
        return item;
      }
    })
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  sortTextUp(){
    // console.log(1);
    return this.data.sort( this.dynamicSort('name'));
  }

  sortTextDown(){
    // console.log(-1);
    return this.data.sort( this.dynamicSort('name')).reverse();
  }

searchRecord(text){
  //Верни все тудушки которые начинаются с text
  if(text === '') return this.data;
  let todos = [];
  this.data.forEach(item => {
    if (item.name.match(`^${text}`)) {
      todos.push(item);
    }
  });
  return todos;
}

sortDate(){
  function compare( a, b ) {
    if ( a.time < b.time ){
      return -1;
    }
    if ( a.time > b.time ){
      return 1;
    }
    return 0;
}
return this.data.sort( compare );
}


searchRecordDate(text){
  if(text === '') return this.data;
  let todos = [];
  this.data.forEach(item => {
    if (item.time.match(`^${text}`)) {
      todos.push(item);
    }
  });
  return todos;
}

  addTask(task) {
    task.id = generateId();
    task.checked = false;
    this.data.push(task);
    // Добавляем в хранилище
    localStorage.setItem('ADD_TO_STORSGE', JSON.stringify(this.data));
    return task;
  }

  changeHostel({id, name, time}) {
    let itemId = 0;
    this.data.forEach((item, i) => {
      if(item.id == id){
        itemId = i;
      }
    })
    // console.log(itemId);
    // console.log(this.data[itemId]);
    this.data[itemId].name = name;
    this.data[itemId].time = time;
    localStorage.setItem('ADD_TO_STORSGE', JSON.stringify(this.data))
    return this.data[itemId];
  }

  deleteHostel({ id }) {
    // Удаляем данные
    this.data.forEach((item, i) => {
      if(item.id == id){
        this.data.splice(i, 1);
      }
    });
    localStorage.setItem('ADD_TO_STORSGE', JSON.stringify(this.data))
    return id;
  }
}

export default Model;
