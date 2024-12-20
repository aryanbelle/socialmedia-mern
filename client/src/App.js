import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MainPage from "./components/MainPage";
import OTPVerification from "./components/OTPVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import SetNewPassword from "./components/SetNewPassword";
import ForgotPWInput from "./components/ForgotPWInput";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/update-password/:otp" element={<SetNewPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/forgotpassword" element={<ForgotPWInput />} />
          <Route path="/readpost/:postId" element={<PostDetail/>} />
          {/* Use ProtectedRoute and pass MainPage as element */}
          <Route path="/" element={<ProtectedRoute element={<MainPage />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
