import { google } from 'googleapis';
import { GenezioDeploy } from "@genezio/types";

const SERVICE_ACCOUNT_FILE = ' "type": "service_account",
"project_id": "trusty-sol-447209-i1",
"private_key_id": "7b7a0636309b6f64cd9e14cfc119495282a0639a",
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGqUHXbsMtSc0O\nTQIu3saKLv5Igc1N4i6x1blYpd3vZ2TNINfkOGxxRU4sccdhfYvBdRFpDUXj9fzF\nqY1njfxnqMYvgN8zW9vk+dz7Q9ZlPQ0KPBRoBTKHtj0YYcHuE10loKfwcrlsmd6d\nh4ZtZW5DWrn7fyrTaCGDsoO5h3Bl/tuoMANVBIfae2vLHu7ANN8buFlUiGxqToiV\nq4We6s4L1Ln/jcjymlEsZCc7xK6LgMoLltxUX5D0SfJbc0C2HHpSvJgrzrdUWYEF\n8HS/RmEhMdTxgLKSN6aHPfjJpOpbp2iDNxsVzXt12ScdKqRzUhf81FrQDfTAqpNL\nv5hJlri9AgMBAAECggEAHioPDEYOLq85CoXY4gMDhHHUPHAxGzVPv8Li7Lnqs/Iw\nFRF6lnWWybArSYZRLtVgRhSfeyL/zLhKFD1FckbV32t6BDZ+LY8yGVdzHVfUkvSt\nKTOsKYs4e/DI4A3f42VfTFpThaf1za6jZanxWGUBVArPmIdbmlQCWrvdUmtlPqcq\nOrm9NuXcZ7Y2fB2+8Fv1e3SfoJEWEJU7+jO0quwEfGJUBoeCltCKRfi15zHrmoPO\nXHzS8lBFd6vnP5HF7l+EV2m0zh5sjTleBhBzGb10H43ey1Y1vq9ySK5fIVM+7KzC\nxUvobECQX2m7fF0//NSerSyJaEW8yp5kIVPrrD6tAQKBgQD1WlqqGh67kBWyN7Fo\nIyvFzeayouGD/RkfLlbaWqRmGmHPA4aaDZ3sfdM8Z31M0YWflR8VuVFTowOc+B9Q\n3jGNJfGZfPvSjBwXZrO6ECdajJ8xZMFfgyG2ijw8bwBBxvzWCoNPmjhxz+spDKAm\nQNf6oZIu6mwGkmR+O0E5F3D6fQKBgQDPSDNADbiDKZSrfsojYqPYXFn4rZGkVpZ2\nNDihhq6cnqrPYlOp6Hs4chWkKYOI0aN4C4UXOkTCOEJs3R1OvjtGuqvB/+gMibpH\nzo+dRjjH7+0bwyhpza9k6PMGeoipgke/NSdqO++uJCOVGY1JvVs6+PQntWR4HV32\nZ/yVeT7LQQKBgQDVZnM5RGK6rMXSLtKlSwIFl+MyOK2BiaBSGJH+dZxMGmI8Fkr6\nryFO0tnpzfGT4SEh/if9UyRDZKP94WoLglcC95+96pF1PdwpFnD4QpiYD3tfEM2I\nb5vhEzb1MW69x3+eA6LWl8LEax2UpKCe5QN1wRZOrCKtTKMPkCZYq+TeWQKBgCxf\n2ojl5xA9QJSOKhv1K/pPmvs/vSQfXUqk11LNEGh7FzoaZKrFGEv3MGbadExABOzY\nGn/ke3/Qp3fCxllrJCl6IPcBH94/Rd/Fer1CoTk8RdhhqS8tV1UVAaHrbYJMX6ux\nZ2S4vBDdr7hlpfeZUASJ80rk7ENCljEABfTB5g2BAoGBAIxX6KauIMcNTEJQ+ebf\napl0NapCYgPyA06P3AJsUn+FBe1RWOBAatFvNK86VzPn45W1gVr5km3+V3ZT0YE/\neMUro3wB7crmnCXchbdEAGZgDInDI9uUBGlR/F6DRe/0htFLKUJA7LqvACqNiCvL\n8aehzen5OL1wsyAZB6s34GA5\n-----END PRIVATE KEY-----\n",
"client_email": "autodepo@trusty-sol-447209-i1.iam.gserviceaccount.com",
"client_id": "109249586758796604026",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/autodepo%40trusty-sol-447209-i1.iam.gserviceaccount.com",
"universe_domain": "googleapis.com"';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '1QzdXmbhpvNcSZoWqK2VFZTDMkc37JfHBovIIJGIsU6M';

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
    if (!SPREADSHEET_ID) throw new Error('Gak Ada Sheet');
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
