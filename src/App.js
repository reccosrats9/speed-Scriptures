import React, { Component } from 'react';
import './reset.css'
import './App.css';
import Structure from './Components/Structure'
import StructureDC from './Components/StructureDC'
import OT from './Resources/old-testament.json'
import NT from './Resources/new-testament.json'
import BOM from './Resources/book-of-mormon.json'
import DC from './Resources/doctrine-and-covenants.json'
import POGP from './Resources/pearl-of-great-price.json'

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedBook: '',
      speedInMS: 120
  }  
  }

  selectBook = (e)=>{
    this.setState({selectedBook: e.target.name})
  }

  setSpeed = (e) => {
    let speedInMS = 60000 / e.target.value
    this.setState({speedInMS})
  }

  render() {
    const { selectedBook, speedInMS } = this.state
    // console.log(selectedBook)
    let chosen = ''
    switch (selectedBook) {
      case 'OT':chosen = OT
        break;
      case 'NT':chosen = NT
        break;
      case 'BOM':chosen = BOM
        break;
      case 'DC':chosen = DC
        break;  
      case 'POGP':chosen = POGP
        break
      default: chosen = ''  
    }
    // console.log(chosen)

    return (
      <div className="App">
        <h1>Scripture Speed Reader</h1>
        <div className={selectedBook ? 'scriptureLinksMini' : 'scriptureLinks'} >
          <button name='OT' onClick={this.selectBook} >{selectedBook ? ' OT ':'Old Testament'}</button>
          <button name='NT' onClick={this.selectBook} >{selectedBook ? ' NT ':'New Testament'}</button>
          <button name='BOM' onClick={this.selectBook} >{selectedBook ? ' BOM ':'Book of Mormon'}</button>
          <button name='DC' onClick={this.selectBook} >{selectedBook ? ' DC ' : 'Doctrine and Covenants'}</button>
          <button name='POGP' onClick={this.selectBook} >{selectedBook ? ' POGP' : 'Pearl of Great Price'}</button>
          <select onChange={this.setSpeed} defaultValue='500' >
            <option value="200">200 wpm</option>
            <option value="300">300 wpm</option>
            <option value="400">400 wpm</option>
            <option value="450">450 wpm</option>
            <option value="500">500 wpm</option>
            <option value="550">550 wpm</option>
            <option value="600">600 wpm</option>
            <option value="650">650 wpm</option>
            <option value="700">700 wpm</option>
          </select>
        </div>
        {this.state.selectedBook !== 'DC' ?
          <Structure selectedBook={chosen}  speed={speedInMS}/> :
          <StructureDC selectedBook={chosen} speed={speedInMS}/>}
  
      </div>
    );
  }
}

export default App;
