import Index from "./pages/Index";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./app.css";

const App = () => {
  return (
    <Index />
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
