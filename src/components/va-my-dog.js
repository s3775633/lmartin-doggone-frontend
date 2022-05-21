import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import DogAPI from '../DogAPI'
import Toast from '../Toast'

customElements.define('va-my-dog', class Dog extends LitElement {

  constructor(){
    super()  
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      name: {
        type: String
      } ,
      breed: {
        type: String
      },
      owner: {
        type: Object
      },
      size: {
        type: String
      },
      age: {
        type: Number
      },      
      nature: {
        type: String
      },
      energy: {
        type: String
      },
      image: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  testHandler(){
    alert("test")
  }

  setSelectedDog(){
    DogAPI.currentDog = this.id
    gotoRoute('/editDog')
  }
  
  render(){    
    return html`
    <style>
        .owner {
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.9;
        }
        .image {
            width: 50%;
        }
        img {
            width: 100%;
            height: 250px;
        }
        .card-size {
          width: 100%;
        }
        sl-card {
          --sl-color-white: none;
          width: 100%;
          color: #ffffff;
        }
        .info-button {
          height: 40px;
          background-color: #ffffff;
          width: 100px;
          border: none;
          border-radius: 4px;
          box-shadow: 1px 2px 9px 0px #000000;
          cursor: pointer;
        }
        .info-button:hover {
          background-color: #C4C4C4;
        }
        .dog-heading {
          margin: 0;
        }
        .dogs-grid {
          display: flex;
          flex-wrap: wrap;
          > .dog-card {
            width: calc(25% - 1em);
            margin: 0.5em;
          }
        }
        .dog-tile-container {
          display: flex;
        }
    </style>  
    <sl-card @click=${this.setSelectedDog} class="card-size">
        <img slot="image" src="${App.apiBase}/images/${this.image}" />
        <div class="dog-tile-container">
           <h2 class="dog-heading">${this.name}</h2>
        </div>
        </sl-card>
    `
  }
  
})