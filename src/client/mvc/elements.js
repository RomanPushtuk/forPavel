// Посчитал что так вынести элементы страницы будет удобнее
function elements() {
  // Элемены связанные с добавлением
  this.addButton = document.getElementById('addButton');
  this.inputName = document.getElementById('inputName');
  this.selectDate = document.getElementById('datepicker');
  this.closeAddModal = document.getElementById('closeAddModal');

  // Элемены связанные с удаленем
  this.deleteButton = document.getElementById('deleteButton');
  this.modalBodyData = document.getElementById('modalBodyData');
  this.idDeleteItem = document.getElementById('idDeleteItem');

  // Элементы связанные с изменением
  this.changeButton = document.getElementById('changeButton');
  this.idChengeItem = document.getElementById('idChengeItem');
  this.changeName = document.getElementById('changeName');
  this.datepickerChange = document.getElementById('datepickerChange');

  // Элементы связанные с сортировкой
  this.sortText = document.getElementById('sortText');
  this.arrowText = document.getElementById('arrowText');
  this.sortDate = document.getElementById('sortDate');

  // Элементы связанные с поиском
  this.searchText = document.getElementById('search');
  this.datepickerSearch = document.getElementById('datepickerSearch');
  this.datepickerSearchButton = document.getElementById('datepickerSearchButton');

  // Элементы вне модальных окон
  this.table = document.getElementById('table');
}

export default elements;
