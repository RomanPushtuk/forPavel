// ЗДЕСЬ НАХОДЯТСЯ ВСЕ ФУНКЦИИ
import {
  CHECKED,
  SORT_TEXT_DOWN,
  SORT_TEXT_UP,
  SORT_DATE_DOWN,
  SORT_DATE_UP,
  ADD_TO_STORAGE,
} from './constants';
// Все HTML элемены проекта с коорым рабоаем

// Функция которая выполнится при нажатии на кнопку удалить
function hendlerDelete(evt) {
  const perent = evt.target.parentNode.parentNode;
  const [checked, name, time] = perent.children;
  const data = `${perent.id} : ${name.innerText} : ${time.innerText}`;
  this.modalBodyData.innerText = data;
  this.idDeleteItem.value = perent.id;
}

// Функция которая выполнится при нажатии на кнопку редактировать
function hendlerChange(evt) {
  const perent = evt.target.parentNode.parentNode;
  const [checked, name, time] = perent.children;
  this.idChengeItem.value = evt.target.parentNode.parentNode.id;
  this.changeName.value = name.innerText;
  this.datepickerChange.value = time.innerText;
}

function checkedChangeStyle({ id, checked }) {
  const todo = document.getElementById(id);
  if (checked) {
    // Применяем зачеркнутые стили
    todo.children[0].classList.add('checked');
    todo.children[0].innerText = 'Выполнено!';
    todo.children[1].classList.add('checked');
    todo.children[2].classList.add('checked');
  } else {
    // Возвражаем нормальные стили
    todo.children[0].classList.remove('checked');
    todo.children[0].innerText = 'Ожидание';
    todo.children[1].classList.remove('checked');
    todo.children[2].classList.remove('checked');
  }
}

// возвращает саммив объектов у которых свойство target начинается со значения text
function searchObjs(obj, target, text) {
  if (text === '') {
    return obj;
  }
  return obj.filter(item => {
    if (item[target].match(`^${text}`)) {
      return true;
    }
  });
}

// Создаем строку таблцы
function createRecord({ id, name, time, checked }) {
  // Строка таблицы
  const trRecord = document.createElement('tr');
  trRecord.id = id;

  const thName = document.createElement('td');
  thName.innerText = name;
  const tdDate = document.createElement('td');
  tdDate.innerText = time;

  const tdDelete = document.createElement('td');
  const tdChange = document.createElement('td');
  const btnDelete = document.createElement('button');
  const btnChange = document.createElement('button');
  btnDelete.classList.add('btn');
  btnDelete.classList.add('btn-danger');
  btnDelete.innerText = 'Удалить';
  btnDelete.setAttribute('data-toggle', 'modal');
  btnDelete.setAttribute('data-target', '#deleteModal');
  btnDelete.addEventListener('click', hendlerDelete.bind(this));

  btnChange.classList.add('btn');
  btnChange.classList.add('btn-primary');
  btnChange.innerText = 'Редактировать';
  btnChange.setAttribute('data-toggle', 'modal');
  btnChange.setAttribute('data-target', '#modalChange');
  btnChange.addEventListener('click', hendlerChange.bind(this));

  tdDelete.appendChild(btnDelete);
  tdChange.appendChild(btnChange);

  const tdChecked = document.createElement('th');
  tdChecked.classList.add('pointer');
  if (checked) {
    tdChecked.innerText = 'Выполнено!';
    tdChecked.classList.add('checked');
    thName.classList.add('checked');
    tdDate.classList.add('checked');
    // console.log(tdChecked, thName, tdTime);
  } else {
    tdChecked.innerText = 'Ожидание';
    tdChecked.classList.remove('checked');
    thName.classList.remove('checked');
    tdDate.classList.remove('checked');
  }
  tdChecked.addEventListener('click', () => {
    this.emit(CHECKED, id);
  });

  trRecord.appendChild(tdChecked);
  trRecord.appendChild(thName);
  trRecord.appendChild(tdDate);
  trRecord.appendChild(tdDelete);
  trRecord.appendChild(tdChange);
  return trRecord;
}

function sortOfText(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

function changeArrow({ mode }) {
  if (mode === 'text') {
    // Cмотрим какая стрелочка
    const direction = arrowText.innerText;
    // Если стрелочка вниз, то меняем на обратную и делаем сортировку по возрастанию
    if (direction === '↓') {
      arrowText.innerText = '↑';
      return this.emit(SORT_TEXT_DOWN, undefined);
    }
    if (direction === '↑') {
      arrowText.innerText = '↓';
      return this.emit(SORT_TEXT_UP, undefined);
    }
    // При первом нажатии ставим стрелочку вниз, сортировка по убыванию
    arrowText.innerText = '↓';
    return this.emit(SORT_TEXT_UP, undefined);
  }
  if (mode === 'date') {
    const direction = arrowDate.innerText;
    // Если стрелочка вниз, то меняем на обратную и делаем сортировку по возрастанию
    if (direction === '↓') {
      arrowDate.innerText = '↑';
      return this.emit(SORT_DATE_DOWN, undefined);
    }
    if (direction === '↑') {
      arrowDate.innerText = '↓';
      return this.emit(SORT_DATE_UP, undefined);
    }
    // При первом нажатии ставим стрелочку вниз, сортировка по убыванию
    arrowDate.innerText = '↓';
    return this.emit(SORT_DATE_UP, undefined);
  }
}

// Для быстрого получения объекта со значениями из разных форм
function getDataFromApp({ mode }) {
  if (mode === 'change') {
    return {
      id: this.idChengeItem.value,
      name: this.changeName.value,
      time: this.datepickerChange.value,
    };
  }
  if (mode === 'add') {
    return {
      name: this.inputName.value,
      time: this.selectDate.value,
    };
  }
  if (mode === 'delete') {
    return {
      id: this.idDeleteItem.value,
    };
  }
}

// Генерируем задачам рандомный ID
function generateId() {
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

// Загружаем данные из стореджа
function load() {
  if (localStorage.getItem(ADD_TO_STORAGE)) {
    return JSON.parse(localStorage.getItem(ADD_TO_STORAGE));
  }
}
// Созраняем данные
function save(data) {
  localStorage.setItem(ADD_TO_STORAGE, JSON.stringify(data));
}

export {
  createRecord,
  getDataFromApp,
  load,
  generateId,
  changeArrow,
  checkedChangeStyle,
  searchObjs,
  sortOfText,
  save,
};
