import CategoryPage from "./pages/category/CategoryPage";
import NotFound from "./pages/not-found/NotFound";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import ProductPage from "./pages/product/ProductPage";
import SignInPage from "./pages/sign-in/SignInPage";

const routes = [
  {
    path: "/",
    element: () => <SignInPage />,
  },
  {
    path: "home",
    element: () => <CategoryPage />,
  },
  {
    path: "product-list",
    element: () => <ProductPage />,
  },
  {
    path: "product/:id",
    element: () => <ProductDetailPage />,
  },
  {
    path: "*",
    element: () => <NotFound />,
  },
];
export default routes;
