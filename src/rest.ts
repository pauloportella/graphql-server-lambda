import GoogleSpreadsheet from "google-spreadsheet";

const key = process.env.GOOGLE_SHEET_KEY;
const spreadsheet = new GoogleSpreadsheet(key);

const stringToNumber = str => parseFloat(str.replace(`,`, `.`));
const convertDateToISO = date => new Date(date).toISOString();

export const opening = (event, context, callback) => {
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

    return sheet.getRows(rowOptions, (rowsError, rows) => {
      if (rowsError) {
        console.error(rowsError);

        return callback(rowsError);
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(
          rows.map(({ date, stock, price }) => ({
            date: convertDateToISO(date),
            stock,
            price: stringToNumber(price)
          }))
        )
      };

      return callback(null, response);
    });
  });
};
