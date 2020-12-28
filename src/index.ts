import './todo.js';
import { html, render } from 'lit-html';
import "./brewryApp.ts";
let rootElement = () => html`
  <todo-app></todo-app>
  <hr />
  
  <brew-app heading = "Brewry Details"></brew-app>
`;
render(rootElement(), document.getElementById('container'));
