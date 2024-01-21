import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "../route/Board.tsx";
import Register from "../route/Register.tsx";
import Login from "../route/Login.tsx";
import Logout from "../route/Logout.tsx";
import Boards from "../route/Boards.tsx";
import BoardNew from "../route/BoardNew.tsx";

const router = createBrowserRouter([
  {
    path: '/board/:id',
    element: <Board />,
  },
  {
    path: '/boards/',
    element: <Boards/>,
  },
  {
    path: '/board/new/',
    element: <BoardNew/>,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/logout',
    element: < Logout />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
