import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap as Graduation, Calculator, BarChart, Shield } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Graduation size={64} className="text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Saveetha GPA & CGPA Tracker
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Easily calculate, track and monitor your academic performance across all semesters
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <Calculator size={40} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Easy GPA Calculation</h3>
                <p className="text-gray-600 text-center">
                  Calculate your semester GPA with just a few clicks. Input your subjects, credits, and grades.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <BarChart size={40} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">CGPA Tracking</h3>
                <p className="text-gray-600 text-center">
                  Automatically track your cumulative GPA across all semesters with visual representations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <Shield size={40} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Secure Data Storage</h3>
                <p className="text-gray-600 text-center">
                  Your academic data is securely stored and accessible anytime from any device.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Track Your Academic Progress?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join fellow Saveetha Engineering College students who are already using our platform to track their academic journey.
            </p>
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 inline-block"
            >
              Create Your Account
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;