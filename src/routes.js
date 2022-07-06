import SignInPage from "./screens/sign-in/SignInPage";
import HomePage from "./screens/home/HomePage";
import SignUpPage from "./screens/sign-up/SignUpPage";
import NotFoundPage from "./screens/not-found/NotFoundPage";

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
