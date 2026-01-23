import React from "react";

export default function Navbar() {
  return (
    <nav>
    <div class="nav-container">
        <a href="#home" class="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
               
                <circle cx="20" cy="20" r="18" stroke="#e74c3c" stroke-width="2" fill="none"/>
                <circle cx="20" cy="20" r="14" stroke="#e74c3c" stroke-width="1" fill="none" opacity="0.5"/>
                
               
                <path d="M10 12 L10 20 M8 12 L8 15 M12 12 L12 15 M8 12 L12 12" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                
                <path d="M30 12 L30 20 M28 12 Q28 14 30 14" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                
               
                <ellipse cx="20" cy="26" rx="6" ry="3" fill="#e74c3c" opacity="0.2"/>
                <path d="M14 26 C14 24 16 22 20 22 C24 22 26 24 26 26" stroke="#e74c3c" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <circle cx="17" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
                <circle cx="20" cy="23" r="1" fill="#e74c3c" opacity="0.6"/>
                <circle cx="23" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
            </svg>
            <span>Miskine</span>
        </a>
        <ul class="nav-links">
            <li><a href="#home" class="active">Home</a></li>
            <li><a href="/to">Menu</a></li>
            <Link to="/admin">Admin Dashboard</Link>
            <li><a href="#reservation">Reservations</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>

  );
}
