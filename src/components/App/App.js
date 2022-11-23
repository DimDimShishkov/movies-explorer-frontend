import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NoPage from "../NoPage/NoPage";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { authRegister, authTokenCheck, authCheckIn } from "../../utils/MainApi";
// import { ProtectedRoute } from "../../utils/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState("");

  const history = useNavigate();

  // функция регистрации
  function handleRegister(user) {
    setIsLoading(true);
    authRegister(user)
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
        localStorage.setItem("jwt", res.token);
        history("/signin");
      })
      .catch((err) => {
        setErrorType(err);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }


  // функция входа в аккаунт
  function handleAuth(user) {
    setIsLoading(true);
    authCheckIn(user)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser({
          id: user._id,
          email: user.email,
        });
        localStorage.setItem("jwt", res.token);
        history("/movies");
      })
      .catch((err) => {
        setErrorType(err);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  // функция выхода из аккаунта
  function handleLoggegOut() {
    setLoggedIn(false);
    setCurrentUser({});
    setIsLoading(false);
    localStorage.removeItem("jwt");
    history("/signup");
  }

  // функция авторизации
  const authorisation = async (jwt) => {
    authTokenCheck(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({
            id: res._id,
            email: res.email,
            name: res.name,
          });
        //  history("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      authorisation(jwt);
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route
              path="signup"
              element={
                <Register
                handleSubmitForm={handleRegister}
                  isLoading={isLoading}
                  errorType={errorType}
                />
              }
            />
            <Route
              path="signin"
              element={
                <Login
                handleSubmitForm={handleAuth}
                  isLoading={isLoading}
                  errorType={errorType}
                />
              }
            />
            <Route
              path="movies"
              element={ <Movies /> }
                /* <ProtectedRoute
                  loggedIn={loggedIn}
                  path="movies"
                  component={Movies}
                />
              } */
            />
            <Route
              path="saved-movies"
              element={ <SavedMovies /> }
                /* <ProtectedRoute
                  loggedIn={loggedIn}
                  path="saved-movies"
                  component={<SavedMovies />}
                />
              } */
            />
            <Route
              path="profile"
              element={<Profile />}
                /* <ProtectedRoute
                  loggedIn={loggedIn}
                  path="profile"
                  component={<Profile />}
                />
              } */
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
