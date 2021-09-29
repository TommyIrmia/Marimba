
import { HomePage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/search',
        component: SearchPage,
    }
]

export default routes;