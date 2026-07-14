import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { http } from "@/config/axios";
import { setUser } from "@/stores/features/user/userSlice";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { token: tokenAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const token = tokenAuth || query.get("token");

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
