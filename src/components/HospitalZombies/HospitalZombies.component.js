import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class HospitalZombies extends Component {
  state = {
    data: null,
    changeLocation: false,
    setZone: null,
    selectedZombie: {
      firstname: null,
      lastname: null
    }
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { zone } = params;
    const capitalizeZone = zone.substring(0, 1).toUpperCase() + zone.substring(1);
    this.setZone(capitalizeZone);
    this.getHospitalZombies()
        .then(res => this.setState({ data: res }))
        .catch(err => console.log(err));
  }

  getHospitalZombies = async () => {
    const response = await fetch('/api/hospitalzombies');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  changeLocation = (firstname, lastname) => {
    this.setState({
      changeLocation: true,
      selectedZombie: {
        firstname,
        lastname
      }
    });
  };

  setZone = (zone) => {
    this.setState({
      setZone: zone
    });
  }

  render() {
    const { data, changeLocation, selectedZombie, setZone } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { zone } = params;
    return (
    <div className="page-content is-center is-60">
        <div className="table-head is-row is-center is-stack-20 is-items-middle">
          <h2 className="is-col is-80">{setZone} Zombies</h2>
          <Link className="button is-small is-col is-20" to={{
            pathname: `/addnew/${zone}`,
            state: {
              zone
            }
          }}>New Zombie</Link>
        </div>
        <div className="table-row is-row is-center">
          <table className="is-bordered is-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>People Infected</th>
                  <th>Severity</th>
                  <th>Change Location</th>
                </tr>
              </thead>
              <tbody>
                  {data && data.map((zombie) => {
                      return (
                        <tr>
                          <td>{zombie.firstname}</td>
                          <td>{zombie.lastname}</td>
                          <td>{zombie.peopleinfected}</td>
                          <td>{zombie.severity}</td>
                          <td>
                            <button className="button" onClick={this.changeLocation.bind(this, zombie.firstname, zombie.lastname)}>Change Location</button>
                          </td>
                        </tr>
                      );
                  })}
              </tbody>
          </table>
          {changeLocation &&
            <div className="is-row is-center">
              <form method="post" action={`/api/changelocation/${selectedZombie.firstname}/${selectedZombie.lastname}/${zone}`}>
                <div className="is-row">
                  <div className="is-col">
                    <h5>Move {selectedZombie.firstname} {selectedZombie.lastname} to: </h5>
                  </div>
                  <div className="is-col form-item">
                    <select name="location">
                      <option>school</option>
                      <option>hospital</option>
                      <option>warehouse</option>
                    </select>
                  </div>
                  <div className="is-col form-item is-buttons">
                    <input type="submit" className="button" value="Set Location" />
                  </div>
                </div>
              </form>
            </div>
          }
        </div>
    </div>
    );
  }
}

export default HospitalZombies;