import { html } from "lit-element";
import { BrewInterface } from "./interfaces/brewInterface";
import "@material/mwc-button";

const BrewDetail = (brew: BrewInterface, callBack: Function) => {
    return html`
            <h3>${brew.name} ${brew.visited}</h3>
            <p>Brewer Type ${brew.brewery_type}</p>
            <p>City:- ${brew.city}</p>
            <mwc-button raised @click=${callBack}>Mark as ${brew.visited ? 'not-visited': 'visited'}</mwc-button>
        `
}
  
export default BrewDetail;