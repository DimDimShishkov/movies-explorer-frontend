import { Routes, Route } from "react-router-dom";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import NoPage from "../NoPage/NoPage";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Register from "../Register/Register";
import SearchForm from "../SearchForm/SearchForm";
import Techs from "../Techs/Techs";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <>
                <Header isStartPage={true} />
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
                <Footer />
              </>
            }
          />
          <Route
            path="signup"
            element={
              <>
                <Header />
                <Register />
              </>
            }
          />
          <Route
            path="signin"
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          <Route
            path="movies"
            element={
              <>
                <Header isLoggedIn={true} />
                <SearchForm />
              </>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
