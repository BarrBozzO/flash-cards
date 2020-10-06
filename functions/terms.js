const fs = require("fs");
const path = require("path");

exports.handler = (event, context, callback) => {
  const termsBuffer = fs.readFileSync(
    path.resolve(__dirname, "../data/terms.json")
  );
  const terms = JSON.parse(termsBuffer);

  const method = event.httpMethod;

  if (method === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(terms),
    };
  }

  return {
    statusCode: 200,
    body: "something",
  };
};
