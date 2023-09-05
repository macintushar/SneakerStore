
function DeleteBtn(sku) {
    var SKU = sku;
    function deleteProduct() {
        console.log(SKU)
        alert('Deleting Product with SKU: ' + SKU.sku)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let index = cart.findIndex(item => item.sku === SKU.sku);

        if (index !== -1) {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
    return(
        <button className="bg-red-500 text-white uppercase text-xs py-2 px-3" onClick={deleteProduct} type="button">Delete</button>
    )
}

export default DeleteBtn