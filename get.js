const { connectDB } = require("./data/database");

const connection = connectDB();

module.exports = (req, res) => {
  if (req.url == "/getallData") {
    try {
      connection.query("select * from ctableop", (err, results) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              success: false,
              message: `Error:-${err}`,
            })
          );
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              success: true,
              message: results,
            })
          );
        }
      });
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: `Error:--testing${error}`,
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Not Found",
      })
    );
  }
};
