import { onAuthStateChanged } from 'firebase/auth';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import GameList from '../components/game-components/GameList';
import Footer from '../components/main-components/Footer';
import Posts from '../components/posts-components';
import { auth } from '../config/firebase';
import { login, logout, selectUser } from '../store/users'

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );
      }
    });
  }, []);


  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-absolute bg-transparent shadow-none">
          <div className="container">
            <a className="navbar-brand text-white"><img src="/logochapter10.png" alt="logo" style={{ width: '150px' }} /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-header-2" aria-controls="navbar-header-2" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbar-header-2">
              <ul className="navbar-nav mx-auto">
                <Link href={`/`} className="nav-item">
                  <a className="nav-link text-white">
                    Home
                  </a>
                </Link >
                <li className="nav-item">
                  <Link href={`/auth/signin`}>
                    <a className="nav-link text-white">
                      Sign In
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={`/auth/signup`}>
                    <a className="nav-link text-white">
                      Sign Up
                    </a>
                  </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white mx-2" href="/">
                    <i className="fab fa-facebook" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="page-header min-vh-100" style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp3144352.jpg")' }} loading="lazy">
          <span className="mask bg-gradient-dark opacity-5" />
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 d-flex justify-content-center flex-column">
                <h1 className="text-white mb-4">30 Days <span className='text-danger'>Free Access</span> </h1>
                <p className="text-white opacity-8 lead pe-5 me-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque necessitatibus adipisci expedita provident sit? Optio. </p>
                <div className="buttons">
                  <Link href={`/auth/signup`}>
                    <button className="btn btn-primary mt-4">Register Now</button>
                  </Link>
                  {/* <button type="button" className="btn text-white shadow-none mt-4">Read more</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className='mt-4'>
        <div className="container">
          <h5 className='text-primary text-uppercase mb-3' style={{ borderLeft: '6px solid'}}>&nbsp;<span className='text-white'>Recommended</span> for you</h5>
        </div>
        <GameList />
      </section>
    </>
  )
}
