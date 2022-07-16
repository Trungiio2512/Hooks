import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function emitComments (id) {
  setInterval(function () {
    window.dispatchEvent(
      new CustomEvent(`lesson-${id}`,{
        detail: `Đây là comments lesson ${id} `
    }))
  },2000)
}

emitComments(1)
emitComments(2)
emitComments(3)

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
