import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import CreatePoll from "../components/createPoll/CreatePoll";
import VotePoll from "../components/VotePoll";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/create" replace />,
      },
      {
        path: "create",
        element: <CreatePoll />,
      },
      {
        path: "vote/:id",
        element: <VotePoll />,
      },
    ],
  },
]);
