import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html` 
    <style>
    .login-container {
      display: flex;
      width: 60%;
      height: 70%;
    }
    .left-panel {
      position: relative;
      width: 55%;
      height: 100%;
      background-color: #ffffff;
    }
    .right-panel {
      position: relative;
      width: 45%;
      height: 100%;
      background-color: var(--brand-color);
    }
    .signinup-box {
      max-width: none;
      position: absolute;
      width: 80%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .login-image {
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
    .right-heading {
      color: #ffffff;
      font-size: 50px;
      text-align: center;
      margin-top: 20px;
    }
    .right-subHeading {
      color: #ffffff;
      text-align: center;
    }
    @media only screen and (max-width: 1100px) {
      .right-panel {
        display: none;
      }
      .left-panel {
        width: 100%;
      }
    }
    @media only screen and (max-width: 600px) {
      .login-container {
        width: 100%;
      }
    }
    </style>     
      <div class="page-content page-centered">   
      <div class="login-container">
      <div class="left-panel">   
        <div class="signinup-box">
        <img class="signinup-logo" src="/images/logo-white-no-text.png">
          <h1>Sign Up</h1>
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>   
            <div class="input-group">
              <sl-select name="accessLevel" placeholder="I am a ...">
                <sl-menu-item value="1">Buyer</sl-menu-item>
                <sl-menu-item value="2">Seller</sl-menu-item>
              </sl-select>
            </div>         
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Sign Up</sl-button>
          </sl-form>
          <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>
      </div>
      <div class="right-panel">
      <h1 class="right-heading">Dog Gone</h1>
      <h2 class="right-subHeading">Helping you find your new best friend</h2>
      <img class="login-image" src="/images/register-dog.png">
    </div>
      </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()