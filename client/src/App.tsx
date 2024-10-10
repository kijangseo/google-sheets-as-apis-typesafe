import { useState, useEffect } from "react";
import { BackendService } from "@genezio-sdk/google-sheets-as-apis-typesafe";
import "./App.css";

export default function App() {
  const [sheetNames, setSheetNames] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const [columnLetters, setColumnLetters] = useState<string[]>([]);

  useEffect(() => {
    getSheetNames();
  }, []);

  function handleSheetChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const sheetName = event.target.value;
    if (sheetName != "") {
      getSheetData(sheetName);
    }
  }

  async function getSheetNames() {
    setSheetNames(await BackendService.getSheetNames());
    document.getElementById("loadingOption")!.textContent = "Select a sheet";
  }

  // Function to convert column index to Excel-like column letters
  function getColumnLetter(n: number): string {
    let s = '';
    while (n >= 0) {
      s = String.fromCharCode((n % 26) + 65) + s;
      n = Math.floor(n / 26) - 1;
    }
    return s;
  }

  async function getSheetData(sheetName: string) {
    const sheetData = await BackendService.getSheetData(sheetName);

    // add missing cells to make all rows the same length
    const maxColumns = sheetData.reduce((max: number, row: string[]) => Math.max(max, row.length), 0);
    sheetData.forEach((rowData: string[]) => {
      while (rowData.length < maxColumns) {
        rowData.push("");
      }
    });

    // Get the column letters
    const cl = [];
    for (let i = 0; i < maxColumns; i++) {
      cl.push(getColumnLetter(i));
    }

    setColumnLetters(cl);
    setSheetData(sheetData);
  }

  return (
    <>
      <h1>Google Sheets Data</h1>
      <div>
        <span>Sheets:</span>
        <select onChange={handleSheetChange}>
          <option id="loadingOption" key="">Loading...</option>
          {sheetNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      {columnLetters.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className="rowNumber"></th> {/* Empty cell for row numbers */}
              {columnLetters.map((letter: string) => (
                <th>{letter}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheetData.map((row: string[], i: number) => (
              <tr key={i}>
                <td className={"rowNumber"}>{i+1}</td>
                {row.map((cell:string) => (
                  <td>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )} 
    </>
  );
}
