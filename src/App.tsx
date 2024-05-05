import React from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "components/pages/Dashboard";
import Login from "components/pages/Login";
import NewPoll from "components/pages/NewPoll";
import PollPage from "components/pages/PollPage";
import NotFound from "components/layouts/NotFound";
import CanActivated from "shared/router/canActivated";
import LeaderBoard from "components/pages/LeaderBoard";
import { initialData } from "shared/store/actions";
import { InitialState } from "shared/model/poll";
import Nav from "components/layouts/Nav";

export interface AppProps {
  dispatch: any;
  authedUser: boolean;
}

function App({ dispatch, authedUser }: AppProps) {
  React.useEffect(() => {
    dispatch(initialData());
    return () => {};
    
  }, []);

  return (
    <div>
      {authedUser && <Nav />}
      <div className="container mx-auto py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <CanActivated>
                <Dashboard />
              </CanActivated>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <CanActivated>
                <LeaderBoard />
              </CanActivated>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <CanActivated>
                <PollPage />
              </CanActivated>
            }
          />
          <Route
            path="/add"
            element={
              <CanActivated>
                <NewPoll />
              </CanActivated>
            }
          />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="not-found" />} />
        </Routes>
      </div>
    </div>
  );
}

const mapPropFromStates = ({ State }: { State: InitialState }) => ({
  authedUser: !!State.authedUser,
});

export default connect(mapPropFromStates)(App);

