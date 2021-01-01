import React, {Component} from 'react';
import {CardList} from './components/card-list/card-list.component.jsx';
import {SearchBox} from './components/search-box/search-box.component';
import {connect} from "react-redux";
import {requestMonsters, setSearchField} from "./redux/actions";
import './App.css';


const mapStateToProps = (state) => {
  return {
    searchField: state.searchMonsters.searchField,
    isPending: state.requestMonsters.isPending,
    monsters: state.requestMonsters.monsters,
    error: state.requestMonsters.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestMonsters: () => dispatch(requestMonsters())
  }
};


class App extends Component {
  componentDidMount() {
    this.props.onRequestMonsters();
  }

  render() {
    const {searchField, onSearchChange , monsters, isPending} = this.props;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending ?
      <h1 className='loading-status'>Loading</h1> :
      (
        <div className="App">
          <h1>Monsters Rolodex</h1>
          <SearchBox placeholder='search monster'
                     handleChange={onSearchChange}
          />

          <CardList monsters={filteredMonsters}/>
        </div>
      );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
