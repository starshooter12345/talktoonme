import { useGLTF } from "@react-three/drei";
import { useState } from "react";

// Emoji icons
import maleEmoji from '../assets/male-face-emoji.png';
import femaleEmoji from '../assets/female.png';

// Avatar image placeholders
import avatar1Image from '../assets/Avatar 1 placeholder.png';
import avatar2Image from '../assets/Avatar 2 placeholder.png';

export function AvatarSelector({ onSelect }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Load avatar models
  const avatar1 = useGLTF("/models/6813913d3117d5905d5974dd.glb");
  const avatar2 = useGLTF("/models/67f0f1cd9efcb656d7e370e4.glb");

  const avatars = [
    { name: "Avatar 1", model: avatar1, emoji: maleEmoji, image: avatar1Image },
    { name: "Avatar 2", model: avatar2, emoji: femaleEmoji, image: avatar2Image }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
      color: 'white'
    }}>
      <h1>Select Your Avatar</h1>
      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '20px'
      }}>
        {avatars.map((avatar, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              border: selectedAvatar === index ? '2px solid white' : '2px solid gray',
              borderRadius: '10px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onClick={() => setSelectedAvatar(index)}
          >
            {/* Label with emoji */}
            <p style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '10px',
              fontSize: '16px'
            }}>
              {avatar.name}
              <img src={avatar.emoji} alt="emoji" style={{ width: '20px', height: '20px' }} />
            </p>

            {/* Avatar image */}
            <img
              src={avatar.image}
              alt={avatar.name}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '5px',
                backgroundColor: '#333'
              }}
            />
          </div>
        ))}
      </div>
      <button
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: selectedAvatar !== null ? '#4CAF50' : '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: selectedAvatar !== null ? 'pointer' : 'not-allowed'
        }}
        disabled={selectedAvatar === null}
        onClick={() => onSelect(avatars[selectedAvatar].model)}
      >
        Continue
      </button>
    </div>
  );
}
