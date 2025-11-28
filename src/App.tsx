import { HashRouter } from 'react-router-dom';
import Router from './router';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Router />
        </main>
      </div>
    </HashRouter>
  );
}