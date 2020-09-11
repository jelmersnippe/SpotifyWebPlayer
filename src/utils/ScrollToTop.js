import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  /* 
  When the path changes, so on Routing behaviour,
  scroll the whole window and the 'main-content' section to the top.
  This prevents loading a new component already scrolled
  */
  useEffect(() => {
    document.getElementsByClassName("main-content")[0].scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
