import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'
import MessageAPI from '../../MessageAPI'
import DogAPI from '../../DogAPI'
import Toast from '../../Toast'
import message from './message'

class MessagesView {
  async init(){
    document.title = 'Messages' 
    this.myMessages = null   
    this.dogsList = null
    this.userList = null
    this.dogMessages = null
    this.currentUser = null
    this.render()    
    Utils.pageIntroAnim()
    await this.getMyMessages()
  }

  async getMyMessages() {
    try{
      this.currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.myMessages = await MessageAPI.getMessages()
      this.userList = await UserAPI.getUsers()
      console.log(this.currentUser.accessLevel)
      // for buyer
      if(this.currentUser.accessLevel == 1) {
        this.myMessages = this.myMessages.filter(message => message.buyerId == this.currentUser._id)
        this.myMessages = this.removeDuplicates(this.myMessages, 'dogId')
        this.dogsList = await DogAPI.getDogs()
      }
      // for seller
      else{
        this.dogsList = await DogAPI.getDogs()
        this.dogsList = this.dogsList.filter(dog => dog.owner == this.currentUser._id)
        this.dogMessages = this.getMessages()
        this.dogMessages = this.removeDuplicates(this.dogMessages, 'buyerId') 
      }

      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  getDog(dogId) {
    for(let x = 0; x < this.dogsList.length; x++)
    {
      if(this.dogsList[x]._id == dogId)
      {
        return this.dogsList[x]
      }
    }
  }

  getBuyer(buyerId) {
    for(let x = 0; x < this.userList.length; x++)
    {
      if(this.userList[x]._id == buyerId)
      {
        return this.userList[x]
      }
    }
  }

  getMessages() {
    const dogMessages = []
    for(let x = 0; x < this.myMessages.length; x++)
    {
      for(let i = 0; i < this.dogsList.length; i++)
      {          
        if(this.myMessages[x].dogId == this.dogsList[i]._id)
        {
          dogMessages.push(this.myMessages[x])
        }
      }
    }
    return dogMessages
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
    ${(this.currentUser.accessLevel == 1) ? html`
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
          `)}
          `:html` 
      ${this.dogMessages.map(messages => 
        html`
          <va-message-content-alt class="message-info" 
            dogId="${messages.dogId}"
            buyerId="${this.getBuyer(messages.buyerId)._id}"
            buyerName="${this.getBuyer(messages.buyerId).firstName}"
            buyerImage="${this.getBuyer(messages.buyerId).image}"
            message="${messages.message}"
          >
          </va-message-content-alt>
          <hr>
          `)}
        `}
      `}
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MessagesView()