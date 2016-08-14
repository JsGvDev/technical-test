import {ShopingTemplate, CartTemplate} from './js/Shoping';
import {View} from './js/View';

(function () {
    'use strict';

    function main() {
        function addBasket(item) {
            shoping.addItemToBasket(item);
            view.updateBasket(shoping.meBasket.numberItems());
            var bodyInner = $('.modal-body').html()+`<p id="item-${shoping.meBasket.numberItems()-1}"><span class="delete">×</span>${item}</p>`;
            view.insertHtml( bodyInner, '.modal-body');
        }
        function removeBasket(item) {
            shoping.removeItemFromBasket(item);
            view.updateBasket(shoping.meBasket.numberItems());
        }
        var view = new View();
        let menuShoping = ['Lorem Ipsum','Lorem Ipsum','Lorem Ipsum','Lorem Ipsum','Lorem Ipsum'];
        let shoping = new ShopingTemplate( 'items', menuShoping );
        let cart = new CartTemplate( 'cart' );


        view.save(shoping);
        view.save(cart);
        view.render(shoping);
        view.joinHtml(cart.body(), '.body');

        //Get Btn
        var btn = document.getElementById("addBasket");
        btn.onclick = function()
        {
            addBasket(this.getAttribute("item"));
        };
        //Get basket
        var basket = document.getElementById("items");
        basket.onclick = function()
        {
            if(shoping.meBasket.numberItems() > 0) {
                modal.style.display = "none";
            }
            modal.style.display = "block";
        };
        // Get the <span> element that closes the modal
        $( ".delete" ).click(function() {
            removeBasket();
            if(shoping.meBasket.numberItems() === 0) {
                modal.style.display = "none";
            }
            this.parentElement.style.display = "none";
        });
        // Get the modal
        var modal = document.getElementById('myModal');
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }


    main();

}());
