import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import DogAPI from './../../DogAPI'
import Toast from '../../Toast'

class newDogView {
  init(){
    document.title = 'New Dog'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newDogSubmitHandler(e) {
    e.preventDefault()  
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      await DogAPI.newDog(formData)
      Toast.show("Dog Added!")
      submitBtn.removeAttribute('loading')
      // reset form
      // text + textarea fields
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) {
        textInputs.forEach(textInput => textInput.value = null)
      }
      // reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if(radioInputs) {
        radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
      }
      // reset image input
      const fileInput = document.querySelector('input[type=file]')
      if(fileInput) {
        fileInput.value = null
      }
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }

  }

  render(){
    const template = html`
      <va-app-header title="New Dog" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">    
      <h1>New Dog</h1>    
        <sl-form class="form-signup" @sl-submit=${this.newDogSubmitHandler}>
        <input type="hidden" name="user" value="${Auth.currentUser._id}" />
        <div class="input-group">
          <sl-input name="name" type="text" placeholder="Dog Name" required></sl-input>
        </div>
        <div class="input-group">              
          <sl-input name="breed" type="text" placeholder="Breed" required>
          </sl-input>
        </div>
        <div class="input-group">
        <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
        </div>
        <div class="input-group">
          <sl-input name="age" placeholder="Age"></sl-input>
        </div>
        <div class="input-group">
          <sl-input name="nature" placeholder="Nature"></sl-input>
        </div>
        <div class="input-group">
          <sl-input name="energy" placeholder="Energy"></sl-input>
        </div>
        <div class="input-group" style="margin-bottom: 2em;">
          <label>Image</label><br>
          <input type="file" name="image"/>              
        </div>
        <div class="input-group" style="margin-bottom: 2em;">
          <label>Size</label><br>
          <sl-radio-group label="Select size" no-fieldset>
            <sl-radio name="size" value="small">Small</sl-radio>
            <sl-radio name="size" value="medium">Medium</sl-radio>
            <sl-radio name="size" value="large">Large</sl-radio>
          </sl-radio-group>
        </div>
        <div class="input-group" style="margin-bottom: 2em;">
          <label>Sex</label><br>
          <sl-radio-group label="Select sex" no-fieldset>
            <sl-radio name="sex" value="male">Male</sl-radio>
            <sl-radio name="sex" value="female">Female</sl-radio>
          </sl-radio-group>
        </div>
        <sl-button type="primary" class="submit-btn" submit>Add Dog</sl-button>
      </sl-form>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newDogView