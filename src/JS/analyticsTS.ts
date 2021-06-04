import * as $ from 'jquery';


function createAnalytics(): object {
    let counter = 0
    let isDestroyed: boolean = false

    const listener = ():number  => counter++

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

window['analyticsTypeScript'] = createAnalytics()
