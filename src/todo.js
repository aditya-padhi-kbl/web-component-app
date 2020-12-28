// Import lit-html functions

import { LitElement, html } from 'lit-element';
import './todolist.js';
import './coolHeading.js';

class TodoApp extends LitElement {
  static get properties() {
    return { todos: { type: Array } };
  }

  constructor() {
    super();
    this.todos = [
      { text: 'Do A', finished: true },
      { text: 'Do B', finished: false },
      { text: 'Do C', finished: false },
    ];
  }
  connectedCallback() {
    super.connectedCallback();
  }

  _addTodo() {
    const input = this.shadowRoot.getElementById('todoInput');
    const text = input.value;
    if (!text) return;
    input.value = '';
    this.todos = [...this.todos, { text, finished: false }];
  }

  _deleteTodo(todo) {
    const { text } = todo.detail;
    this.todos = this.todos.filter((param) => param.text !== text);
  }

  _changeToFinished(event) {
    event.stopPropagation();
    event.preventDefault();
    let { text, finished } = event.detail;
    console.log(text, finished);
    this.todos = this.todos.map((param) => {
      if (param.text === text) {
        param.finished = finished;
      }
      return param;
    });
  }
  render() {
    const completed = this.todos.filter((param) => param.finished).length;
    const pending = this.todos.length - completed;
    return html`
      <cool-heading></cool-heading>
      <input id="todoInput" placeholder="todo" />
      <button @click=${this._addTodo}>Add</button>
      <todo-list
        .todos=${this.todos}
        @change-todo-finished=${this._changeToFinished}
        @remove-todo=${this._deleteTodo}
      >
      </todo-list>
      <div>Total finished:- ${completed}</div>
      <div>Total unfinished:- ${pending}</div>
    `;
  }
}

customElements.define('todo-app', TodoApp);
// Render the template with some data
