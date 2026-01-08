const crypto = require("crypto");
const { exec } = require("child_process");
const express = require("express");

const SECRET =
  "4bdbc756ce7dab476b123c0df35b83b0a61980c7b0bb0fb394c7019697437317";

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  console.log("Webhook hit");

  const sig = req.headers["x-hub-signature-256"];
  console.log("Signature:", sig);

  const payload = JSON.stringify(req.body);
  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");

  if (`sha256=${hmac}` !== sig) {
    console.log("HMAC mismatch");
    return res.sendStatus(401);
  }

  const ref = req.body.ref;
  console.log("Ref:", ref);

  if (ref === "refs/heads/main") {
    console.log("Running prod deploy");
    exec("/var/www/Allo-products/deploy/prod.sh");
  }

  if (ref === "refs/heads/deploy") {
    console.log("Running staging deploy");
    exec("/var/www/Allo-products/deploy/staging.sh");
  }

  res.send("ok");
});

app.listen(9000, "127.0.0.1", () => {
  console.log("Webhook server listening on 127.0.0.1:9000");
});
