import { useNavigate } from "react-router-dom";

import { useAuth } from "../../provider/authProvider";
import NavBar from "../../components/NavBar";

const Tasks = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  return <NavBar logout={logout} />;
};

export default Tasks;
