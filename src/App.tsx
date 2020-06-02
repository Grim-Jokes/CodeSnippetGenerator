import React from 'react';
import './App.css';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Row } from './components/Row';
import { Cell } from './components/Cell';
import { ConfigPanel } from './components/ConfigPanel';
import { TabStopOption } from './types';


type State = {
  text: string;
  prefix: string;
  selection: string | null;
  tabStopCount: number;
}

class App extends React.PureComponent<{}, State> {

  state = {
    text: 'class DoubleClickMe {\n  ${0}\n}\nexport { DoubleClickMe };',
    prefix: '', selection: '', transformedText: '',
    tabStopCount: 1,
  };
  first = true;

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

  onSelection = (selection: string) => {
    this.setState({
      selection
    })
  }

  onConfigClick = (option: TabStopOption) => {
    if (!this.state.selection) {
      return;
    }

    switch (option) {
      case TabStopOption.Tabstop:
        this.handleTabStop();
        break;
      case TabStopOption.Placeholder:
        this.handlePlaceHolder();
        break;
    }
  }

  private handleTabStop() {
    const re = new RegExp(this.state.selection, 'g');
    const { tabStopCount } = this.state;
    this.setState({
      text: this.state.text.replace(re, `\${${tabStopCount }}`),
      selection: null,
      tabStopCount: tabStopCount + 1
    });
  }

  private handlePlaceHolder() {
    const { tabStopCount } = this.state;
    const re1 = new RegExp(this.state.selection, 'g');
    
    const text = this.state.text.replace(re1, this.replace_by);
    this.first = true;
    this.setState({
      text,
      selection: null,
      tabStopCount: tabStopCount + 1
    });
  }

  private replace_by = (match: any) => {
    if (this.first) {
      this.first = false;
      return `\${${this.state.tabStopCount}:${match}}`;
    }

    return `\${${this.state.tabStopCount}}`;
  }

  render() {
    return (
      <div className="App">
        <Row className="prefixRow">
          <Cell>
            <input placeholder="Use comma to add multiple prefixes" onChange={this.onPrefixChange} />
          </Cell>
        </Row>
        <Row className="contentRow">
          <Cell className={`config-cell`}>
            <ConfigPanel onClick={this.onConfigClick} selection={this.state.selection} />
          </Cell>
          <Cell>
            <InputPanel value={this.state.text} onSelection={this.onSelection} onTextChange={this.onTextChange} />
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
