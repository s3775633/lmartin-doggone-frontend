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
    const fileTag = document.getElementById("file-upload")
      fileTag.addEventListener("change", event => {
      this.changeImage()
    });
  }



  changeImage() {
  var reader;
  const input = document.getElementById("file-upload")
  const preview = document.getElementById("image-preview")

  if (input.files && input.files[0]) {
    reader = new FileReader();

    reader.onload = function(e) {
      console.log(preview)
      preview.setAttribute('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
    }
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
      // reset select inputs
      const selectInputs = document.querySelectorAll('sl-select')
      if(selectInputs) {
        selectInputs.forEach(select => select.value = '')
      }
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }

  }

  render(){
    const template = html`
      <style>
        .new-dog-menu {
          display: flex;
          flex-wrap: wrap;
        }
        .left-panel {
          padding: 20px;
          width: 40%;
          height: 100%;
        }
        .right-panel {
          padding: 20px;
          width: 60%;
          height: 100%;
        }
        #image-preview {
          width: 100%;
          height: 400px;
          background-image: url('./../../images/Upload-tile.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .new-dog-input {
          margin-bottom: 40px;
        }
        input[type="file"] {
          display: none;
        }
        .image-upload {
          margin-bottom: 10px !important;
        }
        .custom-file-upload {
          width: 200px;
          height: 40px;
          background-color: var(--brand-color);
          border: 1px solid #ccc;
          display: inline-block;
          padding: 9px 9px;
          cursor: pointer;
          border-radius: 4px;
          color: #ffffff;
          font-weight: 500;
          text-align: center;
        }
        .dog-submit {
          float: right;
          width: 200px;
        }
        @media only screen and (max-width: 800px) {
          .left-panel {
            width: 100%;
          }
          .right-panel {
            width: 100%;
          }
        }
      </style>
      <va-app-header title="New Dog" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">    
      <h1>New Dog</h1>    
        <sl-form class="form-signup" @sl-submit=${this.newDogSubmitHandler}>
        <input type="hidden" name="user" value="${Auth.currentUser._id}" />
        <div class="new-dog-menu">
          <div class="left-panel">
          <img id="image-preview"></img>
            <div id="input-group" class="image-upload" style="margin-bottom: 2em;">
              <label class="custom-file-upload">Upload Image
                <input class="upload-button" id="file-upload" type="file" name="image"/>       
              </label>       
            </div>
            <div class="input-group new-dog-input">
            <sl-textarea name="description" rows="6" placeholder="Description"></sl-textarea>
            </div>
          </div>
          <div class="right-panel">
            <div class="input-group new-dog-input">
              <sl-input name="name" type="text" placeholder="Dog Name" required></sl-input>
            </div>
            <div class="input-group new-dog-input">              
              <sl-select name="breed" placeholder="Breed" required>
                <sl-menu-item value="border collie">border collie</sl-menu-item>
                <sl-menu-item value="Dashhound">dashhound</sl-menu-item>
                <sl-menu-item value="great dane">great dane</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
              <sl-input name="age" placeholder="Age" required></sl-input>
            </div>
            <div class="input-group new-dog-input">
              <sl-select name="nature" placeholder="Nature" required>
                <sl-menu-item value="loving">loving</sl-menu-item>
                <sl-menu-item value="playful">playful</sl-menu-item>
                <sl-menu-item value="protective">protective</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
              <sl-select name="energy" placeholder="Energy" required>
                <sl-menu-item value="low" >low</sl-menu-item>
                <sl-menu-item value="medium">medium</sl-menu-item>
                <sl-menu-item value="high">high</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
              <sl-select name="size" placeholder="Size" required>
                <sl-menu-item value="small">small</sl-menu-item>
                <sl-menu-item value="medium">medium</sl-menu-item>
                <sl-menu-item value="large">large</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
              <sl-select name="sex" placeholder="Sex" required>
                <sl-menu-item value="male">male</sl-menu-item>
                <sl-menu-item value="female">female</sl-menu-item>
              </sl-select>
            </div>
            <sl-button type="primary" class="submit-btn dog-submit" submit>Add Dog</sl-button>
          </div>
        </div>
      </sl-form>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newDogView