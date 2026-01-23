import React from "react";

export default function Hero() {
  return (
    <section id="home" class="hero">
        <div class="diagonal-grid"></div>
        <div class="static-decoration"></div>
        <div class="bottom-right-decoration"></div>
        <div class="hero-content">
            <h1>Welcome to Bistro Elegance</h1>
            <p>
                <span class="text-option">Experience culinary excellence in an atmosphere of refined sophistication</span>
                <span class="text-option">Discover exquisite flavors crafted with passion and precision</span>
                <span class="text-option">Where fine dining meets unforgettable moments</span>
            </p> 
            <a href="#reservation" class="cta-btn">Reserve Your Table</a>
        </div>
    </section>
  );
}
