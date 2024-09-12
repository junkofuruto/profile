import { render } from 'solid-js/web'
import { Route, Router } from "@solidjs/router";
import { Greetings, Project, Projects, NotFound, Label, Contact } from './pages';
import { App } from './App'

import './index.css';

render(() => (
    <Router root={App}>
        <Route path="/" component={Greetings} />
        <Route path="/projects/" component={Projects} />
        <Route path="/projects/:name" component={Project} />
        <Route path="/label" component={Label} />
        <Route path="/contact" component={Contact} />
        <Route path="*" component={NotFound} />
    </Router>
), document.getElementById('root')!)
