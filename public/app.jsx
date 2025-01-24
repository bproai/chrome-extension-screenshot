import React from 'react';
import { createRoot } from 'react-dom/client';
import TranscriptionViewer from '../components/TranscriptionViewer';

// Initialize React app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TranscriptionViewer />
  </React.StrictMode>
);