import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'
import MessageAPI from '../../MessageAPI'
import Toast from '../../Toast'

class MessagesView {
  async init(){
    document.title = 'Messages' 
    this.myMessages = null   
    this.render()    
    Utils.pageIntroAnim()
    await this.getMyMessages()
  }

  async getMyMessages() {
    try{
      // for buyer
      // for seller
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.myMessages = await MessageAPI.getMessages()
      this.myMessages = this.myMessages.filter(message => message.buyerId == currentUser._id)
      console.log(this.myMessages)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Messages" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">   
      ${(this.myMessages == null) ? html`
      <sl-spinner></sl-spinner>   
    `:html`  
      ${this.myMessages.map(messages => html`    
        <p>${messages.message}</p>
        `)
        }
      `}
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MessagesView()