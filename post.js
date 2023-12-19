const { connectDB } = require("./data/database");

const connection = connectDB();

module.exports = (req, res) => {
  if (req.url == "/postData") {
    try {
      let Data = "";
      req.on("data", (incomingData) => {
        Data += incomingData.toString();
      });

      req.on("end", () => {
        parsedData = JSON.parse(Data);
        connection.query(
          "insert into ctable set ?",
          parsedData,
          (err, results) => {
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
                  message: "Success",
                })
              );
            }
          }
        );
      });
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          success: false,
          message: `Error:--${error}`,
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
