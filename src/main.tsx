import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";  // Renombrado de .jsx a .tsx

// Importación de estilos CSS
import "./assets/css/animate.min.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/progressBar.min.css";
import "./assets/css/color/color1.css";
import "./index.css";
import "swiper/css";
import "../node_modules/aos/dist/aos.css";
import "../node_modules/react-modal-video/css/modal-video.css";
import "yet-another-react-lightbox/styles.css";

// Montaje de la aplicación en el DOM
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
