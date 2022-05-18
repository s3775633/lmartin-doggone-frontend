import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import DogAPI from '../DogAPI'
import Toast from '../Toast'

customElements.define('va-message-content', class Message extends LitElement {

  constructor(){
    super()  
  }

  static get properties(){
    return {
      dogId: {
        type: String
      },
      dogName: {
        type: String
      },
      dogImage: {
        type: String
      },
      message: {
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
    DogAPI.currentDog = this.dogId
    gotoRoute('/message')
  }
  
  render(){    
    return html` 
    <style>
      .message-info {
        width: 100%;
        display: flex;
        margin-bottom: 15px;
        margin-top: 15px;
      }
      
      .message-image {
        height: 200px;
        width: 200px;
        border-radius: 500px;
      }
      
      .message-left {
        width: 25%;
      }
      
      .message-right {
        margin-top: 55px;
        width: 75%;
      }
    </style>
    <div class="message-info" @click=${this.setSelectedDog}>
    <div class="message-left">
      <img class="message-image" src="${App.apiBase}/images/${this.dogImage}" />
      </div>
        <div class="message-right">
        <h1>${this.dogName}</h1>
        <p>${this.message}</p>
      </div>
    </div>
    `
  }
  
})