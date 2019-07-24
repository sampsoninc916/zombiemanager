import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddNewZombie extends Component {
    state = {
        data: null,
        rows: ['row 1'],
        setZone: null,
        capitalizeZone: null
      };
      
    componentDidMount() {
        const { location } = this.props;
        const { state } = location;
        const { zone } = state;
        const capitalizeZone = zone.substring(0, 1).toUpperCase() + zone.substring(1);
        this.setState({
            setZone: zone,
            capitalizeZone
        });
    }

    addNewRow = () => {
        let rows = this.state.rows;
        rows.push('new row');
        this.setState({ rows });
    }

    render() {
        const { data, rows, setZone, capitalizeZone } = this.state;
        return (
            <div className="page-content is-center is-80 is-inset-20">
                <div className="is-80 is-center is-border is-border-radius is-inset-12 dark-grey__border">
                    <h3 className="dark-blue">Add New Zombie</h3>
                    <form method="post" action={`/api/newzombie/${setZone}`}>
                        <table className="is-bordered is-striped">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>People Infected</th>
                                    <th>Severity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows && rows.map((row) => {
                                    return (
                                        <tr>
                                            <td>
                                                <input type="text" name="firstname" placeholder="First Name"></input>
                                            </td>
                                            <td>
                                                <input type="text" name="lastname" placeholder="Last Name"></input>
                                            </td>
                                            <td>
                                                <input type="number" name="peopleinfected" placeholder="People Infected"></input>
                                            </td>
                                            <td>
                                                <input type="text" name="severity" placeholder="Severity"></input>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="is-row">
                            <div className="is-col is-20">
                                <a className="button" onClick={this.addNewRow}>Add New Row</a>
                            </div>
                            <div className="is-col is-80">
                                <div className="form-item is-buttons">
                                    <input type="submit" className="button" value={`Add New ${capitalizeZone} Zombie`}></input>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AddNewZombie.propTypes = {
    match: PropTypes.object
};

export default AddNewZombie;