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
    this.render()    
    Utils.pageIntroAnim()
    await this.getDog() 
    await this.getMyMessages()
  }

  async getMyMessages() {
    try{
      // for buyer
      // for seller
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.user = await UserAPI.getUser(Auth.currentUser._id)
      this.myMessages = await MessageAPI.getMessages()
      this.myMessages = this.myMessages.filter(message => message.buyerId == currentUser._id)
      this.myMessages = this.myMessages.filter(message => message.dogId == this.dog._id)
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

  render(){
    const template = html`
      <va-app-header title="Message" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">   
      ${(this.myMessages == null) ? html`
      <sl-spinner></sl-spinner>   
    `:html` 
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
            ${(messages.buyer == true) ? html` 
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
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MessageView()