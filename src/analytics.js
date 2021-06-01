function createAnalytics() {
  let counter = 0
  let isDestroyed = false

  const listener = ()  => counter++

  document.addEventListener('click', listener)

  console.log('test');

  return{
    destroy(){
      document.removeEventListener('click', listener)
      isDestroyed = true
    },
    gerClicks(){
      if(isDestroyed){
        return 'Analytics is destroyed'
      }
      return counter
    }
  }

}

window.analytics = createAnalytics()
