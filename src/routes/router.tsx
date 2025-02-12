import { createBrowserRouter } from "react-router-dom";
import Explorador from "../view/explorador/Explorador";
import Login from "../view/login/login";
import AuthGuard from "../guards/guards";
import Register from "../view/register/register";
import User from "../components/tsx/user";
import Articulos from "../view/articulo/Articulos";
import Favorito from "../view/favorito/Favorito";
import Intercambios from "../view/intercambios/Intercambios";
import Cuentas from "../view/cuentas/Cuentas";
import Chats from "../view/chat/Chats";
import UserAdmin from "../components/tsx/userAdmin";
import Category from "../view/category/Category";
import CuentasUser from "../view/cuentasAdmin/CuentasUser";
import Messenger from "../view/messeger/Messenger";
import ChatsUser from "../view/chatAdmin/ChatUser";
import NotFound from "../components/tsx/notFound";
import Email from "../view/email/email";
import Password from "../view/password/password";
import Verification from "../view/verification/verification";
import History from "../view/history/history";
import Blog from "../view/blog/blog";
import Contact from "../view/contact/contact";
import Faq from "../view/faq/faq";
import ReturnsPolicy from "../view/returns/returns";
import PaymentMethods from "../view/payments/payments";
import TermsAndConditions from "../view/terms/terms";
import PrivacyPolicy from "../view/privacy/privacy";


const router = createBrowserRouter([
  { path: "/", element: <Explorador /> },
  { path: "/login", element: <Login /> },
  { path: "/authguard", element: <AuthGuard /> },
  { path: "/register", element: <Register /> },
  { path: "/email", element: <Email /> },
  { path: "/password", element: <Password /> },
  { path: "/verification", element: <Verification /> },

  {
    path: "/",
    element: <User />,
    children: [
      { path: "/articulos", element: <Articulos /> },
      { path: "/favoritos", element: <Favorito /> },
      { path: "/Chats", element: <Chats /> },
      { path: "/intercambios", element: <Intercambios /> },
      { path: "/cuentas/:id", element: <Cuentas /> },
      { path: "/messenger", element: <Messenger /> }
    ]
  },

  {
    path: "/",
    element: <UserAdmin />,
    children: [
      { path: "/verificationUser", element: <CuentasUser /> },
      { path: "/categoriasUser", element: <Category /> },
      { path: "/chatsUser", element: <ChatsUser /> },
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

  { path: "*", element: <NotFound /> }
]);


export default router;

