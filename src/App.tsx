import React from 'react';
import './App.css';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Row } from './components/Row';
import { Cell } from './components/Cell';


type State = {
  text: string;
  prefix: string;
  selection: string;
}

class App extends React.PureComponent<{}, State> {

  state = { text: '', prefix: '', selection: '' };

  onTextChange = (text: string) => {
    this.setState({
      text
    });
  }

  onPrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      prefix: event.target.value
    });
  }

  onSelection  = (selection: string) => {
    this.setState({
      selection
    })
  }

  render() {
    return (
      <div className="App">
        <Row className="prefixRow">
          <Cell>
            <input placeholder="Use comma to add multiple prefixes" onChange={this.onPrefixChange} />
          </Cell>
        </Row>
        <Row className="bodyRow">
          <Cell>
            <InputPanel onSelection={this.onSelection} onTextChange={this.onTextChange} />
          </Cell>
          <Cell>
            <OutputPanel selection={this.state.selection} prefix={this.state.prefix} text={this.state.text} />
          </Cell>
        </Row>

      </div>
    );
  }
}

export default App;
