import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { UserFavorites } from "./pages/UserFavorites";
import { PrivateRoute } from "./auth/PrivateRoute";
import { ManyStreamers } from "./pages/ManyStreamers";
import { ManyGames } from "./pages/ManyGames";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <UserInfoPage />
        </PrivateRoute>
        <PrivateRoute path="/favoritos" exact>
          <UserFavorites />
        </PrivateRoute>
        <PrivateRoute path="/games">
          <ManyGames />
        </PrivateRoute>
        <PrivateRoute path="/streamers">
          <ManyStreamers />
        </PrivateRoute>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <LogInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
      </Switch>
    </Router>
  );
};
