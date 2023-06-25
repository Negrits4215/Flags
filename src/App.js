import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [flags, setFlags] = useState([]);
  const [randomFlag, setRandomFlag] = useState(null)
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0)

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then(response => {
        setFlags(response.data.data);
        console.log(flags)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const selectRandomFlag = () => {
    const randomIndex = Math.floor(Math.random() * flags.length);
    const selectedFlag = flags[randomIndex];
    setRandomFlag(selectedFlag);
  };

   const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (randomFlag && inputValue.toUpperCase() === randomFlag.name.toUpperCase()) {
        setScore(score + 10);
        setRandomFlag(null)
        selectRandomFlag()
        setInputValue('')
        console.clear()
      } else {
        setScore(score-1);
        setInputValue('')
        console.clear()
      }
    }
  };
  const verificar = () => {
      if (randomFlag && inputValue.toUpperCase() === randomFlag.name.toUpperCase()) {
        setScore(score + 10);
        setRandomFlag(null)
        selectRandomFlag()
        setInputValue('')
        console.clear()
      } else {
        setScore(score-1);
        setInputValue('')
        console.clear()
      }
  };

  const finalizar = () =>{
    setRandomFlag(null)
    setInputValue('')
    console.clear()
  }

  return (
    <div>
      <h1>Puntuacion: {score}</h1>
      <button onClick={selectRandomFlag} disabled={randomFlag !== null}>Comenzer juego</button>
      {randomFlag && (
        <div>
          <h2>Bandera seleccionada:</h2>
          {console.log(randomFlag.name)}
          <img src={randomFlag.flag} alt="Bandera" />
        </div>
      )}
        <div>
         <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe el nombre de la bandera y presiona Enter"
          />
          <button onClick={verificar} disabled={randomFlag === null}>Verificar Respuesta</button>
        </div>
      <button onClick={finalizar} disabled={randomFlag === null}>Finalizar Juego</button>
    </div>
  );
}

export default App;
