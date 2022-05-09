import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import DogAPI from './../../DogAPI'
import Toast from '../../Toast'
import { selector } from 'gsap'

class DogsView {
  async init(){
    document.title = 'Dogs'  
    this.dogs = null  
    this.render()    
    Utils.pageIntroAnim()
    await this.getDogs()
    //this.filterDogs('age', '1-3')
  }

  async filterDogs(field, match)
  {
    // Validate
    if(!field || !match) return

    // get fresh copy of dogs
    this.dogs = await DogAPI.getDogs()
    
    const breed = document.getElementById('breed').value
    const sex = document.getElementById('sex').value
    const size = document.getElementById('size').value
    const age = document.getElementById('age').value
    const nature = document.getElementById('nature').value
    const energy = document.getElementById('energy').value

    console.log(breed)
    console.log(sex)
    console.log(size)
    console.log(age)
    console.log(nature)
    console.log(energy)

    let filteredDogs = this.dogs
   
    // sex
    if(sex){
      console.log("hello")
      filteredDogs = filteredDogs.filter(dog => dog.sex == sex)
    }

    // breed
    if(breed){
      filteredDogs = filteredDogs.filter(dog => dog.breed == breed)
    }

    // age
    if(age){
      // age ranges
      const ageRangeStart = age.split('-')[0]
      const ageRangeEnd = age.split('-')[1]
      filteredDogs = filteredDogs.filter(dog => dog.age >= ageRangeStart && dog.age <= ageRangeEnd)
    }

    if(size){
      filteredDogs = filteredDogs.filter(dog => dog.size == size)
    }

    if(nature){
      filteredDogs = filteredDogs.filter(dog => dog.nature == nature)
    }

    if(energy){
      filteredDogs = filteredDogs.filter(dog => dog.energy == energy)
    }

    // render
    this.dogs = filteredDogs
    this.render()
  }

  clearFilterButtons(){
    // reset buttons
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach(btn => btn.removeAttribute("type"))
  }

  handleFilterButton(e)
  {
    // reset buttons
    this.clearFilterButtons()

    // set button active
    e.target.setAttribute("type", "primary")

    // extract field and match
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")

    // filter dogs
    this.filterDogs(field, match)
  }

  clearFilters(){
    this.getDogs()
    this.clearFilterButtons()
  }

  async getDogs() {
    try{
      this.dogs = await DogAPI.getDogs()
      console.log(this.dogs)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
    <style>
      .filter-menu {
        dislay: flex;
        align: center;
      }

      .filter-menu > div {
        margin-right: 1em;
      }

      .dog-select {
        width: 10%;
        float: left;
      }
    </style>
      <va-app-header title="Dogs" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
    <div class="filter-menu">
      <div>Filter by</div>
      <div>
        <sl-select class="dog-select" id="breed" placeholder="Breed" clearable>
          <sl-menu-item data-field="breed" data-match="border collie" value="border collie" @click=${this.handleFilterButton.bind(this)}>border collie</sl-menu-item>
          <sl-menu-item data-field="breed" data-match="Dashhound" value="Dashhound" @click=${this.handleFilterButton.bind(this)}>dashhound</sl-menu-item>
          <sl-menu-item data-field="breed" data-match="great dane" value="great dane" @click=${this.handleFilterButton.bind(this)}>great dane</sl-menu-item>
        </sl-select>
          <sl-select class="dog-select" id="sex" placeholder="Sex" clearable>
          <sl-menu-item data-field="sex" data-match="male" value="male" @click=${this.handleFilterButton.bind(this)}>male</sl-menu-item>
          <sl-menu-item data-field="sex" data-match="female" value="female" @click=${this.handleFilterButton.bind(this)}>female</sl-menu-item>
        </sl-select>
        </sl-select>
        <sl-select class="dog-select" id="age" placeholder="Age" clearable>
          <sl-menu-item data-field="age" data-match="0-5" value="0-5" @click=${this.handleFilterButton.bind(this)}>0-5</sl-menu-item>
          <sl-menu-item data-field="age" data-match="6-10" value="6-10" @click=${this.handleFilterButton.bind(this)}>6-10</sl-menu-item>
          <sl-menu-item data-field="age" data-match="11-15" value="11-15" @click=${this.handleFilterButton.bind(this)}>11-15</sl-menu-item>
          <sl-menu-item data-field="age" data-match="6-10" value="16-20" @click=${this.handleFilterButton.bind(this)}>16-20</sl-menu-item>
        </sl-select>
        <sl-select class="dog-select" id="size" placeholder="Size" clearable>
          <sl-menu-item data-field="size" data-match="small" value="small" @click=${this.handleFilterButton.bind(this)}>small</sl-menu-item>
          <sl-menu-item data-field="size" data-match="medium" value="medium" @click=${this.handleFilterButton.bind(this)}>medium</sl-menu-item>
          <sl-menu-item data-field="size" data-match="large" value="large" @click=${this.handleFilterButton.bind(this)}>large</sl-menu-item>
        </sl-select>
          <sl-select class="dog-select" id="nature" placeholder="Nature" clearable>
          <sl-menu-item data-field="nature" data-match="loving" value="loving" @click=${this.handleFilterButton.bind(this)}>loving</sl-menu-item>
          <sl-menu-item data-field="nature" data-match="playful" value="playful" @click=${this.handleFilterButton.bind(this)}>playful</sl-menu-item>
          <sl-menu-item data-field="nature" data-match="protective" value="protective" @click=${this.handleFilterButton.bind(this)}>protective</sl-menu-item>
        </sl-select>
          <sl-select class="dog-select" id="energy" placeholder="Energy" clearable>
          <sl-menu-item data-field="energy" data-match="low" value="low" @click=${this.handleFilterButton.bind(this)}>low</sl-menu-item>
          <sl-menu-item data-field="energy" data-match="medium" value="medium" @click=${this.handleFilterButton.bind(this)}>medium</sl-menu-item>
          <sl-menu-item data-field="energy" data-match="high" value="high" @click=${this.handleFilterButton.bind(this)}>high</sl-menu-item>
        </sl-select>
        <sl-button size="medium" @click=${this.clearFilters.bind(this)}>Clear Filters</sl-button>
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


export default new DogsView