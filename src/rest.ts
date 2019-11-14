// @ts-ignore
import GoogleSpreadsheet from "google-spreadsheet";
import { APIGatewayEvent, Context, Handler } from "aws-lambda";

const key = process.env.GOOGLE_SHEET_KEY;
const spreadsheet = new GoogleSpreadsheet(key);

const stringToNumber = (str: string): number =>
  parseFloat(str.replace(`,`, `.`));

const convertDateToISO = (date: string): string => new Date(date).toISOString();

export const opening: Handler<any, any> = (event, context, callback) => {
  // @ts-ignore
  return spreadsheet.getInfo((sheetError, info) => {
    if (sheetError) {
      console.error(sheetError);
      return callback(sheetError);
    }

    const sheet = info.worksheets[0];

    const rowOptions = {
      limit: 100000,
      offset: 0
    };

    // @ts-ignore
    return sheet.getRows(rowOptions, (rowsError, rows) => {
      if (rowsError) {
        console.error(rowsError);
        return callback(rowsError);
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(
          rows.map(
            ({
              date,
              stock,
              price
            }: {
              date: string;
              stock: string;
              price: string;
            }) => ({
              date: convertDateToISO(date),
              stock,
              price: stringToNumber(price)
            })
          )
        )
      };

      return callback(null, response);
    });
  });
};
