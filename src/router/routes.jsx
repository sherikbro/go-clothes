import HailIcon from '@mui/icons-material/Hail';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const routes = [
  
  { name: "Categories", path: "/dashboard/", icon: <CategoryIcon className='text-[green]'/> },
  { name: "Workers", path: "/dashboard/workers", icon: <HailIcon className='text-[blue]'/> },
  { name: "Products", path: "/dashboard/products", icon: <ShoppingBagIcon className='text-[darkblue]'/> },
];

export {routes}