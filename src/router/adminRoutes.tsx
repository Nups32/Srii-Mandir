import ManageUsers from "@/admin/pages/Users/ManageUsers";
import type { RouteObjectWithLayout } from "@/router";
import { lazy } from "react";
const Dashboard = lazy(() => import("@/admin/pages/Dashboard"));

export const adminRoutes: RouteObjectWithLayout[] = [
  {
    path: "/admin/dashboard",
    // element: <Index />,
    element: <Dashboard />,
    layout: "admin",
  },
  {
    path: "/admin/manage-users",
    // element: <Index />,
    element: <ManageUsers />,
    layout: "admin",
  },
  // {
  //     path: 'admin/manage-user',
  //     element: <ManageUser />
  // },
  // {
  //     path: 'admin/transaction',
  //     element: <Transaction />
  // },
  // {
  //   path: "/admin-login",
  //   element: <AdminLogin />,
  //   layout: "blank",
  // },
  
];

export default adminRoutes;
