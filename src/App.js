import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import openMicImage from './Open-Mic.png';
import './App.css';

// Safe vertical zones (percent of .App height)
const TOP_ZONE_MAX = 20;    // top safe zone: 0%–20%
const BOTTOM_ZONE_MIN = 80; // bottom safe zone: 80%–100%

// Returns a random top position (in percent) within the designated safe zone.
const getRandomTop = (band) => {
  if (band === 'top') {
    // Returns a value between 0 and TOP_ZONE_MAX.
    return Math.random() * TOP_ZONE_MAX;
  } else if (band === 'bottom') {
    // Returns a value between BOTTOM_ZONE_MIN and 100.
    return Math.random() * (100 - BOTTOM_ZONE_MIN) + BOTTOM_ZONE_MIN;
  }
  return 0;
};

// Returns a random left offset (in pixels) for left-side stars.
const getRandomLeft = () => {
  const min = 20; // minimum left offset in px
  const max = 60; // maximum left offset in px
  return Math.random() * (max - min) + min;
};

// Returns a random right offset (in pixels) for right-side stars.
const getRandomRight = () => {
  const min = 5;  // minimum right offset in px
  const max = 30; // maximum right offset in px
  return Math.random() * (max - min) + min;
};

// Instead of randomizing on load (which can scatter stars),
// we start with evenly spaced stars in the middle of the viewport.
const initialLeftStars = [
  { band: 'top', top: 55, left: 40 },
  { band: 'top', top: 65, left: 40 },
  { band: 'top', top: 45, left: 40 },
];

const initialRightStars = [
  { band: 'top', top: 55, right: 10 },
  { band: 'top', top: 65, right: 10 },
  { band: 'top', top: 45, right: 10 },
];

function App() {
  const [leftStars, setLeftStars] = useState(initialLeftStars);
  const [rightStars, setRightStars] = useState(initialRightStars);

  // When a star is clicked, update its vertical and horizontal position (within the safe zones).
  const updateStarPosition = (stars, setStars, index) => {
    setStars(prevStars => {
      const newStars = [...prevStars];
      const star = newStars[index];
      newStars[index] = {
        ...star,
        top: star.band === 'top' ? getRandomTop('top') : getRandomTop('bottom'),
        ...(star.left !== undefined
          ? { left: getRandomLeft() }
          : { right: getRandomRight() }),
      };
      return newStars;
    });
  };

  return (
    <div className="App">
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "Weekly Open Mic Comedy",
              "startDate": "2025-03-07T21:30:00-06:00",
              "doorTime": "2025-03-07T21:00:00-06:00",
              "description": "Join us every Tuesday at Otaku Lounge for open mic stand-up comedy featuring bar service, anime, gaming, nerd culture, and a vibrant social atmosphere in Kansas City.",
              "image": "https://raw.githubusercontent.com/Zeakurbeaver/UpcomingShow/main/assets/images/Open-mic.png",
              "location": {
                "@type": "Place",
                "name": "Otaku Lounge",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "640 E 18th St",
                  "addressLocality": "Kansas City",
                  "addressRegion": "MO",
                  "postalCode": "64108",
                  "addressCountry": "US"
                }
              },
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "keywords": "open mic, comedy, stand-up, bar, anime, gaming, nerd culture, social event",
              "organizer": {
                "@type": "Organization",
                "name": "Otaku Lounge",
                "url": "https://www.otakulounge.com"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Main content container (centered in the middle of the viewport) */}
      <div className="content-wrapper">
        <header className="App-header">
          <h1>Upcoming Shows</h1>
        </header>
        
        <main className="App-body">
          <img src={openMicImage} alt="Open Mic" className="open-mic-img" />
        </main>
        
        <footer className="App-footer">
          <p>&copy; 2025 Rolling SKies Media. All rights reserved.</p>
        </footer>
      </div>

      {/* Left side stars */}
      {leftStars.map((star, index) => (
        <span
          key={`left-star-${index}`}
          className="star left"
          style={{ top: `${star.top}%`, left: `${star.left}px` }}
          onClick={() => updateStarPosition(leftStars, setLeftStars, index)}
        >
          ⭐
        </span>
      ))}

      {/* Right side stars */}
      {rightStars.map((star, index) => (
        <span
          key={`right-star-${index}`}
          className="star right"
          style={{ top: `${star.top}%`, right: `${star.right}px` }}
          onClick={() => updateStarPosition(rightStars, setRightStars, index)}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

export default App;
