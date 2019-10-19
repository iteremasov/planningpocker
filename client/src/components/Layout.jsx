import React, { Component } from 'react';

import Header from './Header';

export default class Layout extends Component {

    render() {
        const Boddy = this.props.comp;
       return (
          <div className="Home">
            <Header />
            <Boddy />
            
        </div>
      );
    }
  }