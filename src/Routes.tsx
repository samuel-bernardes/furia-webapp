import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AOS from 'aos';
import { About, Clips, Error, Home, Login, Profile, Register } from './pages';
import { AuthCallback, Layout } from './components';

function Routes() {

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 500,
            easing: 'ease-out-sine',
        });
    }, []);

    const router = createBrowserRouter([
        {
            path: '/cadastro',
            element: <Register />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/auth/callback',
            element: <AuthCallback />
        },
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/perfil',
                    element: <Profile />,
                },
                {
                    path: '/sobre',
                    element: <About />,
                },
                {
                    path: '/clipes',
                    element: <Clips />,
                },
                /* {
                    path: '/produtos',
                    element: <Products />,
                },
                {
                    path: '/produtos/:product',
                    element: <ProductDetail />,
                },
                {
                    path: '/galeria',
                    element: <Gallery />
                },
                {
                    path: '/sobre',
                    element: <About />,
                },
                {
                    path: '/contato',
                    element: <Contact />,
                }, */
            ],
        },
        {
            path: '*',
            element: <Error />,
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
