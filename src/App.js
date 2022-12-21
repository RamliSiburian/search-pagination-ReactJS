import { Dropdown, Nav } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbars from "./component/Navbar";
import Home from "./pages/Home";
import { PrivateRoute } from './component/Private-route';
import Admin from "./pages/Admin";
import AddArticle from "./pages/Add-article";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/User-context";
import { API, setAuthToken } from "./config/api/Api";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const checkUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {

      const response = await API.get("/check-auth");
      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      if (response.data.code === 200) {
        setIsLoading(false)
        navigate("/Admin")
      }
    } catch (error) {
      if (error.response.data.code === 401) {
        navigate("/")
      }
    }
  };

  useEffect(() => {
    checkUser()
  }, []);

  return (
    <>
      <Navbars />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/Admin" element={<Admin />} />
          <Route exact path="/Add-article" element={<AddArticle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
