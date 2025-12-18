import ChadhavaOffering from "@/components/ChadhavaOffering";
import PujaDetail from "@/components/PujaDetails";
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
    path: "/offering",
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
