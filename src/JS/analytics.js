import * as $ from 'jquery';


function createAnalytics() {
  let counter = 0
  let isDestroyed = false

  const listener = ()  => counter++

  $(document).on('click', listener)

  console.log('test');

  return{
    destroy(){
      $(document).off('click', listener)
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
