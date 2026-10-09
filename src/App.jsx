import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Playground from './components/Playground';
import DetailsSection from './components/DetailsSection';
import FinalCTA from './components/FinalCTA';
import YesScreen from './components/YesScreen';
import './App.css';

export default function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {accepted && <YesScreen key="yes-screen" />}
      </AnimatePresence>
      <main>
        <Hero />
        <Experience />
        <Playground onAccept={() => setAccepted(true)} />
        <DetailsSection />
        <FinalCTA />
      </main>
    </>
  );
}
