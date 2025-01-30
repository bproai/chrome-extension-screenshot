import React from 'react';
import { createRoot } from 'react-dom/client';
import Whiteboard from '../components/Whiteboard';

// Initialize React app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Whiteboard />
  </React.StrictMode>
);