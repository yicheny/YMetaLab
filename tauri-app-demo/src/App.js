// import logo from './logo.svg';
import './App.css';
import { invoke } from '@tauri-apps/api/tauri';
import {useState} from 'react'

function App() {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');

    const greet = async () => {
        try {
            const response = await invoke('greet', { name });
            setGreeting(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*</header>*/}

        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <button onClick={greet}>Greet</button>
            <p>{greeting}</p>
        </div>
    </div>
  );
}

export default App;
