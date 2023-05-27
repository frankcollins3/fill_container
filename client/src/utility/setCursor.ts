import $ from 'jquery'
import CSS from './CSS'
export default async function setCursor () {
    if (typeof window !== 'undefined') {
        let eventassertions = [ {property: 'cursor', value: `normal`}]
        CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png')`)   
        // EVENT($('*'), 'mouseenter', eventassertions) 
          $('*').on('mouseenter', (event:any) => { CSS($(event.target), 'cursor', 'normal') })
        // let eventassertions = [CSS(target, 'cursor', normal)]
      }
}