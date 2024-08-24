import { render } from 'solid-js/web'
import { Route, Router } from "@solidjs/router";
import { Greetings } from './pages/Greetings';
import { About } from './pages/About';
import { Loading } from './pages/Loading';
import { App } from './App'

import './index.css';

render(() => (
    <Router root={App}>
        <Route path="/" component={About} />
        <Route path="/loadingforfunxdxdx" component={Loading} />
    </Router>
), document.getElementById('root'))
