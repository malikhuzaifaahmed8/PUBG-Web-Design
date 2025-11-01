import React from 'react';
 

import NavBar from './components/Navbar';
import Hero from './components/Hero';

import UpdatesSection from './components/UpdatesSection';

import RankingSection from './components/RankingSection';

import About from './components/About';
import FloatingImage from './components/FloatingImage';
import Contact from './components/Contact';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
 
      <UpdatesSection />
           <RankingSection />
      <About />
          <FloatingImage />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;