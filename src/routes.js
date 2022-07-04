import SignInPage from "./pages/sign-in/SignInPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/sign-up/SignUpPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const routes = [
  {
    path: "/",
    element: () => <SignInPage />,
  },
  {
    path: "sign-up",
    element: () => <SignUpPage />,
  },
  {
    path: "home",
    element: () => <HomePage />,
  },
  {
    path: "*",
    element: () => <NotFoundPage />,
  },
];
export default routes;
