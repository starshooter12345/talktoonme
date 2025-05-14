import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useState } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { AvatarSelector } from "./components/AvatarSelector";
import { Header } from "./components/Header";
import React from "react";
import LandingPage from "./components/LandingPage"; // Import LandingPage component

function App() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showLeva, setShowLeva] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true); // State for LandingPage visibility

  const handleSelectAvatar = (avatarModel) => {
    setSelectedAvatar(avatarModel);
    setShowAvatarSelector(false);
  };

  const handleToggleLeva = () => {
    setShowLeva(!showLeva);
  };

  const handleStartSurvey = () => {
    setShowLandingPage(false); // Hide the LandingPage when the survey starts
  };

  return (
    <>
      {showLandingPage ? (
        <LandingPage onStartSurvey={handleStartSurvey} /> // Render LandingPage first
      ) : (
        <>
          <Loader />
          <Leva hidden={!showLeva} />
          
          <Header
            onSelectAvatar={() => setShowAvatarSelector(true)}
            showLeva={showLeva}
            onToggleLeva={handleToggleLeva}
          />

          <Suspense fallback={<div>Loading avatars...</div>}>
            {(!selectedAvatar || showAvatarSelector) && (
              <AvatarSelector onSelect={handleSelectAvatar} />
            )}
          </Suspense>

          {selectedAvatar && !showAvatarSelector && (
            <>
              <UI />
              <Canvas
                shadows
                camera={{ position: [0, 0, 2], fov: 25 }}
                style={{
                  position: "fixed",
                  top: "60px",
                  height: "50vh",
                  width: "100%",
                }}
              >
                <Experience avatarModel={selectedAvatar} />
              </Canvas>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
