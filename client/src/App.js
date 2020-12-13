import "./App.css";
import { Redirect, Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Setup } from "./pages/Setup";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/setup" component={Setup} />

        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </div>
  );
}

export default App;
