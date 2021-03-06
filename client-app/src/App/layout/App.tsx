import React, { Fragment, useContext, useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import HomePage from '../../Features/home/HomePage'
import NavBar from '../../Features/nav/NavBar'
import VisitDashboard from '../../Features/visits/dashboard/VisitDashboard'
import VisitForm from '../../Features/visits/form/VisitForm'
import VisitDetails from '../../Features/visits/details/VisitDetails'
import NotFound from './NotFound'
import { ToastContainer } from 'react-toastify'
import { RootStoreContext } from '../stores/rootStore'
import LoadingComponent from './LoadingComponent'
import ModalContainer from '../common/modals/ModalContainer'
import ProfilePage from '../../Features/profiles/ProfilePage'
import PrivateRoute from './PrivateRoute'
import RegisterSuccess from '../../Features/user/RegisterSuccess'
import VerifyEmail from '../../Features/user/VerifyEmail'

const App: React.FC<RouteComponentProps> = ({ location }) => {  

  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if (token && !appLoaded) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token, appLoaded])

  if (!appLoaded) return <LoadingComponent content='Loading app...' />
  
  // ======== DISPLAY DOM ======== //
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <PrivateRoute exact path='/visits' component={VisitDashboard} />
                <PrivateRoute  path='/visits/:id' component={VisitDetails} />
                {/* Using location:key to create a new instance of the loaded component when a prop changes  */}
                <PrivateRoute key={location.key} path={['/createVisit', '/manage/:id']} component={VisitForm} />  
                <PrivateRoute path='/profile/:username' component={ProfilePage} />
                <Route path='/user/registerSuccess' component={RegisterSuccess} />
                <Route path='/user/verifyEmail' component={VerifyEmail} />
                {/* <Route path='/login' component={LoginForm} /> */}
                <Route component={NotFound} />    
              </Switch>
            </Container>
          </Fragment>
        )} />
    </Fragment>
  )
}

export default withRouter(observer(App)) 