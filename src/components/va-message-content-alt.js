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
        height: 150px;
        width: 150px;
        border-radius: 500px;
      }
      
      .message-left {
        width: 200px;
      }
      
      .message-right {
        margin-top: 0;
        width: 75%;
      }
      .message-heading {
        margin-top: 30px;
        margin-bottom: 0vw;
        font-size: 45px;
      }
      .message-para {
        margin-top: 0vw;
        margin-bottom: 0vw;
      }
      @media only screen and (max-width: 1100px) {
        .message-heading {
          font-size: 4vw;
          margin-top: 3vw;
        }
        .message-image {
          height: 13vw;
          width: 13vw;
          border-radius: 500px;
        }
        .message-left {
          width: 17vw;
        }
      }
      @media only screen and (max-width: 600px) {
        .message-heading {
          font-size: 5vw;
        }
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
        <h1 class="message-heading">${this.buyerName}</h1>
        <p class="message-para">${this.message}</p>
      </div>
    </div>
    `
  }
  
})