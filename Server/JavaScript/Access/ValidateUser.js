export const ValidateUser = (app, dbMedirec) => {
  app.post("/validateUser", (req, res) => {
    const { userData } = req.body;

    const SEARCH_USER_QUERY = "SELECT * FROM users WHERE user_email = ?";
    console.log(userData.email);

    dbMedirec.query(SEARCH_USER_QUERY, [userData.email], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }

      // Check if any results were found
      if (results && results.length > 0) {
        return res.json({ success: true, userData: results[0] });
      } else {
        return res.json({ success: false, message: "User not fuound" });
      }
    });
  });
};
