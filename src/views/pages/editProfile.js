import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
      const fileTag = document.getElementById("file-upload")
      fileTag.addEventListener("change", event => {
        this.changeImage()
      });  
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    console.log("hello")
    const formData = e.detail.formData
    console.log(formData.get('accessLevel'))
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  changeImage() {
    var reader;
    const input = document.getElementById("file-upload")
    const preview = document.getElementById("image-preview")
  
    if (input.files && input.files[0]) {
      reader = new FileReader();
  
      reader.onload = function(e) {
        console.log(preview)
        preview.setAttribute('image', e.target.result);
      }
  
      reader.readAsDataURL(input.files[0]);
      }
    }

  render(){
    const template = html`
    <style>
    .profile-left {
      width: 30%;
      margin-top: 200px;
      text-align: center;
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
    .custom-file-upload {
      width: 200px;
      height: 40px;
      font-size: 13px;
      background-color: #5C753A;
      border: 1px solid #ccc;
      display: inline-block;
      padding: 12px 12px;
      cursor: pointer;
      border-radius: 4px;
      color: #ffffff;
      font-weight: 500;
      text-align: center;
    }
    input[type="file"] {
      display: none;
    }
    .submit-btn {
      width: 300px;
    }
    @media only screen and (max-width: 1100px) {
      .vertical-line {
        display: none;
      }
      .profile-left {
        width: 100%;
        margin-top: 50px;
      }
      .profile-right {
        width: 100%;
        margin-top: 30px;
      }
      .profile-container {
        display: block;
      }
    }
    @media only screen and (max-width: 600px) {
      .profile-details {
        width: 100%;
      }
      .profile-bio {
        width: 100%;
      }
    }
    </style>
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content"> 
      ${(this.user == null) ? html`
      <div class="dog"></div>
      <h3 class="loading-message">Loading...</h3>  
      `:html` 
      <div class="vertical-line"></div> 
      <sl-form @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>      
        <div class="profile-container">   
          <div class="profile-left" calign> 
          ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar id="image-preview" style="--size: 300px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
            `:html`
            <sl-avatar id="image-preview" style="--size: 300px; margin-bottom: 1em;"></sl-avatar>
            `}
            <div class="input-group" class="image-upload" style="margin-bottom: 2em;">
              <label class="custom-file-upload">Upload Image
                <input class="upload-button" id="file-upload" type="file" name="avatar"/>       
              </label>       
            </div>
            <sl-button type="primary" class="submit-btn" submit>Update Profile</sl-button>    
          </div>
          <div class="profile-right" calign>  
            <div class="profile-details">
                <div class="input-group">
                  <sl-input type="text" hidden name="accessLevel" value="${this.user.accessLevel}"></sl-input>
                </div>
                <div class="input-group">
                  <sl-input type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name"></sl-input>
                </div>
                <div class="input-group">
                  <sl-input type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name"></sl-input>
                </div>
                <div class="input-group">
                  <sl-input type="text" name="email" value="${this.user.email}" placeholder="Email Address"></sl-input>
                </div>  
                <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p> 
                </div> 
                <div class="profile-bio">
                  <div class="input-group">
                    <sl-textarea name="bio" rows="4" placeholder="Bio" value="${this.user.bio}">${this.user.bio}</sl-textarea>
                  </div>  
              </div>    
          </div>

        </div>
        </sl-form>
        `}
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()