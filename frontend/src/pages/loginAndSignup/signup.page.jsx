import { useContext, useState } from 'react';
import { userSignup } from '../../api/user';
import { useHistory } from 'react-router';
import UserContext from '../../context/user.context';

import './signupLogin.styles.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSignup = async e => {
    e.preventDefault();
    const signupData = await userSignup({ name, email, password, passwordConfirm });

    if (signupData?.user) {
      setUserData(signupData.user);
      history.push('/upload');
    }
  };

  return (
    <section className='signup-section'>
      <form className='signup-form' onSubmit={handleSignup}>
        <h2 className='signup-heading'>Sign up</h2>

        <div className='inputs-collection'>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            autoComplete='off'
            onChange={e => setName(e.target.value)}
          />

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
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            placeholder='Confirm password'
            autoComplete='off'
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className='signup-btn'>Sign up</button>
      </form>
    </section>
  );
};

export default SignupPage;
