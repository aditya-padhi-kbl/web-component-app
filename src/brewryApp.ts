import { customElement, html, LitElement, property } from 'lit-element';
import "@material/mwc-button";
import { BrewInterface } from './interfaces/brewInterface';
import BrewDetail from './brewDetail';

@customElement('brew-app')
export class BrewryApp extends LitElement {
  @property({type: Array})
  breweries: Array<BrewInterface> = [];
  @property({type: String})
  heading: String = '';
  @property({type: Boolean })
  loading = false;
  @property({type: String})
  filter: String = "";

  fetchBrewries() {
    this.loading = true;
    setTimeout( async () => {
      const response = await fetch('https://api.openbrewerydb.org/breweries');
    const jsonResponse: Array<BrewInterface> = await response.json();
    this.breweries = jsonResponse.map(param => {
      param["visited"] = false;
      return param;
    });
    this.loading = false;
    }, 1000)
    
  }
  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries.length) {
      this.fetchBrewries();
    }
  }

  _toggleVisitedStatus(breweryToUpdate: BrewInterface) {
    this.breweries = this.breweries.map(brewery => {
      return brewery === breweryToUpdate
        ? { ...brewery, visited: !brewery.visited }
        : brewery;
    });
  }

  filteredContent = (filterType: String) => {
    this.filter = filterType;
  }

  render() {
    if (this.loading) {
      return html `Loading ...`
    }
    let visitedBrews = this.breweries.filter(param => param.visited);
    let unvistedBrews = this.breweries.length - visitedBrews.length
    let breweries = [];
    if (this.filter === "visited") {
      breweries = this.breweries.filter(param => param.visited);
    } else if (this.filter === "unvisited") {
      breweries = this.breweries.filter(param => !param.visited)
    } else {
      breweries = this.breweries;
    }
    return html`
      <h2>${this.heading}</h2>
      <mwc-button raised @click=${() => this.filteredContent("visited")} label="Visited"></mwc-button>
      <mwc-button raised @click=${() => this.filteredContent("unvisited")} label="Un-Visited"></mwc-button>
      <mwc-button raised @click=${() => this.filteredContent("all")} label="All"></mwc-button>
      <p>The number of visited Brews: ${visitedBrews.length}</p>
      <p>The number of un-visited Brews: ${unvistedBrews}</p>

      <ul>
        ${breweries.map(brewry => html`<li>${BrewDetail(brewry, () => this._toggleVisitedStatus(brewry))}</li>`)}      
      </ul>
    `
  }
}
