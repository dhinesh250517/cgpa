import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentRecord, Semester, SubjectGrade } from '../types';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

interface RecordContextType {
    record: StudentRecord | null;
    addSemester: (semesterNumber: number, subjects: SubjectGrade[]) => void;
    updateSemester: (semesterId: string, subjects: SubjectGrade[]) => void;
    deleteSemester: (semesterId: string) => void;
    calculateCGPA: (currentRecord: StudentRecord | null) => number;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const useRecord = () => {
    const context = useContext(RecordContext);
    if (!context) {
        throw new Error('useRecord must be used within a RecordProvider');
    }
    return context;
};

interface RecordProviderProps {
    children: ReactNode;
}

export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
    const { user } = useAuth();
    const [record, setRecord] = useState<StudentRecord | null>(null);

    useEffect(() => {
        if (user) {
            const recordsJson = localStorage.getItem('studentRecords');
            const records: StudentRecord[] = recordsJson ? JSON.parse(recordsJson) : [];
            const userRecord = records.find((r) => r.userId === user.id) || {
                userId: user.id,
                semesters: [],
                cgpa: 0,
            };
            setRecord(userRecord);
            if (!records.some((r) => r.userId === user.id)) {
                localStorage.setItem('studentRecords', JSON.stringify([...records, userRecord]));
            }
        } else {
            setRecord(null);
        }
    }, [user]);

    const saveRecord = (updatedRecord: StudentRecord) => {
        const recordsJson = localStorage.getItem('studentRecords');
        const records: StudentRecord[] = recordsJson ? JSON.parse(recordsJson) : [];
        const updatedRecords = records.map((r) => (r.userId === updatedRecord.userId ? updatedRecord : r));
        localStorage.setItem('studentRecords', JSON.stringify(updatedRecords));
        setRecord(updatedRecord);
    };

    const calculateGPA = (subjects: SubjectGrade[]): number => {
        if (subjects.length === 0) return 0;
        const gradePoints: { [key: string]: number } = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'P': 4, 'U': 0, 'R': 0 };
        let totalCredits = 0;
        let totalGradePoints = 0;
        subjects.forEach((subject) => {
            const points = gradePoints[subject.grade] || 0;
            totalGradePoints += points * subject.credits;
            totalCredits += subject.credits;
        });
        return totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 0;
    };

    const calculateCGPA = (currentRecord: StudentRecord | null): number => {
        if (!currentRecord || currentRecord.semesters.length === 0) return 0;
        const totalGPA = currentRecord.semesters.reduce((sum, semester) => sum + semester.gpa, 0);
        const cgpa = totalGPA / currentRecord.semesters.length;
        return Number(cgpa.toFixed(2));
    };

    const addSemester = (semesterNumber: number, subjects: SubjectGrade[]) => {
        if (!record || !user) return;
        const gpa = calculateGPA(subjects);
        const newSemester: Semester = { id: uuidv4(), number: semesterNumber, subjects, gpa };
        const updatedSemesters = [...record.semesters, newSemester];
        const updatedRecord: StudentRecord = { 
            ...record, 
            semesters: updatedSemesters, 
            cgpa: calculateCGPA({ ...record, semesters: updatedSemesters })
        };
        saveRecord(updatedRecord);
    };

    const updateSemester = (semesterId: string, subjects: SubjectGrade[]) => {
        if (!record || !user) return;
        const semesterIndex = record.semesters.findIndex((s) => s.id === semesterId);
        if (semesterIndex === -1) return;
        const gpa = calculateGPA(subjects);
        const updatedSemester: Semester = { ...record.semesters[semesterIndex], subjects, gpa };
        const updatedSemesters = [...record.semesters];
        updatedSemesters[semesterIndex] = updatedSemester;
        const updatedRecord: StudentRecord = { 
            ...record, 
            semesters: updatedSemesters, 
            cgpa: calculateCGPA({ ...record, semesters: updatedSemesters })
        };
        saveRecord(updatedRecord);
    };

    const deleteSemester = (semesterId: string) => {
        if (!record || !user) return;
        const updatedSemesters = record.semesters.filter((s) => s.id !== semesterId);
        const updatedRecord: StudentRecord = { 
            ...record, 
            semesters: updatedSemesters, 
            cgpa: calculateCGPA({ ...record, semesters: updatedSemesters })
        };
        saveRecord(updatedRecord);
    };

    return (
        <RecordContext.Provider
            value={{
                record,
                addSemester,
                updateSemester,
                deleteSemester,
                calculateCGPA,
            }}
        >
            {children}
        </RecordContext.Provider>
    );
};