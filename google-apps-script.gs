
/**
 * Google Apps Script — nhận bài nộp LMS Kỹ thuật Đệ quy
 * 1. Tạo Google Sheet.
 * 2. Extensions → Apps Script.
 * 3. Dán mã này.
 * 4. Sửa SHEET_NAME nếu cần.
 * 5. Deploy → New deployment → Web app → Execute as Me → Anyone.
 * 6. Dán URL Web App vào API_ENDPOINT trong submit.html.
 */
const SHEET_NAME = 'Submissions';

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  const data = JSON.parse(e.postData.contents || '{}');

  if (sh.getLastRow() === 0) {
    sh.appendRow(['Timestamp','Name','Class','Group','Score','SubmittedAt','AnswersJSON','ChecksJSON']);
  }

  sh.appendRow([
    new Date(),
    data.student?.name || '',
    data.student?.className || '',
    data.student?.group || '',
    data.score || 0,
    data.submittedAt || '',
    JSON.stringify(data.answers || {}),
    JSON.stringify(data.checks || {})
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
