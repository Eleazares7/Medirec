// hooks/useCaptcha.js
import { useRef } from "react";
import toast from "react-hot-toast";

export const useCaptcha = () => {
  const captchaRef = useRef(null);

  const validateCaptcha = () => {
    if (!captchaRef.current.getValue()) {
      toast.error("Acepta el captcha para continuar", { duration: 2000 });
      return false;
    }
    return true;
  };

  return { captchaRef, validateCaptcha };
};
