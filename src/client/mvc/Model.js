// import { ADD_TO_STORAGE } from './constants';
import { generateId, searchObjs, sortOfText, save } from './helpers';

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
    this.data[index].checked = !this.data[index].checked;
    return this.data[index];
  }

  // Поиск индекса нужного объекта по id
  getToDo(id) {
    return this.data.findIndex(item => {
      return item.id === id;
    });
  }

  // Сортировка по тексту
  sortTextUp() {
    return this.dataFilter.sort(sortOfText);
  }

  sortTextDown() {
    return this.sortTextUp().reverse();
  }

  commonSearch({ name, date }) {
    const filter = searchObjs(this.data, 'name', name);
    this.dataFilter = searchObjs(filter, 'time', date);
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
      if (item.id === id) {
        this.data.splice(i, 1);
      }
    });
    save(this.data);
    return id;
  }
}

export default Model;
