import { useContext } from "react";
import { RouterContext } from "./RouterContext";

const useHistory = () => {
  const { history } = useContext(RouterContext);

  return history;
};

const useLocation = () => {
  const { location } = useContext(RouterContext);

  return location;
};

const useRouteMatch = () => {
  const { match } = useContext(RouterContext);

  return match;
};

const useParams = () => {
  const { match } = useContext(RouterContext);

  return match ? match.params : {};
};

export { useHistory, useLocation, useParams, useRouteMatch };
