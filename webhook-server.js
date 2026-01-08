const crypto = require("crypto");
const { exec } = require("child_process");
const express = require("express");

const SECRET = "4bdbc756ce7dab476b123c0df35b83b0a61980c7b0bb0fb394c7019697437317";

const app = express();
app.use(express.json());

function verifySignature(req) {
  const sig = req.headers["x-hub-signature-256"];
  if (!sig) return false;

  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  return sig === `sha256=${hmac}`;
}

app.post("/", (req, res) => {
  if (!verifySignature(req)) return res.sendStatus(401);

  const ref = req.body.ref;

  if (ref === "refs/heads/main") {
    exec("/var/www/Allo-products/deploy/prod.sh");
  }

  if (ref === "refs/heads/deploy") {
    exec("/var/www/Allo-products/deploy/staging.sh");
  }

  res.send("ok");
});

app.listen(9000, "127.0.0.1");
