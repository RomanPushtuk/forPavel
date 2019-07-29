import requests from './Requests';
// Все HTML элемены проекта с коорым рабоаем

// Функция которая выполнится при нажатии на кнопку удалить
function hendlerDelete(evt) {
  const perent = evt.target.parentNode.parentNode;
  const [checked, name, time] = perent.children;
  const data = `${perent.id} : ${name.innerText} : ${time.innerText}`;
  this.modalBodyData.innerText = data;
  this.idDeleteItem.value = perent.id;
}

// function handlerChecked(evt) {
//   const perent = evt.target.parentNode;
//   const todo = document.getElementById(perent.id);
//   todo.children.forEach(item => {
//     item.classList.toggle('checked-true');
//   })
//   // console.log(perent);
// }

// Функция которая выполнится при нажатии на кнопку редактировать
function hendlerChenge(evt) {
  const perent = evt.target.parentNode.parentNode;
  const [checked, name, time] = perent.children;
  this.idChengeItem.value = evt.target.parentNode.parentNode.id;
  this.changeName.value = name.innerText;
  this.datepickerChange.value = time.innerText;
}

// Создаем строку таблцы
function createRecord({ id, name, time, checked}) {
  const trRecord = document.createElement('tr');
  trRecord.id = id;

  const tdChecked = document.createElement('th');
  tdChecked.innerText = checked ? "Выполнено!" : "Ожидание";
  tdChecked.addEventListener('click', () => {
    this.emit('CHECKED', id)
  });

  const thName = document.createElement('td');
  thName.innerText = name;
  const tdTime = document.createElement('td');
  tdTime.innerText = time;

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
  btnChange.addEventListener('click', hendlerChenge.bind(this));

  tdDelete.appendChild(btnDelete);
  tdChange.appendChild(btnChange);

  trRecord.appendChild(tdChecked);
  trRecord.appendChild(thName);
  trRecord.appendChild(tdTime);
  trRecord.appendChild(tdDelete);
  trRecord.appendChild(tdChange);
  return trRecord;
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

function dynamicSort(property) {
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

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function load(){
  if(localStorage.getItem('ADD_TO_STORSGE')){
    return JSON.parse(localStorage.getItem('ADD_TO_STORSGE'));
  }
}

export { createRecord, getDataFromApp, load, generateId };
