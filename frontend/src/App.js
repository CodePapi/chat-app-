import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chatroom from "./Pages/chatRoom";
import DashboardPage from "./Pages/Dashboard";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import io from "socket.io-client";
import makeToast from "./Toaster";
import React from "react"

function App() {
   const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("/", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact/>
         <Route
          path="/login"
          render={() => <LoginPage setupSocket={setupSocket} />}
          exact
        />
        <Route path="/register" component={RegisterPage} exact />
          <Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact
        />
        {/* <Route path="/dashboard" component={DashboardPage} exact /> */}
         <Route
          path="/chatroom/:id"
          render={() => <Chatroom socket={socket} />}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
