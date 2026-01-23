
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pageprincipale/Home'; // Créez ces composants
import AdminDashboard from './components/admin/AdminDashboard';
import AdminVehicules from './components/admin/AdminVehicules';
import AdminCommande from './components/admin/AdminCommande';
import Utilisateur from './components/Utilisateur';

// import About from './components/';
// import Contact from './components/Contact';

function App() {
  return (
    <div>
      <nav>



       <nav>
        <div className="nav-container">
          <a href="#home" className="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="#e74c3c" strokeWidth="2" fill="none"/>
              <circle cx="20" cy="20" r="14" stroke="#e74c3c" strokeWidth="1" fill="none" opacity="0.5"/>
              <path d="M10 12 L10 20 M8 12 L8 15 M12 12 L12 15 M8 12 L12 12" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 12 L30 20 M28 12 Q28 14 30 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <ellipse cx="20" cy="26" rx="6" ry="3" fill="#e74c3c" opacity="0.2"/>
              <path d="M14 26 C14 24 16 22 20 22 C24 22 26 24 26 26" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <circle cx="17" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
              <circle cx="20" cy="23" r="1" fill="#e74c3c" opacity="0.6"/>
              <circle cx="23" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
            </svg>
            <span>Miskine Kaltane</span>
          </a>
          <ul className="nav-links">
            {/* <li><a href="#home" className="active">Home</a></li>
            <li><a href="#menu">Services</a></li>
            <li><a href="#contact">Contact</a></li> */}
           <Link to="/admin">Administrateurs</Link>
           <Link to="/vehicule">Vehicules</Link>
           <Link to="/command">Commandes</Link>
          </ul>
          <div className="menu-toggle">
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav> 
        
        {/* <Link to="/">Accueil</Link> |<Link to="/command">Command</Link> | <Link to="/about">Models de coiffures</Link> | <Link to="/contact">Utilisateur</Link> */}
      </nav>
      return 
      <Routes>
      <Route path="/" element={<Utilisateur />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vehicule" element={<AdminVehicules />} />
        <Route path="/command" element={<AdminCommande />} />
      
      </Routes>
    </div>
  );
}

export default App;
