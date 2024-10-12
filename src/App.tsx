import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DivinationForm from './components/DivinationForm';
import DatabaseManagement from './components/DatabaseManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<DivinationForm />} />
            <Route path="/database" element={<DatabaseManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;