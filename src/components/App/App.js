import { Routes, Route } from "react-router-dom";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import NoPage from "../NoPage/NoPage";
import Register from "../Register/Register";

function App() {
  return (
    <div className="page">
            <Routes>
        <Route path="/">
        <Route index element={<><Header /><AboutProject /> <Footer /></>} />
             <Route path="signup" element={<Register />} />
             <Route path="signin" element={<Login />} />

  {/*        <Route path="terminal" element={<Terminal />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
