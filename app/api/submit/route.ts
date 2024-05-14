import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function authorize() {
  const content = fs.readFileSync(path.join(process.cwd(), "credentials.json"), 'utf-8');
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    const token = fs.readFileSync(TOKEN_PATH, 'utf-8');
    oAuth2Client.setCredentials(JSON.parse(token));
  } catch (error) {
    console.error('Error loading token:', error);
  }
  return oAuth2Client;
}

export async function POST(request: NextRequest) {
  const { name, email, social, essay } = await request.json();
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });

  const values = [[name, email, social, essay]];
  const resource = { values };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Sheet1!A1:D1",
      valueInputOption: "RAW",
      requestBody: resource,
    });
    return NextResponse.json({ message: 'Successfully submitted!' }, { status: 200 });
  } catch (err) {
    console.error('Error appending data to Google Sheets:', err);
    return NextResponse.json({ message: 'Error appending data to Google Sheets' }, { status: 500 });
  }
}
