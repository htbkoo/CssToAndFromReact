import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';

ReactDOM.render(<App/>, document.getElementById('main'), () => {
    var loader = document.getElementById('loader');
    loader && (loader.style.display = "none");
});
