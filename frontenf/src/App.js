import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/register" component={RegisterPage} exact/>
        <Route path="/dashboard" component={DashboardPage} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
