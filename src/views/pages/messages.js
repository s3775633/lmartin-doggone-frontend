import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'
import MessageAPI from '../../MessageAPI'
import DogAPI from '../../DogAPI'
import Toast from '../../Toast'

class MessagesView {
  async init(){
    document.title = 'Messages' 
    this.myMessages = null   
    this.dogsList = null
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
      this.myMessages = this.removeDuplicates(this.myMessages, 'dogId')
      this.dogsList = await DogAPI.getDogs()
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  getDog(dogId) {
    for(let x = 0; this.dogsList.length; x++)
    {
      if(this.dogsList[x]._id == dogId)
      {
        return this.dogsList[x]
      }
    }
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
    })  
}

  render(){
    const template = html`
      <va-app-header title="Messages" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">   
      ${(this.myMessages == null) ? html`
      <sl-spinner></sl-spinner>   
    `:html` 
      ${this.myMessages.map(messages => 
        html`
        <va-message-content class="message-info" 
          dogId="${this.getDog(messages.dogId)._id}"
          dogName="${this.getDog(messages.dogId).name}"
          dogImage="${this.getDog(messages.dogId).image}"
          message="${messages.message}"
          >
          </va-message-content>
          <hr>
        `)
        }
      `}
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MessagesView()