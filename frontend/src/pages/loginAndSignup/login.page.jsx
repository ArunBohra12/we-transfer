import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../../api/user';
import UserContext from '../../context/user.context';
import './signupLogin.styles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  const handleLogin = async e => {
    e.preventDefault();
    const loginData = await userLogin({ email, password });

    if (loginData?.user) {
      setUserData(loginData.user);
      history.push('/upload');
    }
  };

  return (
    <section className='login-section'>
      <form className='login-form' onSubmit={handleLogin}>
        <h2 className='login-heading'>Log in</h2>

        <div className='inputs-collection'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email address'
            autoComplete='off'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            autoComplete='off'
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className='login-btn'>Log in</button>
      </form>
    </section>
  );
};

export default LoginPage;
