import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import store from "./store";
// import { Provider } from "react-redux";
import router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Suspense fallback={<MatrixRain />}> */}
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
    {/* </Suspense> */}
  </StrictMode>
);