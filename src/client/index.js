import './styles.css';
import View from './mvc/View';
import Controller from './mvc/Controller';
import Model from './mvc/Model';
import { load } from './mvc/helpers'

const todo = load();

const model = new Model(todo);
const view = new View();
const controller = new Controller(model, view);
