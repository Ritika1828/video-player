/**
 * function to get and set localstorage value
 * @param {String} key 
 * @param {Any} obj 
 * @returns 
 */
export const localStorageSave = (key,value=null) =>{
    if(typeof localStorage !== 'undefined'){
        if(value == null){
          let tempVal;
          try{
            tempVal = JSON.parse(localStorage.getItem(key));
          }catch(e){
            tempVal = localStorage.getItem(key);
          }
            return tempVal
        }
        else{
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value): value);
      }
    }
}
