import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Genera un string con la fecha y hora actual formateada como:
 * YYYYMMDD_HH-mm-ss (ejemplo: 20250607_12-03-45)
 * @returns {string} Fecha y hora formateada
 */
const getFormattedDateTime = () => {
  const now = new Date();
  // Obtenemos año, mes, día
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
  const day = String(now.getDate()).padStart(2, "0");

  // Obtenemos horas, minutos y segundos en formato 24h
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Construimos el string final
  return `${year}${month}${day}_${hours}-${minutes}-${seconds}`;
};

/**
 * Exporta los datos del presupuesto a un archivo Excel con formato bonito
 * @param {Object} budget - Objeto con los datos del presupuesto
 */
export const exportToExcel = (budget) => {
  // Creamos un arreglo con encabezados y valores
  const data = [
    ["Concepto", "Monto (USD)"], // Encabezados de columna
    ["Entradas", budget.entries],
    ["Transporte", budget.transport],
    ["Guía turístico", budget.guide],
    ["Servicio aeropuerto", budget.airport],
    ["Total estimado", budget.total],
  ];

  // Creamos la hoja con los datos
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Ajustamos anchos de columnas para mejor visualización
  worksheet["!cols"] = [
    { wch: 20 }, // Ancho para columna "Concepto"
    { wch: 15 }, // Ancho para columna "Monto (USD)"
  ];

  // Aplicamos estilos a los encabezados (negrita, color de fondo, alineación)
  const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[cellAddress]) continue;
    worksheet[cellAddress].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F46E5" } }, // Azul intenso de fondo
      alignment: { horizontal: "center" },
    };
  }

  // Creamos un nuevo libro de trabajo y agregamos la hoja
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Presupuesto");

  // Escribimos el archivo Excel con estilos
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  // Creamos un Blob con tipo MIME correcto para Excel
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Generamos el nombre con fecha y hora actual con segundos
  const fileName = `Presupuesto_${getFormattedDateTime()}.xlsx`;

  // Guardamos el archivo usando file-saver
  saveAs(blob, fileName);
};

/**
 * Exporta los datos del presupuesto a un archivo Word con formato HTML bonito
 * @param {Object} budget - Objeto con los datos del presupuesto
 */
export const exportToWord = (budget) => {
  // Contenido HTML con estilos inline para Word
  const content = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' 
        xmlns:w='urn:schemas-microsoft-com:office:word' 
        xmlns='http://www.w3.org/TR/REC-html40'>
  <head><title>Presupuesto</title>
    <style>
      body { font-family: 'Poppins', sans-serif; color: #333; padding: 20px; }
      h1 { color: #4F46E5; }
      table { border-collapse: collapse; width: 100%; max-width: 400px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #4F46E5; color: white; }
      tr:nth-child(even) { background-color: #f9f9f9; }
      tfoot td { font-weight: bold; color: #4F46E5; }
    </style>
  </head>
  <body>
    <h1>Detalles del Presupuesto</h1>
    <table>
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Monto (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Entradas</td><td>$${budget.entries}</td></tr>
        <tr><td>Transporte</td><td>$${budget.transport}</td></tr>
        <tr><td>Guia turistico</td><td>$${budget.guide}</td></tr>
        <tr><td>Servicio aeropuerto</td><td>$${budget.airport}</td></tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total estimado</td>
          <td>$${budget.total}</td>
        </tr>
      </tfoot>
    </table>
  </body>
  </html>`;

  // Creamos un Blob con tipo MIME para Word
  const blob = new Blob([content], {
    type: "application/msword",
  });

  // Generamos el nombre con fecha y hora actual con segundos
  const fileName = `Presupuesto_${getFormattedDateTime()}.doc`;

  // Guardamos el archivo usando file-saver
  saveAs(blob, fileName);
};
