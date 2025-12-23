import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store";
import { CartProvider } from "./components/Chadhava/CartContext";
import { PackageProvider } from "./components/Puja/Packages/PackageContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <PackageProvider>
          <RouterProvider router={router} />
        </PackageProvider>
      </CartProvider>
    </Provider>
  </StrictMode>
);
