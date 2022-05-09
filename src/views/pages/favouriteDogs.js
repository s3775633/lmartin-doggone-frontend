import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'


class FavouriteDogsView {
  init(){
    document.title = 'Favourite Dogs'  
    this.favDogs = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getFavDogs()
  }

  async getFavDogs(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favDogs = currentUser.favouriteDogs
      console.log(this.favDogs)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Watch List" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 
      <div class="dogs-grid">
        ${this.favDogs == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favDogs.map(dog => html`
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
          `)}
        `}
        </div>      
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new FavouriteDogsView