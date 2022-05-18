import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class DogAPI {

  constructor(){
    this.currentDog = {}
  }

  async updateDog(dogId, dogData, dataType = 'form'){
    // validate
    if(!dogId || !dogData) return
    
    let responseHeader
    
    // form data
    if(dataType == 'form'){
      // fetch response header normal (form data)
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
        body: dogData
      }
      
    // json data
    }else if(dataType == 'json'){
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type" : "application/json"},
        body: JSON.stringify(dogData)
      }
    }
  
    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/dog/${dogId}`, responseHeader)
  
    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating dog')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async newDog(formData){
    // send fetch request
    const response = await fetch(`${App.apiBase}/dog`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })

    // if response not ok
    if(!response.ok){ 
      let message = 'Problem adding dog'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
      }      
      // throw error (exit this function)      
      throw new Error('Problem creating dog')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async getDog(dogId){
    // validate
    if(!dogId) return
    // fetch the json data
    const response = await fetch(`${App.apiBase}/dog/${dogId}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting dog')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async getDogs(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/dog`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting dogs')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  setCurrentDog(dogID)
  {
    this.currentDog = dogID
  }
}

export default new DogAPI()