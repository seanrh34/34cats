import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorAura from "./components/CursorAura";


// Pages
import Main from './pages/Main'
import Resume from './pages/Resume'

import ScrollToHash from './components/ScrollToHash';

function App() {
  return (
    <Router>
      <CursorAura />
      <ScrollToHash />
      <div className="min-h-screen bg-background text-text font-body">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
