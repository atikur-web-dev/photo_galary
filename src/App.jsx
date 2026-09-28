// import React from 'react';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <PhotoGallery />
      </main>
      <Footer />
    </div>
  );
}

export default App;