import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import MessageAPI from '../../MessageAPI'
import DogAPI from '../../DogAPI'
import Toast from '../../Toast'

class MessageView {
  async init(){
    document.title = 'Message' 
    this.myMessages = null   
    this.dog = null 
    this.user = null
    this.buyerId = null
    this.dogId = null
    this.buyer = null
    this.render()    
    Utils.pageIntroAnim()
    await this.getDog() 
    await this.getMyMessages()
  }

  async getMyMessages() {
    try{
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.user = await UserAPI.getUser(Auth.currentUser._id)
      this.myMessages = await MessageAPI.getMessages()
      // for buyer
      if(currentUser.accessLevel == 1) {
        this.myMessages = this.myMessages.filter(message => message.buyerId == currentUser._id)
        this.myMessages = this.myMessages.filter(message => message.dogId == this.dog._id)
      } else {
        // for seller
        this.myMessages = this.myMessages.filter(message => message.dogId == this.dog._id)
      }
      this.buyerId = this.myMessages[0].buyerId
      this.dogId = this.myMessages[0].dogId
      if(currentUser.accessLevel == 1)
      {
        this.buyer = true;
      }
      else {
        this.buyer = false;
      }
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async getDog(){
    try {
      this.dog = await DogAPI.getDog(DogAPI.currentDog) 
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
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
      gotoRoute('/message')
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Message" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">   
      ${(this.myMessages == null) ? html`
      <sl-spinner></sl-spinner>   
    `:html` 
    <va-message-content class="message-info" 
    dogId="${this.dog._id}"
    dogName="${this.dog.name}"
    dogImage="${this.dog.image}"
    >
    </va-message-content>
    <hr>
      ${this.myMessages.map(messages => 
        html`
          <div>
          ${(this.user.accessLevel == 1) ? html`
            ${(messages.buyer == true) ? html` 
              <div class="message-sent-buyer">
                <p>${messages.message}</p>
              </div>
            `:html` 
              <div class="message-received-seller">
                <p>${messages.message}</p>
              </div>
            `}
          `:html` 
            ${(messages.buyer != true) ? html` 
              <div class="message-sent-seller">
                <p>${messages.message}</p>
              </div>
            `:html` 
              <div class="message-received-buyer">
                <p>${messages.message}</p>
              </div>
            `}
          `}
          </div>
        </div>
        `)
        }
      `}
      <sl-form class="form-signup" @sl-submit=${this.newMessageSubmitHandler}>
        <sl-input hidden name="buyerId" value=${this.buyerId}></sl-input>
        <sl-input hidden name="dogId" value=${this.dogId}></sl-input>
        <sl-input hidden name="buyer" value=${this.buyer}></sl-input>
        <sl-textarea rows="6" name="message" placeholder="New Message"></sl-textarea>
        <p></p>
        <sl-button type="primary" class="submit-btn dog-submit" submit>Send Message</sl-button>
      </sl-form>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MessageView()