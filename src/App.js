import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import AddNewZombie from './components/AddNewZombie/AddNewZombie.component';
import SchoolZombies from './components/SchoolZombies/SchoolZombies.component';
import HospitalZombies from './components/HospitalZombies/HospitalZombies.component';
import WarehouseZombies from './components/WarehouseZombies/WarehouseZombies.component';
import './App.css';

const Welcome = () => {
  return (
    <div className="page-content is-center">
      <h2 className="is-text-center">Welcome to the Zombie Manager App!</h2>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="page is-container">
          <div className="page-sidebar navbar">
              <ul>
                  <li>
                      <Link to="/" className="link">Home</Link>
                  </li>
                  <li>
                      <Link to="/school" className="link">School</Link>
                  </li>
                  <li>
                      <Link to="/hospital" className="link">Hospital</Link>
                  </li>
                  <li>
                      <Link to="/warehouse" className="link">Warehouse</Link>
                  </li>
              </ul>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/:zone" render={(props) => {
            const { match } = props;
            const { params } = match;
            const { zone } = params;
            if (zone === 'school') {
              return <SchoolZombies {...props} />
            }
            if (zone === 'hospital') {
              return <HospitalZombies {...props} />
            }
            if (zone === 'warehouse') {
              return <WarehouseZombies {...props} />
            }
          }} />
          <Route path="/addnew/:zone" render={(props) => {
            return <AddNewZombie {...props} />
          }} />
        </Switch>
      </Router>
    );
  }
}

export default App;
