import ChadhavaOffering from "@/components/ChadhavaOffering";
import Login from "@/components/Auth/Login";
import Library from "@/components/Media/Media";
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
import PackageDetail from "@/components/Puja/Packages/PackageDetail";
import DevotionalMedia from "@/components/Media/DevotionalMedia";
import VedicMantra from "@/components/Media/VedicMantra";
import LiveKatha from "@/components/Media/LiveKatha";
import PujaHistory from "@/components/Profile/PujaBooking/PujaBooking";
import PackageForm from "@/components/Puja/Packages/PackageForm";
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
    path: "/puja-booking",
    element: <PujaHistory />,
  },
  {
    path: "/puja",
    element: <Puja />,
  },
  {
    path: "/puja-detail/:slug",
    element: <PujaDetail />,
  },
  {
    path: "/package-detail/form",
    element: <PackageForm />,
  },
  {
    path: "/chadhava",
    element: <Chadhava />,
  },
  {
    path: "/chadhava-detail/:slug",
    element: <ChadhavaOffering />,
  },
  {
    path: "/chadhava-cart",
    element: <ChadhavaCart />,
  },
  {
    path: "/package-detail",
    element: <PackageDetail />,
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
    element: <Library isPaidUser={false} />,
  },
  {
    path: "/media/devotional-songs",
    element: <DevotionalMedia />,
  },
  {
    path: "/media/mantras",
    element: <VedicMantra />,
  },
  {
    path: "/media/kathas",
    element: <LiveKatha/>,
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
