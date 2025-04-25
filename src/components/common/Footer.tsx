import React from 'react';
import { GraduationCap as Graduation } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Graduation size={24} className="text-orange-500" />
              <h3 className="text-xl font-bold">SEC GPA Tracker</h3>
            </div>
            <p className="text-gray-400">
              An academic tool developed by an ECE student from Saveetha Engineering College (Batch: 2023–2027) for educational and academic use.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li className="hover:text-orange-300 transition-colors">
                <a href="/">Home</a>
              </li>
              <li className="hover:text-orange-300 transition-colors">
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="hover:text-orange-300 transition-colors">
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SEC GPA Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;