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
    const filterSelects = document.querySelectorAll("sl-select")
    filterSelects.forEach(select => select.addEventListener('sl-change', event => {
      this.filterDogs();
    }));
    await this.getDogs()
  }

  async filterDogs()
  {
    // get fresh copy of dogs
    this.dogs = await DogAPI.getDogs()
    
    const breed = document.getElementById('breed').value
    const sex = document.getElementById('sex').value
    const size = document.getElementById('size').value
    const age = document.getElementById('age').value
    const nature = document.getElementById('nature').value
    const energy = document.getElementById('energy').value

    let filteredDogs = this.dogs
   
    // sex
    if(sex){
      filteredDogs = filteredDogs.filter(dog => dog.sex == sex)
    }

    // breed
    if(breed){
      filteredDogs = filteredDogs.filter(dog => dog.breed == breed)
    }

    // age
    if(age){
      // age ranges
      if(age != '16+')
      {
        const ageRangeStart = age.split('-')[0]
        const ageRangeEnd = age.split('-')[1]
        filteredDogs = filteredDogs.filter(dog => dog.age >= ageRangeStart && dog.age <= ageRangeEnd)
      } else {
        const ageRangeStart = age.split('+')[0]
        filteredDogs = filteredDogs.filter(dog => dog.age >= ageRangeStart)
      }
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

    const searchVal = document.getElementById('search')
    if(searchVal)
    {
      filteredDogs = filteredDogs.filter(dog => dog.name.includes(searchVal.value) || dog.breed.includes(searchVal.value))
    }

    // render
    this.dogs = filteredDogs
    this.render()
  }

  clearFilterButtons(){
    // reset buttons
    const filterSelects = document.querySelectorAll("sl-select")
    filterSelects.forEach(select => select.value = '')
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
        display: flex;
        flex-wrap: wrap;
        justify-content: center
      }
      .dog-select {
        width: 13%;
        margin-top: 30px;
        margin-bottom: 30px;
      }
      .reset-button {
        float: right;
        margin-left: 30px;
        margin-top: 30px;
        margin-bottom: 30px;
      }   
      sl-icon {
        cursor: pointer;
      }
      .search-dog {
        width: 90%;
        margin: auto;
        margin-top: 20px;
      }
    </style>
      <va-app-header title="Dogs" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
      <div class="dog-banner">
        <div class="input-group">
          <sl-input id="search" class="search-dog" size="large" type="search" placeholder="Search Dogs"><sl-icon @click=${this.filterDogs.bind(this)} name="search" slot="suffix"></sl-icon></sl-input>
        </div>
      </div>
    <div class="filter-menu">
      <sl-select class="dog-select" id="breed" placeholder="Breed" clearable>
        <sl-menu-item data-field="breed" data-match="border collie" value="border collie">border collie</sl-menu-item>
        <sl-menu-item data-field="breed" data-match="Dashhound" value="Dashhound">dashhound</sl-menu-item>
        <sl-menu-item data-field="breed" data-match="great dane" value="great dane">great dane</sl-menu-item>
      </sl-select>
        <sl-select class="dog-select" id="sex" placeholder="Sex" clearable>
        <sl-menu-item data-field="sex" data-match="male" value="male">male</sl-menu-item>
        <sl-menu-item data-field="sex" data-match="female" value="female">female</sl-menu-item>
      </sl-select>
      </sl-select>
      <sl-select class="dog-select" id="age" placeholder="Age" clearable>
        <sl-menu-item data-field="age" data-match="0-5" value="0-5">0-5</sl-menu-item>
        <sl-menu-item data-field="age" data-match="6-10" value="6-10">6-10</sl-menu-item>
        <sl-menu-item data-field="age" data-match="11-15" value="11-15">11-15</sl-menu-item>
        <sl-menu-item data-field="age" data-match="16+" value="16+">16+</sl-menu-item>
      </sl-select>
      <sl-select class="dog-select" id="size" placeholder="Size" clearable>
        <sl-menu-item data-field="size" data-match="small" value="small">small</sl-menu-item>
        <sl-menu-item data-field="size" data-match="medium" value="medium">medium</sl-menu-item>
        <sl-menu-item data-field="size" data-match="large" value="large">large</sl-menu-item>
      </sl-select>
      <sl-select class="dog-select" id="nature" placeholder="Nature" clearable>
        <sl-menu-item data-field="nature" data-match="loving" value="loving">loving</sl-menu-item>
        <sl-menu-item data-field="nature" data-match="playful" value="playful">playful</sl-menu-item>
        <sl-menu-item data-field="nature" data-match="protective" value="protective">protective</sl-menu-item>
      </sl-select>
      <sl-select class="dog-select" id="energy" placeholder="Energy" clearable>
        <sl-menu-item data-field="energy" data-match="low" value="low">low</sl-menu-item>
        <sl-menu-item data-field="energy" data-match="medium" value="medium">medium</sl-menu-item>
        <sl-menu-item data-field="energy" data-match="high" value="high">high</sl-menu-item>
      </sl-select>
      <sl-button class="reset-button" size="medium" @click=${this.clearFilters.bind(this)}>Clear Filters</sl-button>
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