'use client';

import React, { useEffect } from 'react';

const PEN_CURSOR_CLASS = 'cursor-pen';
// const LIGHTBULB_CURSOR_CLASS = 'cursor-lightbulb'; // Temporarily unused
// const CURSOR_CLASSES = ['cursor-pen', 'cursor-lightbulb'];
// const CURSOR_INTERVAL = 1000; // Switch cursor every 1 second (1000ms)

export default function CustomCursorManager() {
  // const [currentCursorIndex, setCurrentCursorIndex] = useState(0);

  useEffect(() => {
    // Directly apply the pen cursor class
    document.body.classList.add(PEN_CURSOR_CLASS);
    console.log('Applied cursor-pen class to body'); // For debugging

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove(PEN_CURSOR_CLASS);
      console.log('Removed cursor-pen class from body'); // For debugging
    };
  }, []); // Empty dependency array, so this runs only on mount and unmount

  return null; // This component does not render anything visible
} 