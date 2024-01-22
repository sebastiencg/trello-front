import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "../route/Board.tsx";
import Register from "../route/Register.tsx";
import Login from "../route/Login.tsx";
import Logout from "../route/Logout.tsx";
import Boards from "../route/Boards.tsx";
import BoardNew from "../route/BoardNew.tsx";
import ListNew from "../route/ListNew.tsx";
import CardNew from "../route/CardNew.tsx";

const router = createBrowserRouter([
  //list
  {
    path: '/board/:boardId/list/:listId/new/card',
    element: <CardNew />,
  },
  //end
  //list
  {
    path: '/board/:id/new/list',
    element: <ListNew />,
  },
  //end
  //board
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
  //end
  //user
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
  //end
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
