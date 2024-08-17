import { render } from 'solid-js/web'
import { Route, Router } from "@solidjs/router";
import { Home } from './pages/Home';
import { Loading } from './pages/Loading';
import { App } from './App'

import './index.css';

render(() => (
    <Router root={App}>
        <Route path="/" component={Home} />
        <Route path="/loadingforfunxdxdx" component={Loading} />
    </Router>
), document.getElementById('root'))
