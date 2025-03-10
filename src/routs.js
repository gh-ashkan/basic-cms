import Products from './Components/Products/Products';
import Orders from './Components/Orders/Orders';
import Offs from './Components/Offs/Offs';
import Comments from './Components/Comments/Comments';
import Users from './Components/Users/Users';

const routs = [
    {path: '/products', element: <Products/>},
    {path: '/comments', element: <Comments/>},
    {path: '/users', element: <Users/>},
    {path: '/orders', element: <Orders/>},
    {path: '/offs', element: <Offs/>}
]
export default routs;