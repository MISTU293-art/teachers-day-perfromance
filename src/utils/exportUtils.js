/**
 * Utility functions for exporting performance registrations
 * Supports CSV, Excel (.xls/.xlsx compatible), and printable PDF
 */

/**
 * Clean string for CSV escaping
 */
const escapeCSV = (str) => {
  if (str === null || str === undefined) return '""';
  const stringValue = String(str).replace(/"/g, '""');
  return `"${stringValue}"`;
};

/**
 * Export data array to CSV format
 * @param {Array<Object>} data 
 * @param {string} filename 
 */
export const exportToCSV = (data, filename = 'gimt_teachers_day_performances.csv') => {
  if (!data || !data.length) {
    alert('No performance data available to export.');
    return;
  }

  const headers = [
    'SL No',
    'Participant Name',
    'Contact Number / Email',
    'Academic Year',
    'Performance Type',
    'Performance Details',
    'Team Members',
    'Registered Date'
  ];

  const rows = data.map((item, index) => [
    index + 1,
    escapeCSV(item.name || ''),
    escapeCSV(item.contact || ''),
    escapeCSV(item.year || item.academicYear || ''),
    escapeCSV(item.performance || item.category || ''),
    escapeCSV(item.performanceDetails || item.details || ''),
    escapeCSV(item.teamMembers || ''),
    escapeCSV(item.createdAt ? new Date(item.createdAt).toLocaleString() : '')
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export data array to Excel (.xls HTML table format compatible with MS Excel / Google Sheets)
 * @param {Array<Object>} data 
 * @param {string} filename 
 */
export const exportToExcel = (data, filename = 'gimt_teachers_day_performances.xls') => {
  if (!data || !data.length) {
    alert('No performance data available to export.');
    return;
  }

  const tableHeader = `
    <tr style="background-color: #2563EB; color: #FFFFFF; font-weight: bold; height: 35px;">
      <th style="border: 1px solid #CBD5E1; padding: 8px;">#</th>
      <th style="border: 1px solid #CBD5E1; padding: 8px;">Participant Name</th>
      <th style="border: 1px solid #CBD5E1; padding: 8px;">Contact</th>
      <th style="border: 1px solid #CBD5E1; padding: 8px;">Academic Year</th>
      <th style="border: 1px solid #CBD5E1; padding: 8px;">Performance Type</th>
      <th style="border: 1px solid #CBD5E1; padding: 8px;">Details</th>
      <th style="border: 1px solid #CBD5E1; padding: 8px;">Team Members</th>
      <th style="border: 1px solid #CBD5E1; padding: 8px;">Registration Date</th>
    </tr>
  `;

  const tableRows = data.map((item, index) => {
    const bg = index % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    return `
      <tr style="background-color: ${bg}; height: 30px;">
        <td style="border: 1px solid #CBD5E1; padding: 8px; text-align: center;">${index + 1}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px; font-weight: 600;">${item.name || ''}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px;">${item.contact || ''}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px;">${item.year || item.academicYear || ''}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px; font-weight: 500;">${item.performance || item.category || ''}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px;">${item.performanceDetails || item.details || '-'}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px;">${item.teamMembers || '-'}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px;">${item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</td>
      </tr>
    `;
  }).join('');

  const excelTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Teachers Day Registrations</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { font-size: 13px; }
      </style>
    </head>
    <body>
      <h2 style="color: #0F172A; margin-bottom: 4px;">Global Institute of Management and Technology</h2>
      <h4 style="color: #2563EB; margin-top: 0;">Teachers’ Day 2026 — Student Performance Participant List</h4>
      <p style="color: #64748B; font-size: 12px;">Exported on: ${new Date().toLocaleString()} | Total Participants: ${data.length}</p>
      <table>
        <thead>${tableHeader}</thead>
        <tbody>${tableRows}</tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Trigger clean browser Print / Save to PDF
 */
export const printParticipantList = () => {
  window.print();
};
