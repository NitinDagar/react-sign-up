import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SignUpForm from "./pages/signUp.js"

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="application_wrapper">

        <div className="application_routeHandler">
          <SignUpForm />
        </div>

      </div>
    </>
  );
}

export default App;
