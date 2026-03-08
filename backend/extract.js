import axios from "axios";
import xlsx from "xlsx";
import fs from "fs";

const TOPIC_ID = "0.0.8120935";
const EXCEL_FILE = "survey_answers.xlsx";

let lastTimestamp = "0";

async function fetchMessages() {
  try {
    const url = `https://testnet.mirrornode.hedera.com/api/v1/topics/${TOPIC_ID}/messages?order=asc&limit=100`;
    const res = await axios.get(url);

    const messages = res.data.messages || [];
    let newRows = [];

    for (const msg of messages) {
      const ts = msg.consensus_timestamp;
      if (ts <= lastTimestamp) continue;

      lastTimestamp = ts;

      const decoded = Buffer.from(msg.message, "base64").toString("utf8");

      const row = {};
      decoded.split("\n").forEach((line) => {
        const [key, value] = line.split(":");
        if (key && value) row[key.trim()] = value.trim();
      });

      if (Object.keys(row).length) {
        row.timestamp = ts;
        newRows.push(row);
      }
    }

    if (newRows.length) {
      let workbook;
      let sheet;

      if (fs.existsSync(EXCEL_FILE)) {
        workbook = xlsx.readFile(EXCEL_FILE);
        sheet = workbook.Sheets["Responses"];
      } else {
        workbook = xlsx.utils.book_new();
      }

      const existing = sheet ? xlsx.utils.sheet_to_json(sheet) : [];
      const updated = [...existing, ...newRows];

      const newSheet = xlsx.utils.json_to_sheet(updated);
      xlsx.utils.book_append_sheet(workbook, newSheet, "Responses", true);

      xlsx.writeFile(workbook, EXCEL_FILE);
      console.log(`Added ${newRows.length} rows to Excel`);
    }
  } catch (err) {
    console.error("Mirror node error:", err.message);
  }
}

// run every 5 seconds
setInterval(fetchMessages, 5000);
fetchMessages();