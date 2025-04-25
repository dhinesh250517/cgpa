import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { GraduationCap, Calculator, Clock, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About This Project</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Learn more about the Saveetha GPA & CGPA Tracker and the motivation behind it.
            </p>
          </div>
        </section>
        
        {/* About Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Project Overview</h2>
              <p className="text-gray-700 mb-6">
                This website was developed by an ECE student from Saveetha Engineering College (Batch: 2023–2027) for educational and academic use. The Saveetha GPA & CGPA Tracker is designed to help students easily calculate their semester GPA and track their overall CGPA throughout their academic journey.
              </p>
              <p className="text-gray-700 mb-6">
                As students ourselves, we understand the importance of keeping track of academic performance. This tool simplifies the process of calculating GPA and CGPA, allowing students to focus more on their studies rather than the complexity of grade calculations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Calculator className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">How It Works</h3>
                </div>
                <p className="text-gray-700">
                  Our system uses the standard Saveetha Engineering College grading system to calculate GPA. Students can input their subjects, credits, and grades for each semester, and the system automatically calculates the GPA and updates the overall CGPA.
                </p>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="font-semibold mb-2">Grading Scale:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>O (Outstanding) - 10 points</li>
                    <li>A+ (Excellent) - 9 points</li>
                    <li>A (Very Good) - 8 points</li>
                    <li>B+ (Good) - 7 points</li>
                    <li>B (Average) - 6 points</li>
                    <li>C (Satisfactory) - 5 points</li>
                    <li>P (Pass) - 4 points</li>
                    <li>U (Failed) - 0 points</li>
                    <li>R (Reappear) - 0 points</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Users className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">For Students</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  This tool is designed specifically for Saveetha Engineering College students to:
                </p>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li>Track academic performance across all semesters</li>
                  <li>Calculate semester GPA accurately</li>
                  <li>Monitor overall CGPA progress</li>
                  <li>Securely store academic records</li>
                  <li>Generate downloadable reports for personal records</li>
                </ul>
                <div className="mt-6">
                  <Link 
                    to="/signup" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors inline-block"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
              <div className="flex items-center mb-4">
                <Clock className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Future Enhancements</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We're continuously working to improve this platform. Some planned features include:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-5">
                <li>Grade prediction and goal setting</li>
                <li>Academic performance analytics and trends</li>
                <li>Improved data visualization</li>
                <li>Mobile app for on-the-go access</li>
                <li>Integration with college notification systems</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;