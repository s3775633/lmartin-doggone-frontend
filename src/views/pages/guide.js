import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false }, 'json')
      console.log("user updated")
      console.log(updatedUser)
    }catch{
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <style>
        .guide-image {
          border: solid 1px #000000;
          box-shadow: 3px 3px 8px 3px #888888;
        }
      </style>
      <va-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        
        <h3 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h3>
        <p>This is a quick tour to teach you the basics buying and selling dogs ...</p>
        
        <div class="guide-step">
          <h4>Search Dogs!</h4>
          <img class="guide-image" src="./images/search-guide.png">
        </div>
        
        <div class="guide-step">
          <h4>List your dogs!</h4>
          <img class="guide-image" src="./images/AddDog-guide.png">
        </div>
        
        <div class="guide-step">
          <h4>Add dogs to your watch list!</h4>
          <img class="guide-image" src="/images/favourites-guide.png">
        </div>
        
        <sl-button type="primary" @click=${() => gotoRoute('/')}>Okay got it!</sl-button>
        
          
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView