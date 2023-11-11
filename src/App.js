import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

import api from './services/api';
import './style.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum CEP!")
      return;
    }

    try {
      const response = await api.get(`${input}/json/`);

      if (response.data.erro === true) {
        alert("Preencha um CEP válido!");
        setInput("");
        return;
      }
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops erro ao buscar CEP!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>

      <div className='containerInput'>
        <input
          type='text'
          placeholder="Digite seu cep..."
          value={input}
          onChange={(evento) => setInput(evento.target.value)}
        />

        <button className="buttonSearch"
          onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 && (
            <span>Complemento: {cep.complemento}</span>
          )}
          {Object.keys(cep.bairro).length > 0 && (
          <span>{cep.bairro}</span>
          )}
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}


    </div>
  );
}

export default App;
