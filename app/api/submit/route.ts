import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file"];

async function authorize() {
  const credentials = {
    web: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      project_id: process.env.GOOGLE_PROJECT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uris: [process.env.GOOGLE_REDIRECT_URIS]
    }
  };
  
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Set credentials directly from environment variables
  const token = {
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    scope: process.env.GOOGLE_SCOPE,
    token_type: process.env.GOOGLE_TOKEN_TYPE,
    expiry_date: parseInt(process.env.GOOGLE_EXPIRY_DATE, 10)
  };
  oAuth2Client.setCredentials(token);
  
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
      range: 'Sheet1!A1:D1',
      valueInputOption: 'RAW',
      requestBody: resource,
    });
    return NextResponse.json({ message: 'Successfully submitted!' }, { status: 200 });
  } catch (err) {
    console.error('Error appending data to Google Sheets:', err);
    return NextResponse.json({ message: 'Error appending data to Google Sheets' }, { status: 500 });
  }
}
