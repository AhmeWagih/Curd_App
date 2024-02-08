import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";
import RootLayout from "./pages/RootLayout";
import Index from "./pages";
import Error from "./pages/Error";
import Loading from "./components/Loading";
//import Login from "./pages/Login";
const Add = React.lazy(() => import("./pages/Add"));
const Edit = React.lazy(() => import("./pages/Edit"));
const Details = React.lazy(() => import("./pages/Details"));

const loaderHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "please make sure to insert correct post ID",
      status: 400,
    });
  } else {
    return null;
  }
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add",
        element: (
          <Suspense fallback={<Loading />}>
            <Add />
          </Suspense>
        ),
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Details />
          </Suspense>
        ),
        loader: loaderHandler,
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback={<Loading />}>
            <Edit />
          </Suspense>
        ),
        loader: loaderHandler,
      },
      //{ path: "post/login", element: <Login /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
