import ManagePermisions from "../components/ManagePermisions";
import CreateIngredientForm from "../components/CreateIngredientForm";
import ManageIngredients from "../components/ManageIngredients";
import CreateProductForm from "../components/CreateProductForm";
import ManageProducts from "../components/ManageProducts";
import ViewAllOrders from "../components/ViewAllOrders";

const Admin = () => {
 
    return( 
        <>
            <ManagePermisions/>
            <CreateIngredientForm/>
            <ManageIngredients/>
            <CreateProductForm/>
            <ManageProducts/>
            <ViewAllOrders/>
        </>
        
    
    )
}

export default Admin
