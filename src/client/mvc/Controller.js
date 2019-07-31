import {
  ADD_RECORD,
  DELETE_RECORD,
  CHANGE_RECORD,
  SORT_TEXT_UP,
  SORT_TEXT_DOWN,
  SORT_DATE_DOWN,
  SORT_DATE_UP,
  CHECKED,
  SEARCH,
} from './constants';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // -------------------ГЛАВНЫЕ ФУНКЦИИ-------------------
    view.on(ADD_RECORD, this.addTask.bind(this));
    view.on(CHANGE_RECORD, this.changeTask.bind(this));
    view.on(DELETE_RECORD, this.deleteTask.bind(this));
    // --------------------ГЛАВНЫЕ ФУНКЦИИ КОНЕЦ--------------

    // ДЛЯ ЗАЧЕРКИВАНИЯ
    view.on(CHECKED, this.checked.bind(this));

    // --------------------СОРТИРОВКИ И ФИЛЬТРЫ------------------
    view.on(SORT_TEXT_UP, this.sortTextUp.bind(this));
    view.on(SORT_TEXT_DOWN, this.sortTextDown.bind(this));

    view.on(SORT_DATE_UP, this.sortDateUp.bind(this));
    view.on(SORT_DATE_DOWN, this.sortDateDown.bind(this));

    view.on(SEARCH, this.searchOn.bind(this));
    // ------------------------СОРТИРОВКИ И ФИЛЬТРЫ КОНЕЦ--------------------
    view.showTable(model.data);
  }

  // Поиск по тексту
  searchOn(obj) {
    const data = this.model.commonSearch(obj);
    this.view.showTable(data);
  }

  // Срабатывает меняет свойство cheked у элемента по которому кликнули
  checked(id) {
    const todo = this.model.checkedToDo(id);
    this.view.checked(todo);
  }

  // Сортировка по тексту
  sortTextUp() {
    const data = this.model.sortTextUp();
    this.view.showTable(data);
  }

  sortTextDown() {
    const data = this.model.sortTextDown();
    this.view.showTable(data);
  }

  // Сортировка по дате
  sortDateUp() {
    const data = this.model.sortDateUp();
    this.view.showTable(data);
  }

  sortDateDown() {
    const data = this.model.sortDateDown();
    this.view.showTable(data);
  }

  // Добавление задачи
  addTask(task) {
    const data = this.model.addTask(task);
    this.view.addTask(data);
  }

  // Изменение задачи
  changeTask(hostel) {
    const record = this.model.changeTask(hostel);
    this.view.changeRecord(record);
  }

  // Удаление задачи
  deleteTask(obj) {
    const id = this.model.deleteTask(obj);
    this.view.deleteRecord(id);
  }
}

export default Controller;
