import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
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
      .or-container {
        width: 100%;
        display: flex;
        margin: auto;
      }
      .or-left {
        margin-top: 25px;
        width: 40%;
        height: 2px;
        background-color: #C4C4C4;
      }
      .or-middle {
        width: 20%;
      }
      .or-right {
        margin-top: 25px;
        width: 40%;
        height: 2px;
        background-color: #C4C4C4;
      }
      .input-group {
        margin-bottom: 15px;
      }
      .register-btn {
        background-color: #5C753A;
        height: 40px;
        border: none;
        color: #ffffff;
        font-weight: 700;
        border-radius: 4px;
        cursor: pointer;
      }
      .register-btn:hover {
        background-color: #6f8f45;
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
      .signinup-logo {
        margin-bottom: 60px;
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
            <img class="signinup-logo" src="/images/logo.svg">  
              <h1>Login</h1>       
              <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
                <div class="input-group">
                  <sl-input name="email" type="email" placeholder="Email" required></sl-input>
                </div>
                <div class="input-group">
                  <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
                </div>
                <sl-button class="submit-btn" type="primary" submit style="width: 100%;">Sign In</sl-button>
              </sl-form>
              <div class="or-container">
                <div class="or-left">
                </div>
                <div class="or-middle">
                  <p>or</p>
                </div>
                <div class="or-right">
              </div>
              </div>
              <button class="register-btn" @click=${()=> gotoRoute('/signup')} submit style="width: 100%;">Register</button>
              </div>
          </div>
          <div class="right-panel">
            <h1 class="right-heading">Dog Gone</h1>
            <h2 class="right-subHeading">Helping you find your new best friend</h2>
            <img class="login-image" src="/images/login-dog.png">
          </div>
        </div>
      </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()