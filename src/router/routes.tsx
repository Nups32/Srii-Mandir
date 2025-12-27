import type { RouteObjectWithLayout } from "@/router";
import { lazy } from "react";
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
import ForgetPassword from "@/components/Auth/ForgetPassword";
import ChadhavaCart from "@/components/Chadhava/ChadhavaCart";
import PackageDetail from "@/components/Puja/Packages/PackageDetail";
import DevotionalMedia from "@/components/Media/DevotionalMedia";
import VedicMantra from "@/components/Media/VedicMantra";
import LiveKatha from "@/components/Media/LiveKatha";
import PujaHistory from "@/components/Profile/PujaBooking/PujaBooking";
import PackageForm from "@/components/Puja/Packages/PackageForm";
import ChadhavaHistory from "@/components/Profile/ChadhavaBooking/ChadhavaBooking";
import Products from "@/pages/Products";
import Profile from "@/components/Profile/Profile";
import ProductDetail from "@/components/Products/ProductDetail";
import ContactUs from "@/pages/Contact";
import InstantSolutions from "@/pages/InstantSolution";
import YogMayaMandir from "@/pages/YogMayaMandir";
import JanamRashiFinder from "@/components/JanamRashiFinser";
import DhanBasraPotli from "@/pages/DhanBasraPotli";
import { ProductList } from "@/components/Products/ProductList";
import LiveDarshan from "@/pages/LiveDarshan";
import Wallpapers from "@/pages/Wallpapers";
// import Logout from "@/components/Logout";
// import ProfileEditForm from "@/components/Profile/ProfileEdit";
const Index = lazy(() => import("../pages/Index"));

const routes: RouteObjectWithLayout[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/admin-login",
    element: <Login />,
    layout: "blank"
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
    path: "/profile",
    element: <Profile />,
  },
  // {
  //   path: "/profile/edit",
  //   element: <ProfileEditForm  />,
  // },
  {
    path: "/puja/history",
    element: <PujaHistory />,
  },
  {
    path: "/chadhava/history",
    element: <ChadhavaHistory />,
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
    path: "/janam-rashi-finder",
    element: <JanamRashiFinder />,
  },
  {
    path: "/media",
    element: <Library />,
  },
  {
    path: "/media/:type",
    element: <DevotionalMedia />,
  },
  {
    path: "/media/mantras",
    element: <VedicMantra />,
  },
  {
    path: "/media/kathas",
    element: <LiveKatha />,
  },
  {
    path: "/shakti-sanyasis",
    element: <ShaktiSanyas />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/category/:category",
    element: <ProductList />,
  },
  {
    path: "/products/detail",
    element: <ProductDetail />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/instant-solution",
    element: <InstantSolutions />,
  },
  {
    path: "/yog-maya-mandir",
    element: <YogMayaMandir />,
  },
  {
    path: "/product/dhan-basra-potli",
    element: <DhanBasraPotli />,
  },
  {
    path: "/wallpapers",
    element: <Wallpapers />,
  },
  {
    path: "/live-darshan",
    element: <LiveDarshan />,
  },
  
  // {
  //   path: "/logout",
  //   element: <Logout />,
  // },
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
