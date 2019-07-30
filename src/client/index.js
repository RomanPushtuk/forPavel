import './styles.css';
import View from './mvc/View';
import Controller from './mvc/Controller';
import Model from './mvc/Model';
import { load } from './mvc/helpers';

// Закоментировать потом когда надо.
localStorage.setItem(
  'addToStorage',
  '[{"name":"а","time":"07/18/2019","id":"_snrme1oci","checked":false},{"name":"б","time":"07/18/2019","id":"_4q7lci865","checked":false},{"name":"в","time":"07/18/2019","id":"_yu7ssf3wj","checked":false},{"name":"Доработки","time":"07/05/2019","id":"_nffzdupxf","checked":false},{"name":"Завершение проекта","time":"07/04/2019","id":"_9h9olaj2r","checked":false},{"name":"Написать todo","time":"07/01/2019","id":"_en3fjh221","checked":false},{"name":"Нарисовать схему","time":"07/02/2019","id":"_ut9rd5x82","checked":false},{"name":"Начало проекта","time":"06/28/2019","id":"_b5eih4kjs","checked":false},{"name":"Начать разработку","time":"07/02/2019","id":"_er0c8ydj2","checked":false},{"name":"Обозначить детали","time":"07/02/2019","id":"_z9rrfs4dl","checked":false},{"name":"Разбить на компоненты","time":"07/02/2019","id":"_rbzd3ez1b","checked":false},{"name":"Разработка Controller","time":"07/03/2019","id":"_eeruwnlw9","checked":false},{"name":"Разработка Model","time":"07/03/2019","id":"_lvend5nbu","checked":false},{"name":"Разработка View","time":"07/03/2019","id":"_20dyxmdsf","checked":false},{"name":"Сверстать todo list","time":"07/01/2019","id":"_jbfjsiiy3","checked":false},{"name":"Сделать дизайн todo","time":"07/01/2019","id":"_odn62mj48","checked":false},{"name":"аб","time":"07/19/2019","id":"_63x32pnbt","checked":false},{"name":"ав","time":"07/19/2019","id":"_elwfjzzhb","checked":false}]'
);
const todo = load();

const model = new Model(todo);
const view = new View();
const controller = new Controller(model, view);
