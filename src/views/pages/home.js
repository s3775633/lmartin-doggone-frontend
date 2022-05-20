import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from '../../Toast'
import DogAPI from './../../DogAPI'

class HomeView {
  async init(){    
    console.log('HomeView.init')
    document.title = 'Home'   
    this.dogs = null   
    this.render()    
    Utils.pageIntroAnim()   
    await this.getDogs() 
    this.render()
  }

  async getDogs() {
    try{
      this.dogs = await DogAPI.getDogs()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async searchDog() {
    await this.getDogs()
    let filteredDogs = this.dogs

    const searchVal = document.getElementById('search')
    filteredDogs = filteredDogs.filter(dog => dog.name.includes(searchVal.value) || dog.breed.includes(searchVal.value))

    this.dogs = filteredDogs
    this.render()
  }

  render(){
    const template = html`
    <style>
      .home-banner {
        position: relative;
        top: -10px;
        width: 100%;
        height: 300px;
        background-image: url('./../../images/banner.png');
        background-size: cover;
        background-repeat: no-repeat;
        padding: 0;
      }
      .page-content {
        padding: 0px;
      }
      .dogs-grid {
        padding: 5em;
      }
      .home-search {
        position: absolute;
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }      
      .home-search sl-icon {
        cursor: pointer;
      }
      
    </style>
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content">
        <div class="home-banner">
          <div class="input-group">
            <sl-input class="home-search" id="search" size="large" type="search" placeholder="Search Dogs" pill><sl-icon @click=${this.searchDog.bind(this)} name="search" slot="suffix"></sl-icon></sl-input>
          </div>
        </div>
        <div class="dogs-grid">
        ${this.dogs == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.dogs.map(dog => html`
            <va-dog class="dog-card" 
              id="${dog._id}"
              name="${dog.name}" 
              breed="${dog.breed}"
              owner="${JSON.stringify(dog.owner)}"
              size="${dog.size}"
              age="${dog.age}"
              nature="${dog.nature}"
              Energy="${dog.energy}"
              image="${dog.image}"
            >
            </va-dog>
          `)
          }
        `}
        </div>
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()