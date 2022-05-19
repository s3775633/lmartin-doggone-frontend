import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import DogAPI from '../DogAPI'
import Toast from '../Toast'

customElements.define('va-message-content-alt', class Message extends LitElement {

  constructor(){
    super()  
  }

  static get properties(){
    return {
      dogId: {
        type: String
      },
      buyerId: {
        type: String
      },
      buyerName: {
        type: String
      },
      buyerImage: {
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

  setSelectedBuyer(){
    UserAPI.currentBuyer = this.buyerId
    gotoRoute('/message')
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
      ${(this.buyerImage != '')? html `
        <img class="message-image" src="${App.apiBase}/images/${this.buyerImage}" />
      ` : `
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
      `}


      </div>
        <div class="message-right">
        <h1>${this.buyerName}</h1>
        <p>${this.message}</p>
      </div>
    </div>
    `
  }
  
})