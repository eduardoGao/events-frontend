import { useEffect } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { Login } from "./views/login";
import { ErrorPage } from "./error-page";
import { useRenewLoginQuery } from "./api";
import { MainLayout } from "./layout/main-layout";
import { useUserStore } from "./hooks/use-user-store";

export const AppRouter = () => {
  const token = localStorage.getItem("token");

  const { data, isSuccess, isLoading } = useRenewLoginQuery(undefined, {
    skip: !token,
  });

  const { status: authStatus, handleLogin } = useUserStore();

  useEffect(() => {
    if (isSuccess) {
      handleLogin({ token: data.token });
    }
  }, [data, isSuccess, handleLogin]);

  const routerJSX = createBrowserRouter(
    createRoutesFromElements(
      authStatus === "not-auth" ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route path="/" element={<App />} index />
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )
    )
  );

  // if (authStatus === "checking") return "Loading";
  if (isLoading) return "Loading";

  return <RouterProvider router={routerJSX} />;
};
