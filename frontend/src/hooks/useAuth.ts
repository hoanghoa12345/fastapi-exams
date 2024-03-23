import { useEffect } from "react";

import { useUserStore } from "@/stores/useUserStore";
import { authApi } from "@/services/authApi";
import { Cookies } from "@/utils/cookie";

export const useAuth = () => {
  const userStore = useUserStore();

  const fetchCurrentUser = () => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      authApi.me(accessToken).then((res) => {
        userStore.setUser(res.data);
      });
    }
  };

  useEffect(() => {
    if (!userStore.user) fetchCurrentUser();
  }, []);
  return {
    user: userStore.user,
    logout: userStore.removeUser,
    login: userStore.setUser,
    isAuthenticate: userStore.user ? true : false,
  };
};
