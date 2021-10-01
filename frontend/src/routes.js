
import { HomePage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/search',
        component: SearchPage,
    },
    {
        path: '/library',
        component: LibraryPage,
    }
]

export default routes;