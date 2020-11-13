import "./App.css";
import { Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
