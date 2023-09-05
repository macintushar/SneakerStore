function MinusQty(sku){
    let SKU = sku;

    function decreaseQuantity() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let product = cart.find(item => item.sku === SKU.sku);
        
        if (product) {
            if(product.quantity > 1) {
                product.quantity--;
                product.price = product.price - product.original_price;
                console.log(product.quantity)
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
    return(
        <button className="px-5" type="button" onClick={decreaseQuantity}>-</button>
    )
}

export default MinusQty