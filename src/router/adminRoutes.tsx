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
import PoojaPackageTable from "@/admin/pages/PoojaPackage/Index";
import AddPoojaPackageForm from "@/admin/pages/PoojaPackage/AddPoojaPackage";
import EditPoojaPackageForm from "@/admin/pages/PoojaPackage/EditPoojaPackage";
import EditUserForm from "@/admin/pages/Users/EditUsers";
import AddUserForm from "@/admin/pages/Users/AddUser";
import HeroSectionTable from "@/admin/pages/HeroSection/Index";
import EditHeroSectionForm from "@/admin/pages/HeroSection/EditHeroSection";
import AddHeroSectionForm from "@/admin/pages/HeroSection/AddHeroSection";
import ReviewTable from "@/admin/pages/Review/Index";
import AddReviewForm from "@/admin/pages/Review/AddReview";
import EditReviewForm from "@/admin/pages/Review/EditReview";
import PujaReviewTable from "@/admin/pages/PujaReview/Index";
import AddPujaReviewForm from "@/admin/pages/PujaReview/AddPujaReview";
import EditPujaReviewForm from "@/admin/pages/PujaReview/EditPujaReview";
import BookChadhavaTable from "@/admin/pages/BookChadhava/Index";
import BookPujaTable from "@/admin/pages/BookPuja/Index";
import ProductTable from "@/admin/pages/Product/Index";
import AddProductForm from "@/admin/pages/Product/AddProduct";
import EditProductForm from "@/admin/pages/Product/EditProduct";
import YogMayaMandirTable from "@/admin/pages/YogMayaMandir/Index";
import AddYogMayaMandirForm from "@/admin/pages/YogMayaMandir/AddYogMayaMandir";
import EditYogMayaMandirForm from "@/admin/pages/YogMayaMandir/EditYogMayaMandir";
import PurohitTable from "@/admin/pages/Purohit/Index";
import AddPurohitForm from "@/admin/pages/Purohit/AddPurohit";
import EditPurohitForm from "@/admin/pages/Purohit/EditPurohit";
const Dashboard = lazy(() => import("@/admin/pages/Dashboard"));

export const adminRoutes: RouteObjectWithLayout[] = [
  {
    path: "/admin/dashboard",
    // element: <Index />,
    element: <Dashboard />,
    layout: "admin",
  },
  {
    path: "/admin/users",
    // element: <Index />,
    element: <ManageUsers />,
    layout: "admin",
  },
  {
    path: "/admin/user/add",
    // element: <Index />,
    element: <AddUserForm />,
    layout: "admin",
  },
  {
    path: "/admin/user/:id/edit",
    // element: <Index />,
    element: <EditUserForm />,
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
  {
    path: "/admin/pooja-package",
    // element: <Index />,
    element: <PoojaPackageTable />,
    layout: "admin",
  },
  {
    path: "/admin/pooja-package/add",
    // element: <Index />,
    element: <AddPoojaPackageForm />,
    layout: "admin",
  },
  {
    path: "/admin/pooja-package/:id/edit",
    // element: <Index />,
    element: <EditPoojaPackageForm />,
    layout: "admin",
  },
  {
    path: "/admin/hero-section",
    // element: <Index />,
    element: <HeroSectionTable />,
    layout: "admin",
  },
  {
    path: "/admin/hero-section/add",
    // element: <Index />,
    element: <AddHeroSectionForm />,
    layout: "admin",
  },
  {
    path: "/admin/hero-section/:id/edit",
    // element: <Index />,
    element: <EditHeroSectionForm />,
    layout: "admin",
  },
  {
    path: "/admin/review",
    element: <ReviewTable />,
    layout: "admin",
  },
  {
    path: "/admin/review/add",
    element: <AddReviewForm />,
    layout: "admin",
  },
  {
    path: "/admin/review/:id/edit",
    element: <EditReviewForm />,
    layout: "admin",
  },
  {
    path: "/admin/puja-review",
    element: <PujaReviewTable />,
    layout: "admin",
  },
  {
    path: "/admin/puja-review/add",
    element: <AddPujaReviewForm />,
    layout: "admin",
  },
  {
    path: "/admin/puja-review/:id/edit",
    element: <EditPujaReviewForm />,
    layout: "admin",
  },
  {
    path: "/admin/book-pooja",
    element: <BookPujaTable />,
    layout: "admin",
  },
  {
    path: "/admin/book-chadhava",
    element: <BookChadhavaTable />,
    layout: "admin",
  },
  {
    path: "/admin/product",
    element: <ProductTable />,
    layout: "admin",
  },
  {
    path: "/admin/product/add",
    element: <AddProductForm />,
    layout: "admin",
  },
  {
    path: "/admin/product/:id/edit",
    element: <EditProductForm />,
    layout: "admin",
  },
  {
    path: "/admin/yog-maya-mandir",
    element: <YogMayaMandirTable />,
    layout: "admin",
  },
  {
    path: "/admin/yog-maya-mandir/add",
    element: <AddYogMayaMandirForm />,
    layout: "admin",
  },
  {
    path: "/admin/yog-maya-mandir/:id/edit",
    element: <EditYogMayaMandirForm />,
    layout: "admin",
  },
  {
    path: "/admin/purohit",
    element: <PurohitTable />,
    layout: "admin",
  },
  {
    path: "/admin/purohit/add",
    element: <AddPurohitForm />,
    layout: "admin",
  },
  {
    path: "/admin/purohit/:id/edit",
    element: <EditPurohitForm />,
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
