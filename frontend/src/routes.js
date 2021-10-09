
import { HomePage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import ActivitiesPage from './pages/ActivitiesPage.jsx';

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
    },
    {
        path: '/activity',
        component: ActivitiesPage,
    }
]

export default routes;