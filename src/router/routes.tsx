import ChadhavaOffering from "@/components/ChadhavaOffering";
import Login from "@/components/Auth/Login";
import DevotionalAudio from "@/components/Media/Media";
import NakshatraFinder from "@/components/NakshtraDetail";
import PujaDetail from "@/components/PujaDetails";
import Register from "@/components/Auth/Register";
import Chadhava from "@/pages/Chadhava";
import PageNotFound from "@/pages/PagenotFound";
import Puja from "@/pages/Puja";
import ShaktiSanyas from "@/pages/ShaktiSanyas";
import VedicScience from "@/pages/VedicScience";
import type { RouteObjectWithLayout } from "@/router";
import { lazy } from "react";
import ForgetPassword from "@/components/Auth/ForgetPassword";
import ChadhavaCart from "@/components/Chadhava/ChadhavaCart";
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
    path: "/forgot-password",
    element: <ForgetPassword />,
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
    path: "/chadhava-cart",
    element: <ChadhavaCart />,
  },
  {
    path: "/vedic-science",
    element: <VedicScience />,
  },
  {
    path: "/nakshtra-finder",
    element: <NakshatraFinder />,
  },
  {
    path: "/media",
    element: <DevotionalAudio isPaidUser={false} />,
  },
  {
    path: "/shakti-sanyans",
    element: <ShaktiSanyas />,
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
