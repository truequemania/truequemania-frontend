import { createBrowserRouter } from "react-router-dom";
import Starting from "../1starting/starting";
import Register from "../2register/register";
import Login from "../3login/login";
import Email from "../4email/email";
import Password from "../5password/password";
import Verification from "../6verification/verification";
import NotFound from "../components/tsx/notFound";
import User from "../components/tsx/user";
import Explorador from "../7explorador/Explorador";
import Articulos from "../8articulos/Articulos";
import Favorito from "../9favorito/Favorito";
import Intercambios from "../11Intercambios/Intercambios";
import Cuentas from "../12cuentas/Cuentas";
import Chats from "../10chats/Chats";
import UserAdmin from "../components/tsx/userAdmin";
import Category from "../13category/Category";
import CuentasUser from "../12cuentas/CuentasUser";
import AuthGuard from "../guards/guards";
import Messenger from "../14messenger/Messenger";
import ChatsUser from "../15chatUser/ChatUser";

const router = createBrowserRouter([
  { path: "/", element: <Starting /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/email", element: <Email /> },
  { path: "/password", element: <Password /> },
  { path: "/verification", element: <Verification /> },
  {
    path: "/",
    element: <User />,
    children: [
      { path: "/explorar", element: <Explorador /> },
      { path: "/articulos", element: <Articulos /> },
      { path: "/favoritos", element: <Favorito /> },
      { path: "/Chats", element: <Chats /> },
      { path: "/intercambios", element: <Intercambios /> },
      { path:"/cuentas/:id", element: <Cuentas /> },
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

  { path: "/authguard", element: <AuthGuard /> },
  { path: "*", element: <NotFound /> }
]);


export default router;

