import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'
import MessageAPI from './../MessageAPI'

customElements.define('va-dog', class Dog extends LitElement {
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

  async newMessageSubmitHandler(e) {
    e.preventDefault()  
    const submitBtn = document.querySelector('.submit-btn')
    const formData = e.detail.formData
    if(formData.get('message') == '')
    {
      return
    }
    submitBtn.setAttribute('loading', '')  
    try{
      await MessageAPI.newMessage(formData)
      submitBtn.removeAttribute('loading')
      // reset form
      // text + textarea fields
      const textInputs = document.querySelectorAll('sl-textarea')
      if(textInputs) {
        textInputs.forEach(textInput => textInput.value = null)
      }
      Toast.show('Message Sent')
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  }

  moreInfoHandler() {
      // Create sl-dialog
      const dialogEl = document.createElement('sl-dialog')
      // add class name
      dialogEl.className = 'dog-dialog'
      // sl-dialog content
      const dialogContent = html`
      <style>
        .wrap {
            display: flex;
        }
        .image {
            width: 50%;
        }
        .image img {
            width: 100%;
            height: 400px;
        }
        .content {
            padding-left: 1em;
            width: 100%;
        }
        .gender span,
        .length span {
            text-transform: uppercase;
            font-weight: bold;
        }
        @media only screen and (max-width: 1100px) {
          .image {
            margin-top: 30px;
            width: 100%;
          }
          .wrap {
            display: block;
          }
          .content {
            padding-left: 0;
          }
          .image img {
            height: none;
          }
        }
        @media only screen and (max-width: 600px) {
        }
        </style>
        <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
        </div>
        <div class="content">
            <h1>${this.name}</h1>
            <p>Breed: <span>${this.breed}</span></p>
            <p class="size">Size: <span>${this.size}</span></p>
            <p class="age">Age: <span>${this.age}</span></p>
            <p class="nature">Nature: <span>${this.nature}</span></p>
            <sl-form class="form-signup" @sl-submit=${this.newMessageSubmitHandler}>
              <sl-input hidden name="buyerId" value=${Auth.currentUser._id}></sl-input>
              <sl-input hidden name="dogId" value=${this.id}></sl-input>
              <sl-input hidden name="buyer" value=${true}></sl-input>
              <sl-textarea rows="6" name="message" placeholder="New Message"></sl-textarea>
              <p></p>
              <sl-button @click=${this.addFavHandler.bind(this)}>
              <sl-icon slot="prefix" name="heart-fill"></sl-icon>
              Add to Favourites
              </sl-button>
              <sl-button type="primary" class="submit-btn dog-submit" submit>Send Message</sl-button>
            </sl-form>
        </div>
        </div>
      `
      render(dialogContent, dialogEl)
      // append to document.body
      document.body.append(dialogEl)

      // show dialog
      dialogEl.show()

      // on hide delete
      dialogEl.addEventListener('sl-after-hide', () => {
          dialogEl.remove()
      })


  }

  async addFavHandler(){    
    try {
      const currentUser = Auth.currentUser
      console.log(currentUser.favouriteDogs)
      let favCheck = false
      for(let x = 0; x < currentUser.favouriteDogs.length; x++)
      {
        if(this.id == currentUser.favouriteDogs[x])
        {

          favCheck = true
        }
      }
      if(!favCheck)
      {
        await UserAPI.addFavDog(this.id)
        Toast.show('Dog added to favourites')
      }
      else{
        Toast.show('Dog is already in favourites')
      }
    }catch(err){
      Toast.show(err, 'error')
    }
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
    </style>  
    <sl-card @click=${this.moreInfoHandler} class="card-size">
        <img class="listing-image" slot="image" src="${App.apiBase}/images/${this.image}" />
        <h2 class="dog-heading">${this.name}</h2>
        </sl-card>
    `
  }
  
})