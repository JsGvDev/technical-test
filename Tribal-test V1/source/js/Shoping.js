import {Basket} from './DataAccess';


const LOGO_TRIBAL   = require('../../resource/images/logo.png');
const CART          = require('../../resource/images/carrito.png');
const HEART         = require('../../resource/images/heart.png');
const ITEM          = require('../../resource/images/item.png');
const INFO          = require('../../resource/images/info.png');
const BANNER          = require('../../resource/images/banner.png');


class ShopingController {

    constructor( op ) {
        this.meBasket = new Basket();
    }

    addItemToBasket( item ) {
        this.meBasket.set(item);
    }

    removeItemFromBasket( item ) {
        this.meBasket.remove();
    }

}


export class ShopingTemplate extends ShopingController {

    constructor( tplName, op ) {
        super();
        this.tplName = tplName;
        this.elHtml = this.header()+this.body()+this.footer(op);
    }


    header() {
        let logo = '<div class="logo">'+this.logo()+'</div>',
            basket = this.basket(),
            heart = '<div class="heart">'+this.heart()+'</div>';

          return    `<div class="header">
                        ${logo+heart+basket}
                    </div>`;
    }

    body() {
        return `<div class="body">
                    <div class="bgImg item itemImg" style="background-image:url(${ITEM})"></div>
                    <div class="bgImg item itemInfo" style="background-image:url(${INFO})">
                        <div class="btn" item="PS4" id="addBasket">ADD TO BASKET</div>
                    </div>
                    <div class="bgImg item banner" style="background-image:url(${BANNER})"></div>
                </div>`;
    }


    footer( op ) {
        let menu = '<div class="footer menu">';
        for (let i=0; i<op.length; i++) {
            let option = '<div class="option" id="#option'+i+'"><span>'+op[i]+'</span></div>';
            if (i == 1) {
                option = '<div class="option selected" id="#option'+i+'"><span>'+op[i]+'</span></div>';
            }
            menu += option;
        }
        menu += '</div>';
        return menu;
    }

    img( url ) {
        return `<div class='bgImg' style="background-image:url(${url})"></div>`;
    }

    logo() {
        return this.img(LOGO_TRIBAL);
    }

    basket() {
        let basket = `<div class="basket">
                        <div class='bgImg' style="background-image:url(${CART})">
                            <div class="circle-text"><div id="items">${this.meBasket.numberItems()}</div></div>
                        </div>
                     </div>`;
        return basket;
    }

    heart() {
        return this.img(HEART);
    }
}

export class CartTemplate extends ShopingController {

    constructor( tplName ) {
        super();
        this.tplName = tplName;
        this.elHtml = this.body();
    }

    body() {
        return `<div id="myModal" class="modal">
                  <!-- Modal content -->
                  <div class="modal-content">
                    <div class="modal-header">
                      <span class="close">×</span>
                      <h2>Basket</h2>
                    </div>
                    <div class="modal-body">
                      ${this.list(this.meBasket.get())}
                    </div>
                  </div>
                </div>`;
    }

    list( items ) {
        let p = '';
        for(var i in items) {
            p+=`<p id="item-${i}"><span class="delete">×</span>${items[i]}</p>`;
        }
        return p;
    }

}
