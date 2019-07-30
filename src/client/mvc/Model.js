// import { ADD_TO_STORAGE } from './constants';
import { generateId, searchObjs, save } from './helpers';

class Model {
  constructor(data = []) {
    // ЗАГРУЗИЛИ ДАННЫЕ
    this.data = data;
    // Отфильтрованные данные которые уже на экране
    this.dataFilter = this.data;
  }
  // изменяет у элемента свойтво checked
  checkedToDo(id) {
    const index = this.getToDo(id);
    console.log(id);
    this.data[index].checked = !this.data[index].checked;
    console.log(this.data);
    save(this.data);
    return this.data[index];
  }

  // Поиск индекса нужного объекта по id
  getToDo(id) {
    return this.data.findIndex(item => {
      if (item.id === id) {
        return true;
      }
    });
  }

  // Сортировка по тексту
  sortTextUp() {
    return this.dataFilter.sort(function(a, b) {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  sortTextDown() {
    return this.sortTextUp().reverse();
  }

  // Возвражает все записи которые начинаются с вводимого текста
  searchOnText(text) {
    this.dataFilter = searchObjs(this.data, 'name', text);
    return this.dataFilter;
  }
  // Возвращает все записи которые начинаются с выбранной даты
  searchOnDate(text) {
    this.dataFilter = searchObjs(this.data, 'time', text);
    return this.dataFilter;
  }

  sortDateUp() {
    this.dataFilter.sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
    });
    return this.dataFilter;
  }

  sortDateDown() {
    return this.sortDateUp().reverse();
  }

  addTask(task) {
    task.id = generateId();
    task.checked = false;
    this.data.push(task);
    save(this.data);
    return task;
  }

  changeTask({ id, name, time }) {
    const index = this.getToDo(id);
    this.data[index].name = name;
    this.data[index].time = time;
    save(this.data);
    return this.data[index];
  }

  deleteTask({ id }) {
    // Удаляем данные
    this.data.forEach((item, i) => {
      if (item.id == id) {
        this.data.splice(i, 1);
      }
    });
    save(this.data);
    return id;
  }
}

export default Model;
