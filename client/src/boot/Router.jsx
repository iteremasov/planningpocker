import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { StartPlanning } from '../pages/StartPlanning';
import { PanningRoom } from '../pages/PlanningRoom';

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={ StartPlanning }/>
      <Route path="/:roomkey" component={ PanningRoom }/>
    </Switch>
  )
};
