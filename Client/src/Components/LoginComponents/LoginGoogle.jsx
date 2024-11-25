//Hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Components libraries
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

//Libraries
import axios from "axios";

export const LoginGoogle = () => {
  const clientId =
    "467288965134-drgni37qcr378afu3rkedglvemtatu8m.apps.googleusercontent.com";

  const navigate = useNavigate();

  const handleLoginFailure = (error) => {
    console.error(`Login Failed`, error);
  };

  const onSuccessLogOut = () => {
    console.log("Log out successful");
  };

  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    const data = jwtDecode(token);

    const userData = {
      name: data.given_name,
      lastname: data.family_name,
      email: data.email,
      imageUrl: data.picture,
    };

    try {
      const response = await axios.post("http://localhost:3001/validateUser", {
        userData,
      });
      if (response.data.success) {
        //In case to found userData -> Redirec to  "/otp"
        toast.success(`Bienvenid@ ${response.data.userData.user_name}`);
        setTimeout(() => {
          navigate("/otp", { state: { data: response.data.userData } });
        }, 2000);
      } else {
        //In case to not found user -> redirect to Register Google

        toast.success(`Bienvenid@  ${userData.name}`);
        setTimeout(() => {
          //Send user Google data to googleRegister
          navigate("/googleRegister", { state: { userData: userData } });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR CATCH");
      throw error;
    }
  };

  return (
    <>
      <div className="text-center">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
      <Toaster />
    </>
  );
};
