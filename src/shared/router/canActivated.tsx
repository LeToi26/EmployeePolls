import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { InitialState } from "shared/model/poll";

export interface CanActProps {
  children: any;
  authedUser: boolean;
}

export const CanAct = ({ children, authedUser }: CanActProps) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  return authedUser ? (
    children
  ) : (
    <Navigate to={`/login?redirectTo=${redirectUrl}`} />
  );
};

const mapPropFromStates = ({ State }: { State: InitialState }) => ({
  authedUser: !!State.authedUser,
});

export default connect(mapPropFromStates)(CanAct);
