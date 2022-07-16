import UseStateComponent from "./Hooks/useState.js";
import UseEffectComponent from "./Hooks/useEffect.js";

import {useState} from 'react';
import UseRef from "./Hooks/useRef_useLayoutEffect.js";


function App() {
    const [state, setState] = useState(false)
    return (
        <div style = {{ padding : 50}}>
            <UseStateComponent />
            <button onClick = {() => setState(!state)}> Toggle</button>
            {state && <UseRef/>}
        </div>
    )
}

export default App;
