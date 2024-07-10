import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Register, { action as RegisterAction } from "./pages/Register";
import Create, { action as Createaction } from "./pages/Create";
import Login, { action as LoginAction } from "./pages/Login";
import { isAuthChange, login } from "./app/userslice";
import { useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import SingleProduct from "./pages/SingleProduct";
import Protectedroutes from "./componets/Protectedroutes";
import HomeLayout from "./layouts/HomeLayout";
import { Home } from "./pages";
import Trash from "./pages/Trash";

import Charts from "./pages/Chart";
import About from "./pages/About";



function App() {
  const dispatch = useDispatch();
  const { user, isAuthState } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protectedroutes user={user}>
          <HomeLayout />
        </Protectedroutes>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products/:id",
          element: <SingleProduct />,
        },
        {
          path: "/Create",
          element: <Create />,
          action: Createaction,
        },
        {
          path: "/Trash",
          element: <Trash />,
         
        },
        {
          path: "/about",
          element: <About/>,
         
        },
        {
          path: "/charts",
          element: <Charts />,
         
        },
             ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange());
    });
  }, []);

  return <>{isAuthState && <RouterProvider router={routes} />}</>;
}

export default App;