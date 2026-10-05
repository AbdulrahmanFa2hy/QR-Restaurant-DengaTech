import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/slices/getMeSlice";
import { tokenCookieKey } from "../../store/configAPI";
import Cookies from "js-cookie";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { token: authToken } = useSelector((state) => state.auth);
  const { data: getMeUser, loading: getMeLoading } = useSelector(
    (state) => state.getMe
  );

  useEffect(() => {
    const token = Cookies.get(tokenCookieKey) || authToken;

    if (token && !getMeUser && !getMeLoading) {
      dispatch(getMe());
    }
  }, [dispatch, authToken, getMeUser, getMeLoading]);

  return children;
};

export default AuthInitializer;
