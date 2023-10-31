import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/auth-slice";

export const useUserStore = () => {
  const dispatch = useAppDispatch();
  const { status, uid, user } = useAppSelector((state) => state.auth);

  const handleLogin = ({ token }: { token: string }) => {
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return { status, uid, user, handleLogin, handleLogout };
};
