import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'


class FavouriteDogsView {
  async init(){
    document.title = 'Favourite Dogs'  
    this.favDogs = null  
    this.render()    
    Utils.pageIntroAnim()
    await this.getFavDogs()
    this.render()
    this.randTileColour()
  }

  async getFavDogs(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favDogs = currentUser.favouriteDogs
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  randTileColour()
  {
    const tiles = document.querySelectorAll('va-dog')
    const colours = ['#3F7294', '#5C753A', '#96785C', '#BE825B', '#493721', '#EDC895']
    console.log(tiles)
    for(let x = 0; x < tiles.length; x++)
    {
      console.log(tiles[x])
      tiles[x].style.backgroundColor = colours[Math.floor(Math.random() * 6)];
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