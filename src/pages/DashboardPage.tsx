import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRecord } from '../context/RecordContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CGPACard from '../components/dashboard/CGPACard';
import SemestersList from '../components/dashboard/SemestersList';
import { UserCircle, GraduationCap } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { record } = useRecord();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <UserCircle size={48} className="mr-4" />
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-blue-100">{user?.department}</p>
              </div>
            </div>
            <div className="flex items-center">
              <GraduationCap size={24} className="mr-2" />
              <span className="text-lg">{user?.registerNumber}</span>
            </div>
          </div>
        </div>
        
        {/* CGPA Overview */}
        <CGPACard />
        
        {/* Semesters List */}
        <SemestersList />
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;