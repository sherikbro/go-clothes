import { 
    RouterProvider, 
    createBrowserRouter, 
    createRoutesFromElements,
    Route 
} from "react-router-dom"
import App from "../App"
import { Auth, Dashboard, Categories, Workers, Products, SinglePage } from "@pages";

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(

            <Route path="/" element={<App/>}>
                <Route index element={<Auth/>}/>
                <Route path="dashboard/*" element={<Dashboard/>}>
                    <Route path="" element={<Categories/>}/>
                    <Route path="workers" element={<Workers/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="products/:id" element={<SinglePage/>}/>
                </Route>
            </Route>

        )
    );
return <RouterProvider router={router}/>
}

export default Index
