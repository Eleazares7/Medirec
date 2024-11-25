import speakeasy from "speakeasy";

export const verifyOTP = (app) => {
  app.post("/verifyOtp", (req, res) => {
    const { otpCode, secret } = req.body;

    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: otpCode,
    });


    if (verified) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
