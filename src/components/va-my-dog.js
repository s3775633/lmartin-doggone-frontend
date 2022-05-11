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
            height: 350px;
        }
        .card-size {
          width: 100%;
        }
    </style>  
    <sl-card class="card-size">
        <img slot="image" src="${App.apiBase}/images/${this.image}" />
        <h2>${this.name}</h2>
        <h3>${this.breed}</h3>
        <p class="owner">${this.owner.firstName} ${this.owner.lastName}</p>
        <sl-button @click=${this.setSelectedDog}>Edit</sl-button>
        </sl-card>
    `
  }
  
})