import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch()

  const onClickLogout = () => {
		if (window.confirm("You want logout?")){
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>YourLife</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button  className={styles.auth__button} variant="contained">Create post<span className={styles.flare}></span></Button>
                </Link>
                <Button onClick={onClickLogout} style={{backgroundColor: "#c1121f"}} variant="contained" color="error">
                  Exit
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className={styles.auth__button} variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" className={styles.auth__button}>Create account<span className={styles.flare}></span></Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
