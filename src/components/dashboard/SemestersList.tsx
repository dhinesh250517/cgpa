import React, { useState } from 'react';
import { useRecord } from '../../context/RecordContext';
import { Plus, Edit, Trash, ChevronDown, ChevronUp } from 'lucide-react';
import SemesterForm from './SemesterForm';

const SemestersList: React.FC = () => {
  const { record, deleteSemester } = useRecord();
  const [addingSemester, setAddingSemester] = useState(false);
  const [editingSemesterId, setEditingSemesterId] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  
  const handleAddClick = () => {
    setAddingSemester(true);
    setEditingSemesterId(null);
  };
  
  const handleEditClick = (semesterId: string) => {
    setEditingSemesterId(semesterId);
    setAddingSemester(false);
  };
  
  const handleDeleteClick = (semesterId: string) => {
    if (window.confirm('Are you sure you want to delete this semester? This action cannot be undone.')) {
      deleteSemester(semesterId);
    }
  };
  
  const handleFormClose = () => {
    setAddingSemester(false);
    setEditingSemesterId(null);
  };
  
  const toggleSemesterDetails = (semesterId: string) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };
  
  if (!record) return null;
  
  // Check which semesters are already added
  const addedSemesters = record.semesters.map(s => s.number);
  const availableSemesters = [1, 2, 3, 4, 5, 6, 7, 8].filter(
    num => !addedSemesters.includes(num)
  );
  
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'O':
        return 'text-green-600';
      case 'A+':
        return 'text-blue-600';
      case 'A':
        return 'text-blue-500';
      case 'B+':
        return 'text-yellow-600';
      case 'B':
        return 'text-yellow-500';
      case 'C':
        return 'text-orange-600';
      case 'P':
        return 'text-orange-500';
      case 'U':
      case 'R':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Semester GPA Details</h3>
        {!addingSemester && !editingSemesterId && availableSemesters.length > 0 && (
          <button 
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add Semester
          </button>
        )}
      </div>
      
      {(addingSemester || editingSemesterId) ? (
        <SemesterForm 
          semesterId={editingSemesterId}
          availableSemesters={availableSemesters}
          onClose={handleFormClose}
        />
      ) : (
        <div className="space-y-4">
          {record.semesters.length > 0 ? (
            record.semesters
              .sort((a, b) => a.number - b.number)
              .map((semester) => (
                <div 
                  key={semester.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div 
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleSemesterDetails(semester.id)}
                  >
                    <div className="flex items-center">
                      {expandedSemester === semester.id ? 
                        <ChevronUp size={18} className="text-gray-500 mr-2" /> : 
                        <ChevronDown size={18} className="text-gray-500 mr-2" />
                      }
                      <h4 className="font-medium">Semester {semester.number}</h4>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">
                        GPA: {semester.gpa.toFixed(2)}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(semester.id);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(semester.id);
                          }}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {expandedSemester === semester.id && (
                    <div className="p-4 border-t border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subject
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Credits
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {semester.subjects.map((subject) => (
                            <tr key={subject.id}>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {subject.name}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {subject.credits}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className={`font-medium ${getGradeColor(subject.grade)}`}>
                                  {subject.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No semesters added yet. Click the "Add Semester" button to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SemestersList;