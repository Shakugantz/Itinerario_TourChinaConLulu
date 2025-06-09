import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Exporta los datos del presupuesto a un archivo Excel
export const exportToExcel = (budget) => {
  const worksheet = XLSX.utils.json_to_sheet([budget]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Presupuesto");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "presupuesto.xlsx");
};

// Exporta los datos del presupuesto a un archivo Word
export const exportToWord = (budget) => {
  const content = `
    Detalles del Presupuesto\n
    Entradas: ¥${budget.entries}
    Transporte: ¥${budget.transport}
    Guia turistico: ¥${budget.guide}
    Servicio aeropuerto: ¥${budget.airport}
    Total estimado: ¥${budget.total}
  `;

  const blob = new Blob([content], {
    type: "application/msword",
  });

  saveAs(blob, "presupuesto.doc");
};
