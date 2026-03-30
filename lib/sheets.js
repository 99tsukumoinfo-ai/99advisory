import { google } from 'googleapis';

export async function appendLeadRow(row) {
  console.log('[sheets] env check — GOOGLE_CLIENT_EMAIL:', !!process.env.GOOGLE_CLIENT_EMAIL, '| GOOGLE_PRIVATE_KEY:', !!process.env.GOOGLE_PRIVATE_KEY, '| GOOGLE_SHEET_ID:', !!process.env.GOOGLE_SHEET_ID);
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const result = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'シート1!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row]
    }
  });
  console.log('[sheets] append result — updatedRange:', result.data.updates?.updatedRange, '| updatedRows:', result.data.updates?.updatedRows, '| spreadsheetId:', process.env.GOOGLE_SHEET_ID?.slice(0, 10) + '...');
}
