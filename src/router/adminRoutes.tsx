import AddMediaForm from "@/admin/pages/Media/AddMedia";
import EditMediaForm from "@/admin/pages/Media/EditMedia";
import MediaTable from "@/admin/pages/Media/Index";
import PoojaTable from "@/admin/pages/Pooja/Index";
import AddPujaForm from "@/admin/pages/Pooja/AddPooja";
import EditPujaForm from "@/admin/pages/Pooja/EditPooja";
import ManageUsers from "@/admin/pages/Users/ManageUsers";
import type { RouteObjectWithLayout } from "@/router";
import { lazy } from "react";
import ChadhavaTable from "@/admin/pages/Chadhava/Index";
import AddChadhavaForm from "@/admin/pages/Chadhava/AddChadhava";
import EditChadhavaForm from "@/admin/pages/Chadhava/EditChadhava";
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
  {
    path: "/admin/pooja",
    // element: <Index />,
    element: <PoojaTable />,
    layout: "admin",
  },
  {
    path: "/admin/pooja/add",
    // element: <Index />,
    element: <AddPujaForm />,
    layout: "admin",
  },
  {
    path: "/admin/pooja/:id/edit",
    // element: <Index />,
    element: <EditPujaForm />,
    layout: "admin",
  },
  {
    path: "/admin/media",
    // element: <Index />,
    element: <MediaTable />,
    layout: "admin",
  },
  {
    path: "/admin/media/add",
    // element: <Index />,
    element: <AddMediaForm />,
    layout: "admin",
  },
  {
    path: "/admin/media/:id/edit",
    // element: <Index />,
    element: <EditMediaForm />,
    layout: "admin",
  },
  {
    path: "/admin/chadhava",
    // element: <Index />,
    element: <ChadhavaTable />,
    layout: "admin",
  },
  {
    path: "/admin/chadhava/add",
    // element: <Index />,
    element: <AddChadhavaForm />,
    layout: "admin",
  },
  {
    path: "/admin/chadhava/:id/edit",
    // element: <Index />,
    element: <EditChadhavaForm />,
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
