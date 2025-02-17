import { createBrowserRouter } from "react-router-dom";

// Archivos principio y fin
import Home from "../view/home/home"; 
import NotFound from "../components/tsx/notFound";

// Archivos auth
import Login from "../view/login/login";
import AuthGuard from "../guards/guards";
import Register from "../view/register/register";
import Email from "../view/email/email";
import Password from "../view/password/password";
import Verification from "../view/verification/verification";

// Archivos admin
import Admin from "../components/admin/admin";
import HomeAdmin from "../view/admin/home/homeAdmin";
import CategoryAdmin from "../view/admin/category/categoryAdmin";
import ChatsAdmin from "../view/admin/chat/chatAdmin";

// Archivos client
import Article from "../view/client/article/article";
import Favorite from "../view/client/favorite/favorite";
import Exchange from "../view/client/exchange/exchange";
import Chats from "../view/client/chat/chats";
import Messenger from "../view/client/messeger/Messenger";

// Archivos footer
import History from "../view/history/history";
import Blog from "../view/blog/blog";
import Contact from "../view/contact/contact";
import Faq from "../view/faq/faq";
import ReturnsPolicy from "../view/returns/returns";
import PaymentMethods from "../view/payments/payments";
import TermsAndConditions from "../view/terms/terms";
import PrivacyPolicy from "../view/privacy/privacy";
import Accounts from "../view/client/accounts/accounts";
import Client from "../components/client/client";

const router = createBrowserRouter([

  // rutas principio y fin
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },

  // rutas auht
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/authguard", element: <AuthGuard /> },
  { path: "/email", element: <Email /> },
  { path: "/password", element: <Password /> },
  { path: "/verification", element: <Verification /> },

  // Rutas del cliente
  {
    path: "/",
    element: <Client />,
    children: [
      { path: "/article", element: <Article /> },
      { path: "/favorite", element: <Favorite /> },
      // { path: "/chat", element: <Chats /> },
      // { path: "/exchange", element: <Exchange /> },
      // { path: "/accounts/:id", element: <Accounts /> },
      // { path: "/messenger", element: <Messenger /> }
    ]
  },

  // Rutas del admin
  {
    path: "/",
    element: <Admin />,
    children: [
      { path: "/home-admin", element: <HomeAdmin /> },
      { path: "/category-admin", element: <CategoryAdmin /> },
      { path: "/chat-admin", element: <ChatsAdmin /> },
    ]
  },

  // Rutas footer
  { path: "/history", element: <History /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
  { path: "/faq", element: <Faq /> },
  { path: "/returns", element: <ReturnsPolicy /> },
  { path: "/payments", element: <PaymentMethods /> },
  { path: "/terms", element: <TermsAndConditions /> },
  { path: "/privacy", element: <PrivacyPolicy /> },

]);


export default router;

