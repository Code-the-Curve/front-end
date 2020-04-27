import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';
import Consultation from '../pages/Consultation/index';
import ConsultationComponent from '../pages/Consultation/ConsultationComponent'
const SignInForm = lazy(() =>
  import(/* webpackChunkName: "signInForm" */ '../organisms/SIgnInForm')
);
const SignUpForm = lazy(() =>
  import(/* webpackChunkName: "signUpForm" */ '../organisms/SignUpForm')
);

const NotFoundPage = lazy(() =>
  import(/* webpackChunkName: "notFoundPage" */ '../pages/NotFoundPage')
);

const AppRoutes = () => (
  <Switch>
    <Route path="/" exact  component={Consultation}/>
    <Route path="/consultation" exact  component={ConsultationComponent} />

    {/* </Route>
    <Route path="/sign-in" exact>
      <Suspense fallback={<LoadingPage />}>
        <SignInForm />
      </Suspense>
    </Route>
    <Route path="/sign-up" exact>
      <Suspense fallback={<LoadingPage />}>
        <SignUpForm />
      </Suspense>
    </Route>
    <Route>
      <Suspense fallback={<LoadingPage />}>
        <NotFoundPage />
      </Suspense>
    </Route> */}
  </Switch>
);

export default AppRoutes;
