import React, { useState, useRef, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  
  // State to track window size for the confetti
  const [windowDimension, setWindowDimension] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  const contentRef = useRef(null);

  // Update confetti size if user resizes window
  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, []);

  const noPhrases = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Last chance!",
    "Don't be a Traitor!",
    "I have a shield!",
    "I'm voting for you...",
    "I'm crying now :("
  ];

  const handleBroochClick = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getNoButtonText = () => {
    return noPhrases[Math.min(noCount, noPhrases.length - 1)];
  };

  return (
    <div className="mobile-container">
      {yesPressed && (
        <Confetti 
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={true} 
          numberOfPieces={500} 
          gravity={0.3} // Makes them fall a bit faster like fireworks
          colors={['#d4af37', '#ffffff', '#004d40', '#ff0000']} 
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }} 
        />
      )}

      {/* --- Screen 1: The Trap --- */}
      <div className="screen-locked">
        <h2 className="warning-text">WARNING: DO NOT TOUCH ME!</h2>
        <div className="brooch-container" onClick={handleBroochClick}>
          <img src="/brooch.png" alt="Poisonous Brooch" className="brooch-img" />
        </div>
      </div>

      {/* --- Screen 2: The Proposal --- */}
      <div 
        ref={contentRef} 
        className={`screen-content ${isUnlocked ? 'visible' : ''}`}
      >
        {yesPressed ? (
          <div className="success-message">
            <h1 className="yay-text">YAY!</h1>
            <p style={{color: '#fff', marginTop: '20px'}}>See you at the roundtable ❤️</p>
          </div>
        ) : (
          <>
            <div className="murder-text">
              <p><strong>OH NO!</strong></p>
              <p>You have been murdered by the poisonous brooch.</p>
              <p>You have been murdered by <strong>Traitor Wendolee!</strong></p> 
              <p>If you wish to continue being a faithful, you have to answer one question...</p>
            </div>

            <h1 className="valentine-question">Will you be my Valentine?</h1>

            <div className="button-container">
              <button
                className="btn btn-yes"
                style={{ fontSize: `${noCount * 20 + 16}px` }} 
                onClick={() => setYesPressed(true)}
              >
                YES
              </button>

              <button
                className="btn btn-no"
                onClick={() => setNoCount(noCount + 1)}
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;