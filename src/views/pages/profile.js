import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
    <style>
      .profile-left {
        width: 30%;
        margin-top: 200px;
      }
      .profile-right {
        width: 70%;
        margin-top: 200px;
      }
      .profile-right p {
        font-weight: bold;
        font-size: 20px;
      }
      .profile-container {
        display: flex;
      }
      .profile-details {
        width: 70%;
        background-color: #ffffff;
        margin: auto;
        padding: 20px;
        border-radius: 20px;
        margin-bottom: 50px;
        border: solid 8px #493721;
      }
      .profile-bio {
        width: 70%;
        background-color: #ffffff;
        margin: auto;
        padding: 20px;
        border-radius: 20px;
        border: solid 8px #BE825B;
      }
      .vertical-line {
        position: absolute;
        top: 0;
        left: 30%;
        background-color: #c4c4c4;
        width: 5px;
        height: 100%;
      }
    </style>
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign"> 
      <div class="profile-container">   
        <div class="profile-left" calign>    
          ${Auth.currentUser && Auth.currentUser.avatar ? html`
            <sl-avatar style="--size: 300px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
          `:html`
          <sl-avatar style="--size: 300px; margin-bottom: 1em;"></sl-avatar>
          `}
          <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
          <p></p>
          <sl-button  @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
          <div class="vertical-line"></div>
        </div>
          <div class="profile-right" calign>  
            <div class="profile-details">
              <p>Email: ${Auth.currentUser.email}</p>
                ${(Auth.currentUser.accessLevel == 1) ? html`
                  <p>Account Type: Buyer</p>
                ` : html `
                  <p>Account Type: Seller</p>
                `}
                <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
              </div>
              ${Auth.currentUser.bio ? html`
              <h3>Bio</h3>
              <div class="profile-bio">
              <p>${Auth.currentUser.bio}</p>
            ` :html``}
          </div>
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()