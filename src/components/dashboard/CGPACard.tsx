import React from 'react';
import { useRecord } from '../../context/RecordContext';
import { PieChart, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Add type for jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const CGPACard: React.FC = () => {
  const { record } = useRecord();
  
  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9) return 'text-green-600';
    if (cgpa >= 8) return 'text-blue-600';
    if (cgpa >= 7) return 'text-yellow-600';
    if (cgpa >= 6) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const downloadReport = () => {
    if (!record) return;
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Saveetha Engineering College', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('GPA & CGPA Report', 105, 30, { align: 'center' });
    
    // Add student info
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 45);
    doc.text(`CGPA: ${record.cgpa.toFixed(2)}`, 15, 52);
    
    // Create semester table
    const tableColumn = ['Semester', 'GPA'];
    const tableRows = record.semesters
      .sort((a, b) => a.number - b.number)
      .map(semester => [
        `Semester ${semester.number}`,
        semester.gpa.toFixed(2)
      ]);
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: 'grid',
      styles: { fontSize: 12, cellPadding: 5 },
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Save the PDF
    doc.save(`CGPA_Report_${new Date().toLocaleDateString()}.pdf`);
  };
  
  if (!record) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <PieChart className="text-blue-600 mr-2" size={24} />
          <h3 className="text-xl font-semibold">Overall Academic Performance</h3>
        </div>
        <button 
          onClick={downloadReport}
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          disabled={record.semesters.length === 0}
        >
          <Download size={18} className="mr-1" />
          Download Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <h4 className="text-gray-600 mb-2">Current CGPA</h4>
          <p className={`text-5xl font-bold ${getCGPAColor(record.cgpa)}`}>
            {record.cgpa.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on {record.semesters.length} semester{record.semesters.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-gray-600 mb-2">Semester Overview</h4>
          {record.semesters.length > 0 ? (
            <div className="space-y-3">
              {record.semesters
                .sort((a, b) => a.number - b.number)
                .map((semester) => (
                  <div key={semester.id} className="flex justify-between items-center">
                    <span>Semester {semester.number}</span>
                    <span className={`font-semibold ${getCGPAColor(semester.gpa)}`}>
                      {semester.gpa.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No semesters added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CGPACard;