require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = path.join(__dirname, "token.json");

app.use(cors());
app.use(bodyParser.json());

fs.readFile(path.join(__dirname, "credentials.json"), (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  authorize(JSON.parse(content), startServer);
});

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err || !token) return getAccessToken(oAuth2Client, callback);
    try {
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    } catch (error) {
      console.error("Error parsing token:", error);
      getAccessToken(oAuth2Client, callback);
    }
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function startServer(auth) {
  const sheets = google.sheets({ version: "v4", auth });

  app.post("/submit", (req, res) => {
    const { name, email, social, essay } = req.body;
    const values = [[name, email, social, essay]];
    const resource = { values };

    sheets.spreadsheets.values.append(
      {
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: "Sheet1!A1:D1",
        valueInputOption: "RAW",
        requestBody: resource,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error appending data to Google Sheets");
        } else {
          res.status(200).send("Successfully submitted!");
        }
      }
    );
  });

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

app.get("/auth", (req, res) => {
  const { client_secret, client_id, redirect_uris } = require("./credentials.json").web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

app.get("/oauth2callback", (req, res) => {
  const { client_secret, client_id, redirect_uris } = require("./credentials.json").web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const code = req.query.code;

  oAuth2Client.getToken(code, (err, token) => {
    if (err) return res.status(400).send("Error while trying to retrieve access token");

    oAuth2Client.setCredentials(token);
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) console.error(err);
      console.log("Token stored to", TOKEN_PATH);
    });
    res.status(200).send("Authentication successful! You can close this tab.");
  });
});
