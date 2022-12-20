import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRouters } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import SystemLayout from './layouts/System/SystemLayout';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import 'react-toastify/ReactToastify.min.css';
import './assets/styles/grid.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.changeLayout) {
                            Layout = route.changeLayout;
                        } else if (route.changeLayout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route element={<Login />}>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = SystemLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
