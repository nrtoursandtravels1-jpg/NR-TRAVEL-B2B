import * as XLSX from "xlsx";

// Import Excel
export const importExcel = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, {
        type: "array",
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(sheet);

      resolve(data);
    };

    reader.readAsArrayBuffer(file);
  });
};

// Export Excel
export const exportExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Leads"
  );

  XLSX.writeFile(workbook, "NR_Travel_Leads.xlsx");
};