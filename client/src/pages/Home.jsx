import React, { Component } from 'react';

import Layout from '../components/Layout';
import StartPlanning from '../components/StartPlanning';

export default class Home extends Component {

    render() {
       return (
          <div className="Home">
            <Layout comp={StartPlanning} />
            
        </div>
      );
    }
  }