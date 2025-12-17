import PageNotFound from "@/pages/PagenotFound";
import type { RouteObjectWithLayout } from "@/router";
import { lazy } from "react";
const Index = lazy(() => import("../pages/Index"));

const routes: RouteObjectWithLayout[] = [
  {
    path: "/",
    element: <Index />,
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
