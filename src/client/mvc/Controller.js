import { ADD_RECORD, DELETE_RECORD, CHANGE_RECORD, SORT_TEXT_UP, SORT_TEXT_DOWN } from './constants';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on(ADD_RECORD, this.addTask.bind(this));
    view.on(CHANGE_RECORD, this.changeHostel.bind(this));
    view.on(DELETE_RECORD, this.deleteHostel.bind(this));

    view.on('CHECKED', this.checked.bind(this));
    view.on(SORT_TEXT_UP, this.sortTextUp.bind(this));
    view.on(SORT_TEXT_DOWN, this.sortTextDown.bind(this));
    view.on('SORT_DATE', this.sortDate.bind(this));
    view.on('SEARCH_RECORD', this.searchRecord.bind(this));
    view.on('SEARCH_DATE', this.searchOnDate.bind(this));
    view.showTable(model.data);
  }

  searchOnDate(date){
    const data = this.model.searchRecordDate(date);
    this.view.sortTextV(data);
  }

  checked(id){
    const todo = this.model.checkedToDo(id);
    this.view.checked(todo);
  }

  searchRecord(text){
    const data = this.model.searchRecord(text);
    this.view.sortTextV(data);
  }

  sortTextUp(){
    const data = this.model.sortTextUp();
    this.view.sortTextV(data);
  }

  sortTextDown(){
    const data = this.model.sortTextDown();
    this.view.sortTextV(data);
  }
  sortDate(){
    const data = this.model.sortDate();
    this.view.sortTextV(data);
  }

  addTask(task) {
    const data = this.model.addTask(task);
    this.view.addTask(data);
  }

  changeHostel(hostel) {
    const record = this.model.changeHostel(hostel);
    console.log(record);
    this.view.changeRecord(record);
  }

  deleteHostel(obj) {
    const id = this.model.deleteHostel(obj);
    this.view.deleteRecord(id);
  }
}

export default Controller;
