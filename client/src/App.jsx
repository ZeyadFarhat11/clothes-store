import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home.page";
import SignIn from "./pages/Auth/SignIn.page";
import SignUp from "./pages/Auth/SignUp.page";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style/style.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "./components/Header/Header";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton";
function App() {
  return (
    <>
      <Header />
      <BackToTopButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
