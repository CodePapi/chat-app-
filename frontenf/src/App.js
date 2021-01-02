import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={DashboardPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
