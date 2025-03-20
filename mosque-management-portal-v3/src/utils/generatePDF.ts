import {jsPDF} from 'jspdf';
import {autoTable} from 'jspdf-autotable';
import {GeneratePDFOptions} from "../types/BaseOption.ts";

export const generatePDF = <T extends object>({
                                                  data,
                                                  title = 'Report',
                                                  fileName = 'report.pdf',
                                                  columns = [],
                                                  columnNames = [],
                                                  sortedData = null
                                              }: GeneratePDFOptions<T>): void => {
    const doc = new jsPDF();
    
    const formattedDate = new Date().toLocaleString();

    doc.setFontSize(14);
    doc.text(title, 20, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 20, 30);
    
    const tableData = sortedData || data;

    const tableRows = tableData.map(item =>
        columnNames.map(col => item[col] || 'N/A')
    );
    
    autoTable(doc, {
        startY: 40,
        head: [columns],
        body: tableRows,
    });
    
    doc.save(fileName);
};
