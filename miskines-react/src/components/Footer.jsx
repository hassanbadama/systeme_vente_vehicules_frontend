import React from "react";

export default function Footer() {
  return (
    <footer id="contact">
    <div className="footer-content">
        <div className="footer-section">
            <h3>À propos de nous</h3>
            <p>
                Salon Elegance est votre destination pour des coiffures modernes et des soins capillaires personnalisés.
                Nous mettons l’accent sur la qualité, le style et le bien-être de chaque client.
            </p>
        </div>
        <div className="footer-section">
            <h3>Contactez-nous</h3>
            <p>📍 123 Rue de la Beauté, Yaounde, Cameroun</p>
            <p>📞 +237 658 87 49 12</p>
            <p>✉️ contact@salonelegance.cm</p>
        </div>
        <div className="footer-section">
            <h3>Restez connectés</h3>
            <p>
                Suivez-nous sur nos réseaux sociaux pour découvrir nos dernières créations, promotions et événements !
            </p>
            <p>
                <a href="#" style={{ color: "#fff", margin: "0 5px" }}>Facebook</a> |
                <a href="#" style={{ color: "#fff", margin: "0 5px" }}>Instagram</a> |
                <a href="#" style={{ color: "#fff", margin: "0 5px" }}>TikTok</a>
            </p>
        </div>
    </div>
    <div>
        <p>&copy; 2026 Bistro Elegance. All rights reserved.</p>
        <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms & Conditions</a>
            <span>|</span>
            <a href="#">Sitemap</a>
            <span>|</span>
            <a href="#">Designed by Tooplate</a>
        </div>
    </div>
</footer>

  
  );
}
