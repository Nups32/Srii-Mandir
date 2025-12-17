/* eslint-disable prefer-const */
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import BlankLayout from "../components/Layouts/BlankLayout";
import DefaultLayout from "../components/Layouts/DefaultLayout";
// import AdminLayout from "@/admin/components/Layouts/DefaultLayout"; // Import AdminLayout
import { routes } from "./routes";
// import adminRoutes from "../admin/adminRoutes";
// import { isMobile } from 'react-device-detect'; // Import device detection

export type RouteObjectWithLayout = RouteObject & {
  layout?: "default" | "blank" | "admin";
}; // Add admin layout type

// const finalAdminRoutes = adminRoutes.map(routeLayoutResolver);
// Map over the main routes to apply appropriate layouts
const finalRoutes = routes.map(routeLayoutResolver);

function routeLayoutResolver(route: RouteObjectWithLayout): RouteObject {
  let { layout, ...rest } = route;

  let element = <></>;
  switch (layout) {
    case "blank":
      element = <BlankLayout>{route.element}</BlankLayout>;
      break;
    // case "admin":
    //   element = <AdminLayout>{route.element}</AdminLayout>;
      break;
    default:
      element = <DefaultLayout>{route.element}</DefaultLayout>;
      break;
  }
  return {
    ...rest,
    element: element,
  };
}

// Combine both main and admin routes
// finalRoutes.concat(finalAdminRoutes);
// const allRoutes = finalRoutes.concat(finalAdminRoutes);

// Create the router using the final combined routes
const router = createBrowserRouter(finalRoutes);
// const router = createBrowserRouter(allRoutes);
export default router;
