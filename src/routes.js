import SignInPage from "./screens/sign-in/SignInPage";
import HomePage from "./screens/home/HomePage";
import SignUpPage from "./screens/sign-up/SignUpPage";
import NotFoundPage from "./screens/not-found/NotFoundPage";
import CategoryPage from "./screens/home/CategoryPage";

const routes = [
  {
    path: "sign-in",
    element: () => <SignInPage />,
  },
  {
    path: "sign-up",
    element: () => <SignUpPage />,
  },
  {
    path: "/",
    element: () => <HomePage />,
  },
  {
    path: "category/:id",
    element: () => <CategoryPage />,
  },
  {
    path: "*",
    element: () => <NotFoundPage />,
  },
];
export default routes;
