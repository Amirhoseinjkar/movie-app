import { useEffect, useState } from 'react';
import './homehero.css';

function HomeHero() {
    const [activeCharacter, setActiveCharacter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCharacter((prev) => (prev + 1) % 4);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const characters = [
        {
            name: 'Thor',
            category: 'Marvel · God of Thunder',
            tagline: 'The storm arrives with him.',
        },
          {
            name: 'Batman',
            category: 'DC · The Dark Knight',
            tagline: 'In the darkness, there is always a symbol.',
        },
        {
            name: 'Spider-Man',
            category: 'Marvel · The Web-Slinger',
            tagline: 'With great power comes great responsibility.',
        },
      
         {
            name: 'Hulk',
            category: 'Marvel · The Incredible Hulk',
            tagline: 'The stronger the rage, the stronger he becomes.',
        },
        
        
        
        
       
    ];

    const character = characters[activeCharacter];

    return (
        <div className="container">

            <div
                className={`background spiderman-bg ${
                    activeCharacter === 2 ? 'active' : ''
                }`}
            />

            <div
                className={`background batman-bg ${
                    activeCharacter === 1 ? 'active' : ''
                }`}
            />

            <div
                className={`background thor-bg ${
                    activeCharacter === 0 ? 'active' : ''
                }`}
            />

            <div
                className={`background halk-bg ${
                    activeCharacter === 3 ? 'active' : ''
                }`}
            />

            <div className="circle">
                <div className="spiderman" />
                <div className="batman" />
                <div className="halk" />
                <div className="thor" />
            </div>

            <div
                className="character-info"
                key={character.name}
            >
                <span className="character-number">
                    0{activeCharacter + 1} / 04
                </span>

                <h1 className="character-name">
                    {character.name}
                </h1>

                <p className="character-tagline">
                    {character.category}
                    <br />
                    {character.tagline}
                </p>
            </div>

        </div>
    );
}

export default HomeHero;