import { Dropdown, Nav } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import Navbars from "./component/Navbar";
import Home from "./pages/Home";
import { PrivateRoute } from './component/Private-route';
import Admin from "./pages/Admin";
import AddArticle from "./pages/Add-article";


function App() {
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
