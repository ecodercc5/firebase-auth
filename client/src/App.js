import "./App.css";
import { Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Setup } from "./pages/Setup";

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/setup" component={Setup} />
      </Switch>
    </div>
  );
}

export default App;
