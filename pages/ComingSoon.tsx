import React from 'react';
import { Link } from 'react-router-dom';
import { WaterDropIcon } from '../components/icons/Icons';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
      <WaterDropIcon className="w-16 h-16 text-blue-500 mx-auto" />
      <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
      <p className="mt-4 text-lg text-slate-400">
        This section is under construction. Check back soon for exciting new content!
      </p>
      <Link 
        to="/"
        className="mt-8 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default ComingSoon;