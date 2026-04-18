import { useState, useCallback } from 'react';
import Hero from './components/Hero';
import SkillsExperience from './components/SkillsExperience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import './index.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SkillsExperience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

export default App;
