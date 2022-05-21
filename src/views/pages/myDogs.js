import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import DogAPI from './../../DogAPI'
import Toast from '../../Toast'
import UserAPI from './../../UserAPI'

class myDogsView {
  async init(){
    document.title = 'My Dogs'
    this.myDogs = null      
    this.render()    
    Utils.pageIntroAnim()
    await this.getMyDogs()
    this.randTileColour()
  }

  async getMyDogs() {
    try{
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.myDogs = await DogAPI.getDogs()
      this.myDogs = this.myDogs.filter(dog => dog.owner == currentUser._id)
      console.log(this.myDogs)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  randTileColour()
  {
    const tiles = document.querySelectorAll('va-my-dog')
    const colours = ['#3F7294', '#5C753A', '#96785C', '#BE825B', '#493721', '#EDC895']
    console.log(tiles)
    for(let x = 0; x < tiles.length; x++)
    {
      tiles[x].style.backgroundColor = colours[Math.floor(Math.random() * 6)];
    }
  }

  render(){
    const template = html`
      <va-app-header title="My Dogs" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <div class="dogs-grid">
        ${this.myDogs == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.myDogs.map(dog => html`
            <va-my-dog class="dog-card" 
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
            </va-my-dog>
          `)
          }
        `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new myDogsView