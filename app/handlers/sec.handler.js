import {promisify} from 'util';

import GoogleSpreadsheet from 'google-spreadsheet';
import credentials from '../configuration/sec';

const SPREADSHEET_ID = '1v-C7fkcy4rWAQIQcvF1xgCFdQMX-wZN-RpoV_-twYyc';
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export async function sendToSheet(req, res, next) {
  try {
    const {sheet} = req.body;
    if (sheet.Phrase.toLowerCase() === 'epam sec 2018 now') {
      await promisify(doc.useServiceAccountAuth)(credentials);
      const info = await promisify(doc.getInfo)();
      const data = await promisify(doc.getCells)(info.worksheets[0].id, {
        'min-row': 2,
        'min-col': 1,
        'max-col': 1
      });
      const actualArr = data.map((item) => item.value);
      if (!actualArr.includes(sheet.githubId)) {
        await promisify(doc.addRow)(info.worksheets[0].id, sheet);
      }
    }
    res.send('success');
  } catch (err) {
    res.status(500).send('server error');
  }
}
