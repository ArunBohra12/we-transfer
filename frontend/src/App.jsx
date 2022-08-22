import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/loginAndSignup/login.page';
import SignupPage from './pages/loginAndSignup/signup.page';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import ShareFile from './pages/share/shareFile.page';
import UserContext from './context/user.context';

import './App.css';

function App() {
  const { userInfo } = useContext(UserContext);

  return (
    <>
      <Header />

      <main className='main'>
        {userInfo ? (
          <Switch>
            <Route exact path='/upload' component={ShareFile} />
            <Route exact path='/profile'>
              Profile page
            </Route>
            <Route>
              <Redirect to='/upload' />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={SignupPage} />
            <Route>
              <Redirect to='/login' />
            </Route>
          </Switch>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
