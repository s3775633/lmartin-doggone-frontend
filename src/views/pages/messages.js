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
import splash from './../../views/partials/splash'


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
    this.render()   
  }

  async getMyMessages() {
    try{
      this.currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.myMessages = await MessageAPI.getMessages()
      this.dogsList = await DogAPI.getDogs()
      this.userList = await UserAPI.getUsers()
      console.log(this.dogsList)
      // for buyer
      if(this.currentUser.accessLevel == 1) {
        this.myMessages = this.myMessages.filter(message => message.buyerId == this.currentUser._id)
        this.myMessages = this.removeDuplicates(this.myMessages, 'dogId')
        console.log(this.myMessages)
      }
      // for seller
      else{
        this.dogsList = this.dogsList.filter(dog => dog.owner == this.currentUser._id)
        this.dogMessages = this.getMessages()
        this.dogMessages = this.removeDuplicates(this.dogMessages, 'dogId') 
      }
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
      <div class="dog"></div>
      <h3 class="loading-message">Loading...</h3> 
    `:html` 
    ${(this.currentUser.accessLevel == 1) ? html`
      ${this.myMessages.map(messages => 
        html`
        <va-message-content class="message-info" 
            dogId="${messages.dogId}"
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
            buyerImage="${this.getBuyer(messages.buyerId).avatar}"
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