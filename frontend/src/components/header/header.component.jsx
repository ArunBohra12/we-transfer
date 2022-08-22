import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/user.context';
import logo from '../../assets/logo.svg';
import { userLogout } from '../../api/user';
import showAlert from '../../utils/alert';

import './header.styles.css';

const Header = () => {
  const [userData, setUserData] = useState(null);
  const { userInfo, setUserData: setUserContext } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => setUserData(userInfo), [userInfo]);

  const logoRedirection = userData ? '/upload' : '/login';

  const handleLogout = () => {
    userLogout();
    setUserContext(null);
    showAlert('success', 'Logged out successfully!');
    history.push('/login');
  };

  return (
    <header className='header'>
      <Link className='logo-container' to={logoRedirection}>
        <img src={logo} alt='We Transfer' className='logo' />
      </Link>

      <nav className='nav'>
        {userData ? (
          <>
            <Link to='/profile' className='nav-link'>
              Profile
            </Link>
            <div className='nav-link' onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link to='/login' className='nav-link'>
              Log in
            </Link>
            <Link to='/signup' className='nav-link'>
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
