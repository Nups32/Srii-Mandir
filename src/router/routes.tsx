import ChadhavaOffering from "@/components/ChadhavaOffering";
import Login from "@/components/Login";
import PujaDetail from "@/components/PujaDetails";
import Register from "@/components/Register";
import Chadhava from "@/pages/Chadhava";
import PageNotFound from "@/pages/PagenotFound";
import Puja from "@/pages/Puja";
import type { RouteObjectWithLayout } from "@/router";
import { lazy } from "react";
const Index = lazy(() => import("../pages/Index"));

const routes: RouteObjectWithLayout[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
    layout: "blank"
  },
  {
    path: "/register",
    element: <Register />,
    layout: "blank"
  },
  {
    path: "/puja",
    element: <Puja />,
  },
  {
    path: "/puja-detail",
    element: <PujaDetail />,
  },
  {
    path: "/chadhava",
    element: <Chadhava />,
  },
  {
    path: "/chadhava-detail",
    element: <ChadhavaOffering />,
  },
  {
    path: "*",
    element: (
      <>
        <PageNotFound />
      </>
    ),
  },
];

export { routes };
