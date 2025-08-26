import { ReactNode, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { http } from "@/config/axios";
import { setUser } from "@/stores/features/user/userSlice";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, []);

  function getProfile() {
    http
      .get("/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        dispatch(setUser(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return children;
}
