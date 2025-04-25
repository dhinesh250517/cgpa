import React, { useState, useEffect } from 'react';
import { useRecord } from '../../context/RecordContext';
import { SubjectGrade } from '../../types';
import { X, Plus, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface SemesterFormProps {
  semesterId: string | null;
  availableSemesters: number[];
  onClose: () => void;
}

const SemesterForm: React.FC<SemesterFormProps> = ({ 
  semesterId,
  availableSemesters,
  onClose 
}) => {
  const { record, addSemester, updateSemester } = useRecord();
  const [semesterNumber, setSemesterNumber] = useState<number>(
    availableSemesters[0] || 1
  );
  const [subjects, setSubjects] = useState<SubjectGrade[]>([]);
  
  // Initialize form data if editing
  useEffect(() => {
    if (semesterId && record) {
      const semester = record.semesters.find(s => s.id === semesterId);
      if (semester) {
        setSemesterNumber(semester.number);
        setSubjects([...semester.subjects]);
      }
    } else {
      // Add empty subject for new semester
      setSubjects([
        {
          id: uuidv4(),
          name: '',
          credits: 3,
          grade: 'O',
        },
      ]);
    }
  }, [semesterId, record]);
  
  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: uuidv4(),
        name: '',
        credits: 3,
        grade: 'O',
      },
    ]);
  };
  
  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };
  
  const handleSubjectChange = (
    id: string,
    field: keyof SubjectGrade,
    value: string | number
  ) => {
    setSubjects(
      subjects.map(subject =>
        subject.id === id
          ? { ...subject, [field]: value }
          : subject
      )
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (subjects.some(s => !s.name.trim())) {
      alert('Please enter a name for all subjects');
      return;
    }
    
    if (semesterId) {
      updateSemester(semesterId, subjects);
    } else {
      addSemester(semesterNumber, subjects);
    }
    
    onClose();
  };
  
  const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'U', 'R'];
  const creditOptions = [1, 2, 3, 4, 5];
  
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          {semesterId ? 'Edit Semester' : 'Add New Semester'}
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Semester Number
          </label>
          {semesterId ? (
            <div className="text-lg font-medium">Semester {semesterNumber}</div>
          ) : (
            <select
              value={semesterNumber}
              onChange={(e) => setSemesterNumber(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {availableSemesters.map((num) => (
                <option key={num} value={num}>
                  Semester {num}
                </option>
              ))}
            </select>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Subjects and Grades
            </label>
            <button
              type="button"
              onClick={handleAddSubject}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <Plus size={16} className="mr-1" />
              Add Subject
            </button>
          </div>
          
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex space-x-2 items-start">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) =>
                      handleSubjectChange(subject.id, 'name', e.target.value)
                    }
                    placeholder="Subject Name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="w-24">
                  <select
                    value={subject.credits}
                    onChange={(e) =>
                      handleSubjectChange(subject.id, 'credits', Number(e.target.value))
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {creditOptions.map((credit) => (
                      <option key={credit} value={credit}>
                        {credit} {credit === 1 ? 'Credit' : 'Credits'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="w-24">
                  <select
                    value={subject.grade}
                    onChange={(e) =>
                      handleSubjectChange(subject.id, 'grade', e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(subject.id)}
                  className="text-red-600 hover:text-red-800 p-2"
                  disabled={subjects.length <= 1}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <Save size={18} className="mr-1" />
            {semesterId ? 'Update' : 'Save'} Semester
          </button>
        </div>
      </form>
    </div>
  );
};

export default SemesterForm;