import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorAura from "./components/CursorAura";


// Pages
import Main from './pages/Main'
import App1Page from './pages/App1Page'
import App2Page from './pages/App2Page'

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
            <Route path="/app1" element={<App1Page />} />
            <Route path="/app2" element={<App2Page />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
