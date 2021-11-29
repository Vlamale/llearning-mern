import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { LOGIN_PAGE } from './const/routes';
import { useTypedSelector } from './hooks/useTypedSelector';
import Loader from './Loader';
import { UserActions } from './redux/userReducer/userActions';

function App() {
  const dispatch = useDispatch()
  const loading = useTypedSelector(state => state.user.loading)
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(UserActions.checkAuth())
    } else {
      history.push(LOGIN_PAGE)
    }

  }, [])
  return (
    <>
      <AppRouter />
      {loading && <Loader />}
    </>
  );
}

export default App;
