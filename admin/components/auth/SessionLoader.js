"use client";

import { useContext, useEffect, useRef, useState } from "react";
import useUpdate from "../api/useUpdate";
import { UserContext } from "@/contexts/UserContext";
import NavLoading from "../navigation/NavLoading";
import Loading from "@/components/loading/Loading";

export default function SessionLoader({ children, ...props }) {
  const update = useUpdate();
  const { setUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const hasRun = useRef(false);

  const { isNavbar = false, noLoading = false } = props;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const load_session = async () => {
      const encoded = localStorage.getItem("uid");
      let data = null;

      try {
        const decoded = atob(encoded);
        data = JSON.parse(decoded);
      } catch (err) {
        setLoaded(true);
        localStorage.removeItem("uid");
        sessionStorage.removeItem("tk");
        return;
      }

      if (data?.user_id && data?.email) {
        if (!sessionStorage.getItem("tk")) {
          try {
            const res = await update();
            if (!res.error) {
              sessionStorage.setItem("tk", res.data.access_token);
              delete res.data.access_token;
              localStorage.setItem("uid", btoa(JSON.stringify(res.data)));
              data = res.data;
            } else {
              console.log("Session expired");
            }
          } catch (err) {
            console.log("Some error occurred");
          }
        }
      }

      setUser(data);
      setLoaded(true);
    };

    load_session();
  }, []);

  if (!loaded) {
    if (isNavbar) {
      return <NavLoading></NavLoading>;
    } else if (noLoading) {
      return null;
    }
    return <Loading></Loading>;
  }

  return children;
}
