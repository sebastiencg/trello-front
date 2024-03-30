import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "../route/Board.tsx";
import Register from "../route/Register.tsx";
import Login from "../route/Login.tsx";
import Logout from "../route/Logout.tsx";
import Boards from "../route/Boards.tsx";
import BoardNew from "../route/BoardNew.tsx";
import ListNew from "../route/ListNew.tsx";
import CardNew from "../route/CardNew.tsx";
import BoardUpdate from "../route/BoardUpdate.tsx";
import BoardDelete from "../route/BoardDelete.tsx";
import BoardAddUser from "../route/BoardAddUser.tsx";
import BoardRemoveUser from "../route/BoardRemoveUser.tsx";
import ListDelete from "../route/ListDelete.tsx";
import ListUpdate from "../route/ListUpdate.tsx";

const router = createBrowserRouter([
  //card
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
  {
    path: '/board/:boardId/list/:id/delete',
    element: <ListDelete/>,
  },
  {
    path: '/board/:boardId/list/:id/update',
    element: <ListUpdate />,
  },
  //end
  //board
  {
    path: '/board/:id',
    element: <Board />,
  },
  {
    path: '/board/:id/add/user/',
    element: <BoardAddUser />,
  },
  {
    path: '/board/:id/remove/user/',
    element: <BoardRemoveUser />,
  },
  {
    path: '/board/:id/update',
    element: <BoardUpdate />,
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
    path: '/board/:id/delete',
    element: <BoardDelete/>,
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
    element: <Boards />,
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
