import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';

import { Dashboard } from '../pages/Dashboard';
import { Orders } from '../pages/Orders';
import { Categories } from '../pages/Categories';
import { CategoryForm } from '../pages/CategoryForm';
import { Products } from '../pages/Products';
import { ProductForm } from '../pages/ProductForm';
import { Feedbacks } from '../pages/Feedbacks';
import { Settings } from '../pages/Settings';
import { Account } from '../pages/Account';
import { Establishments } from '../pages/Establishment';
import { EstablishmentForm } from '../pages/EstablishmentForm';
import { Waiters } from '../pages/Waiters';
import { WaiterForm } from '../pages/WaiterForm';
import { Tables } from '../pages/Tables';
import { TableForm } from '../pages/TableForm';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/account" exact component={Account} isPrivate />

    <Route path="/orders" exact component={Orders} isPrivate />

    <Route path="/categories/new" exact component={CategoryForm} isPrivate />
    <Route path="/categories/edit" exact component={CategoryForm} isPrivate />
    <Route path="/categories" component={Categories} isPrivate />

    <Route path="/tables" exact component={Tables} isPrivate />
    <Route path="/tables/new" exact component={TableForm} isPrivate />

    <Route path="/feedbacks" component={Feedbacks} isPrivate />

    <Route path="/products" exact component={Products} isPrivate />
    <Route path="/products/new" exact component={ProductForm} isPrivate />
    <Route path="/products/edit" exact component={ProductForm} isPrivate />

    <Route path="/settings" exact component={Settings} isPrivate />

    <Route path="/settings/waiters" exact component={Waiters} isPrivate />
    <Route
      path="/settings/waiters/new"
      exact
      component={WaiterForm}
      isPrivate
    />
    <Route
      path="/settings/waiters/edit"
      exact
      component={WaiterForm}
      isPrivate
    />

    <Route
      path="/settings/establishments"
      exact
      component={Establishments}
      isPrivate
    />

    <Route
      path="/settings/establishments/new"
      exact
      component={EstablishmentForm}
      isPrivate
    />

    <Route
      path="/settings/establishments/edit"
      exact
      component={EstablishmentForm}
      isPrivate
    />
  </Switch>
);

export default Routes;
