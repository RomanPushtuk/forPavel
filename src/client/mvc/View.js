import EventEmitter from './EventEmitter';
// Все HTML элементы
import elements from './elements';
import { ADD_RECORD, DELETE_RECORD, CHANGE_RECORD, SORT_TEXT_DOWN, SORT_TEXT_UP } from './constants';
import { createRecord, getDataFromApp } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();

    // Инициализируем элементы
    elements.call(this);
    // Клик по кнопке "ДОБАВИТЬ"
    this.addButton.addEventListener('click', this.handleAdd.bind(this));

    // Клик по кнопке "Закрыть"
    this.closeAddModal.addEventListener('click', this.clearModal.bind(this));

    // Клик по кнопке "РЕДАКТИРОВАТЬ"
    this.changeButton.addEventListener('click', this.handleChange.bind(this));

    // Клик по кнопке "УДАЛИТЬ ДАННЫЕ"
    this.deleteButton.addEventListener('click', this.handleDelete.bind(this));

    // Сортировка по тексту
    this.sortText.addEventListener('click', this.handleSortText.bind(this));

    // Сортировка по дате
    this.sortDate.addEventListener('click', this.handleSortDate.bind(this));

    // Поиск по вводимому тексту
    this.searchText.addEventListener('input', this.handleSearch.bind(this));

    // Поиск по дате
    this.datepickerSearchButton.addEventListener('click', this.handleSearchDate.bind(this));
  }

  handleAdd() {
    const hostel = getDataFromApp.call(this, { mode: 'add' });
    this.emit(ADD_RECORD, hostel);
    this.clearModal();
  }

  handleSearchDate(){
    this.emit('SEARCH_DATE', this.datepickerSearch.value);
  }

  handleSearch(evt){
    this.emit('SEARCH_RECORD', evt.target.value);
  }

  handleChange() {
    const hostel = getDataFromApp.call(this, { mode: 'change' });
    this.emit(CHANGE_RECORD, hostel);
  }

  handleDelete() {
    const obj = getDataFromApp.call(this, { mode: 'delete' });
    this.emit(DELETE_RECORD, obj);
  }

  handleSortText() {
    // Cмотрим какая стрелочка
    const direction = arrowText.innerText;
    // Если стрелочка вниз, то меняем на обратную и делаем сортировку по возрастанию
    if (direction == '↓'){
      arrowText.innerText = '↑';
      return this.emit(SORT_TEXT_DOWN, undefined);
    }
    if (direction == '↑'){
      arrowText.innerText = '↓';
      return this.emit(SORT_TEXT_UP, undefined);
    }
    // При первом нажатии ставим стрелочку вниз, сортировка по убыванию
    arrowText.innerText = '↓';
    return this.emit(SORT_TEXT_UP, undefined);
  }

  handleSortDate() {
    this.emit('SORT_DATE', undefined);
  }


  changeRecord({ id, name, time, checked}) {
    const element = document.getElementById(id);
    const [tdChecked, tdName, tdTime] = element.children;
    tdChecked.innerText =  checked ? "Выполнено!" : "Ожидание";
    tdName.innerText = name;
    tdTime.innerText = time;
  }

  sortTextV(data){
    this.table.innerHTML = '';;
    this.showTable(data);
  }

  deleteRecord(id) {
    console.log(id);
    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
  }

  addTask(record) {
    const elem = createRecord.call(this, record)
    this.table.appendChild(elem);
  }

  // Отчищаем модальное окно добавления при выходе из него
  clearModal() {
    this.inputName.value = '';
    this.selectDate.value = '';
  }

  checked({ id, checked }){
    console.log(id);
    const todo = document.getElementById(id);
    if(checked){
      //Применяем зачеркнутые стили
      todo.children[0].classList.add('checked-true');
      todo.children[0].innerText = 'Выполнено';
      todo.children[1].classList.add('checked-true');
      todo.children[2].classList.add('checked-true');
    }else{
      //Возвражаем нормальные стили
      todo.children[0].classList.remove('checked-true');
      todo.children[0].innerText = 'Ожидание';
      todo.children[1].classList.remove('checked-true');
      todo.children[2].classList.remove('checked-true');
    }
  }

  showTable(data) {
    data.forEach(item => {
      this.table.appendChild(createRecord.call(this, item));
    });
  }
}

export default View;
