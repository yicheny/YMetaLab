import axios from 'axios'
import {useState} from "react";

export default function App() {
    const [text, setText] = useState()
    return (
        <div className="App">
            <button onClick={() => axios.get('/api/test').then(res=>setText(res.data))}>请求</button>
            <span style={{marginLeft:12}}>{text}</span>
        </div>
    );
}
