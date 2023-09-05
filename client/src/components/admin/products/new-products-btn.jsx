import { Link } from "react-router-dom";

function NewProductsBtn() {
    return(
        <div className="container mx-auto">
            <Link to={"/admin/manage/products/new/"}>
                <button className="m-4 text-center text-white w-full"> + Add new Product</button>
            </Link>
        </div>
    )
}

export default NewProductsBtn