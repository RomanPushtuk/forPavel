import EventEmitter from './EventEmitter';
// Все HTML элементы
import elements from './elements';
import {
  ADD_RECORD,
  DELETE_RECORD,
  CHANGE_RECORD,
  SEARCH_ON_TEXT,
  SEARCH_ON_DATE,
} from './constants';
import { createRecord, getDataFromApp, changeArrow, checkedChangeStyle } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();

    // Инициализируем элементы
    elements.call(this);
    // --------------------------ГЛАВНЫЕ ФУНКЦИИ---------------------------
    // Клик по кнопке "ДОБАВИТЬ"
    this.addButton.addEventListener('click', this.handleAdd.bind(this));

    // Клик по кнопке "Закрыть"
    this.closeAddModal.addEventListener('click', this.clearModal.bind(this));

    // Клик по кнопке "РЕДАКТИРОВАТЬ"
    this.changeButton.addEventListener('click', this.handleChange.bind(this));

    // Клик по кнопке "УДАЛИТЬ ДАННЫЕ"
    this.deleteButton.addEventListener('click', this.handleDelete.bind(this));
    // --------------------------------ГЛАВНЫЕ ФУНКЦИИ КОНЕЦ-----------------------------

    // --------------------------------СОРТИРОВКИ И ФИЛЬТРЫ----------------------------
    // Сортировка по тексту
    this.sortText.addEventListener('click', this.handleSortText.bind(this));

    // Сортировка по дате
    this.sortDate.addEventListener('click', this.handleSortDate.bind(this));

    // Поиск по вводимому тексту
    this.searchText.addEventListener('input', this.handleSearchOnText.bind(this));

    // Поиск по дате
    this.datepickerSearchButton.addEventListener('click', this.handleSearchOnDate.bind(this));
    // --------------------------------СОРТИРОВКИ И ФИЛЬТРЫ КОНЕЦ----------------------------
  }

  // -------------------------- ГЛАВНЫЕ ФУНКЦИИ---------------------------------
  // ДОБАВЛЕНИЕ
  handleAdd() {
    // Проверка не пустые ли поля для заполнения
    if (this.inputName.value && this.selectDate.value) {
      const obj = getDataFromApp.call(this, { mode: 'add' });
      this.emit(ADD_RECORD, obj);
      this.clearModal();
    } else {
      alert('Заполните все поля для добавления записи.');
    }
  }

  addTask(record) {
    const elem = createRecord.call(this, record);
    this.table.appendChild(elem);
  }
  // ДОБАВЛЕНИЕ КОНЕЦ

  // ИЗМЕНЕНИЕ ЗАПИСИ НАЧАЛО
  handleChange() {
    if (this.changeName.value && this.datepickerChange.value) {
      const obj = getDataFromApp.call(this, { mode: 'change' });
      this.emit(CHANGE_RECORD, obj);
    } else {
      alert('Заполните все поля для изменения записи');
    }
  }

  changeRecord({ id, name, time, checked }) {
    const element = document.getElementById(id);
    const [tdChecked, tdName, tdTime] = element.children;
    tdChecked.innerText = checked ? 'Выполнено!' : 'Ожидание';
    tdName.innerText = name;
    tdTime.innerText = time;
  }
  // ИЗМЕННЕНИЕ ЗАПИСИ КОНЕЦ

  // УДАЛЕНИЕ ЗАПИСИ НАЧАЛО
  handleDelete() {
    const obj = getDataFromApp.call(this, { mode: 'delete' });
    this.emit(DELETE_RECORD, obj);
  }

  deleteRecord(id) {
    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
  }
  // УДАЛЕНИЕ ЗАПИСИ КОНЕЦ
  //  --------------------ГЛАВНЫЕ ФУНКЦИИ КОНЕЦ------------------------

  // ---------------------СОРТИРОВКИ И ФИЛЬТРЫ---------------------------
  // ПОИСК ПО ДАТЕ
  handleSearchOnDate() {
    this.emit(SEARCH_ON_DATE, this.datepickerSearch.value);
  }
  // ПОИСК ПО ВВОДИМОМУ ТЕКСТУ
  handleSearchOnText(evt) {
    this.emit(SEARCH_ON_TEXT, evt.target.value);
  }

  handleSortText() {
    // меняет стрелку вверх вниз
    // и производит сортировку по тексту
    changeArrow.call(this, { mode: 'text' });
  }

  handleSortDate() {
    // меняет стрелку вверх вниз
    // и производит сортировку по дате
    changeArrow.call(this, { mode: 'date' });
  }

  // Отчищаем модальное окно добавления при выходе из него
  clearModal() {
    this.inputName.value = '';
    this.selectDate.value = '';
  }

  checked(todo) {
    // Изменяет стили при нажатии на задачу ПРИ КЛИКЕ НА - ОЖИДАНИЕ
    checkedChangeStyle(todo);
  }

  showTable(data) {
    this.table.innerHTML = '';
    data.forEach(item => {
      this.table.appendChild(createRecord.call(this, item));
    });
  }
  // ---------------------СОРТИРОВКИ И ФИЛЬТРЫ КОНЕЦ---------------------------
}

export default View;
