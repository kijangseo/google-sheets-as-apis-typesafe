import { google } from 'googleapis';
import { GenezioDeploy } from "@genezio/types";

const SERVICE_ACCOUNT_FILE = './service-account-key.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '';

// Load the service account credentials
const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

@GenezioDeploy()
export class BackendService {
  constructor() {}

  // Get the names of the sheets in the spreadsheet
  async getSheetNames() {
    if (!SPREADSHEET_ID) throw new Error('SPREADSHEET_ID is not set');
    try {
      const response = await sheets.spreadsheets.get({
          spreadsheetId: SPREADSHEET_ID,
      });

      const sheetsData = response.data.sheets;
      if (sheetsData) {
        const sheetNames = sheetsData.map(sheet => sheet.properties?.title);
        return sheetNames;
      }
      return [];
    } catch (err) {
        console.error(err);
        throw new Error('Error reading spreadsheet sheet names. Make sure the SPREADSHEET_ID is correct and that the service-account-key.json file has the right contents.');
    }
  }

  // Get the tabular data from a specific sheet
  async getSheetData(sheetName: string) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: sheetName,
        });

        const values = response.data.values;
        if (values) {
          return values;
        }
        return [];
    } catch (err) {
        console.error('Error retrieving sheet data:', err);
    }
  }
}
