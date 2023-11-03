import { useEffect } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MyEvents } from "./views/my-events";
import { Login } from "./views/login";
import { ErrorPage } from "./error-page";
import { useRenewLoginQuery } from "./api";
import { MainLayout } from "./layout/main-layout";
import { useUserStore } from "./hooks/use-user-store";
import { Events } from "./views/events";

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
            <Route path="/" element={<Events />} index />
            <Route path="/my-events" element={<MyEvents />} />
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
