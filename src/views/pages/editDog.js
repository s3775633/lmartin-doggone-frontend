import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import DogAPI from '../../DogAPI'
import Toast from '../../Toast'

class EditDogView {
  init(){
    console.log('EditDogView.init')
    document.title = 'Edit Dog'
    this.dog = null  
    this.render()   
    Utils.pageIntroAnim()
    this.getDog()     
  }

  async getDog(){
    try {
      this.dog = await DogAPI.getDog(DogAPI.currentDog) 
      this.render()
      const fileTag = document.getElementById("file-upload")
      fileTag.addEventListener("change", event => {
        this.changeImage()
      });  
    }catch(err){
      Toast.show(err, 'error')
    }
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

  async editDogSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedDog = await DogAPI.updateDog(DogAPI.currentDog, formData)           
      this.dog = updatedDog     
      DogAPI.currentDog = updatedDog
      gotoRoute('/myDogs')
      Toast.show('Dog updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
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
          margin-bottom: 25px;
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
      <va-app-header title="Edit Dog" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
      ${(this.dog == null) ? html`
        <sl-spinner></sl-spinner>   
      `:html` 
        <sl-form class="form-signup" @sl-submit=${this.editDogSubmitHandler}>
        <input type="hidden" name="owner" value="${Auth.currentUser._id}" />
        <input type="hidden" name="_id" value="${this.dog._id}" />
        <div class="new-dog-menu">
          <div class="left-panel">
          <img id="image-preview" src="${App.apiBase}/images/${this.dog.image}"></img>
            <div id="input-group" class="image-upload" style="margin-bottom: 2em;">
              <label class="custom-file-upload">Upload Image
                <input class="upload-button" id="file-upload" type="file" name="image"/>       
              </label>       
            </div>
            <div class="input-group new-dog-input">
            <sl-textarea name="description" rows="6" placeholder="Description" value="${this.dog.description}"></sl-textarea>
            </div>
          </div>
          <div class="right-panel">
            <div class="input-group new-dog-input">
            <label>Name</label>
              <sl-input name="name" type="text" placeholder="Dog Name" value="${this.dog.name}" required></sl-input>
            </div>
            <div class="input-group new-dog-input">    
            <label>Breed</label>          
              <sl-select name="breed" placeholder="Breed" value="${this.dog.breed}" required>
                <sl-menu-item value="border collie">border collie</sl-menu-item>
                <sl-menu-item value="Dashhound">dashhound</sl-menu-item>
                <sl-menu-item value="great dane">great dane</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
            <label>Age</label>
              <sl-input name="age" placeholder="Age" value="${this.dog.age}" required></sl-input>
            </div>
            <div class="input-group new-dog-input">
            <label>Nature</label>
              <sl-select name="nature" placeholder="Nature" value="${this.dog.nature}" required>
                <sl-menu-item value="loving">loving</sl-menu-item>
                <sl-menu-item value="playful">playful</sl-menu-item>
                <sl-menu-item value="protective">protective</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
            <label>Energy</label>
              <sl-select name="energy" placeholder="Energy" value="${this.dog.energy}" required>
                <sl-menu-item value="low" >low</sl-menu-item>
                <sl-menu-item value="medium">medium</sl-menu-item>
                <sl-menu-item value="high">high</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
            <label>Size</label>
              <sl-select name="size" placeholder="Size" value="${this.dog.size}" required>
                <sl-menu-item value="small">small</sl-menu-item>
                <sl-menu-item value="medium">medium</sl-menu-item>
                <sl-menu-item value="large">large</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group new-dog-input">
            <label>Sex</label>
              <sl-select name="sex" placeholder="Sex" value="${this.dog.sex}" required>
                <sl-menu-item value="male">male</sl-menu-item>
                <sl-menu-item value="female">female</sl-menu-item>
              </sl-select>
            </div>
            <sl-button type="primary" class="submit-btn dog-submit" submit>Edit Dog</sl-button>
          </div>
        </div>
      </sl-form>
      `}
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new EditDogView