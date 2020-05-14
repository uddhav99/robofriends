import React , { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { connect } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField, 
        robots: state.requestRobots.robots, 
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)), 
        onRequestRobots: () => dispatch(requestRobots())
    };
}


class App extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: []
    //     }
    // }

    componentDidMount() {
        this.props.onRequestRobots();
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(users=> {
        //         this.setState({ robots: users })
        //     })
    }

    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })
    // }

    render () {
  
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        }) 
        if (isPending) {
            return <h1>Loading....</h1>
        }
        return (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots = {filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// first constructor -> render > component did mount (sets state) -> since it updates state then again render