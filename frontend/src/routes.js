import { CreateStation } from './pages/CreateStation.jsx';
import { HomePage } from './pages/HomePage.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/createstation',
        component: CreateStation,
    }
]

export default routes;