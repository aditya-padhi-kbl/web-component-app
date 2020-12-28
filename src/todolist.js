import { css, html, LitElement } from 'lit-element';

class TodoList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        color: blue;
      }

      ol {
        list-style: none;
        padding: 0;
      }

      button {
        background-color: transparent;
        border: none;
      }
    `;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    if (!this.todos) {
      return html``;
    }

    return html`
      <ol>
        ${this.todos.map(
          (todo) => html`
            <li>
              <input
                type="checkbox"
                .checked=${todo.finished}
                @change=${(e) => this._changeTodoFinished(e, todo)}
              />
              ${todo.text}
              <button @click=${() => this._removeTodo(todo)}>X</button>
            </li>
          `,
        )}
      </ol>
    `;
  }

  _changeTodoFinished(e, changedTodo) {
    let eventDetails = Object.assign({}, changedTodo, {
      finished: e.target.checked,
    });
    this.dispatchEvent(
      new CustomEvent('change-todo-finished', { detail: eventDetails }),
    );
  }

  _removeTodo(item) {
    this.dispatchEvent(new CustomEvent('remove-todo', { detail: item }));
  }
}

customElements.define('todo-list', TodoList);
