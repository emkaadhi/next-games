import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../store/users';
import { auth } from '../config/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { get_current_profile} from '../store/profile';

const Navbar = () => {

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    const user = useSelector(selectUser);
    
    const id = user?.uid

    const router = useRouter()

    const currentPlayer = useSelector((state) => state.profile.currentPlayer)

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(get_current_profile(id))
        }
    }, [dispatch, id])


    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
        router.push('/auth/signin')
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg  blur border-radius-xl top-1 z-index-3 my-3 py-2 start-0 end-0 mx-4 navbar-primary bg-gradient-primary ">
                <div className="container-fluid px-0">
                    <Link href={`/home`}>
                        <a className="navbar-brand font-weight-bolder ms-sm-3">
                            <h5 className='mt-2 text-white text-uppercase'>chapter 10</h5>
                        </a>
                    </Link>
                    <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon mt-2">
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
                        <ul className="navbar-nav navbar-nav-hover ml-3">
                            <Link href={`/home`} className="nav-item active">
                                <a className="nav-link text-white">Home</a>
                            </Link>
                            <Link href={`/games`} className="nav-item active">
                                <a className="nav-link text-white">Games</a>
                            </Link>
                            {/* <Link href={`/multimedia`} className="nav-item active">
                                <a className="nav-link text-white">Gallery</a>
                            </Link> */}
                        </ul>
                        <ul className="navbar-nav navbar-nav-hover ms-auto mr-5">
                            <Link href={{ pathname: '/account', query: { id: user?.uid } }} className="nav-item active">
                                <a className="nav-link text-white">Welcome , <span className=''>{user?.email}</span></a>
                            </Link>
                            <li className="nav-item dropdown dropdown-hover mx-2">
                                <a className="nav-link ps-2 d-flex cursor-pointer align-items-center text-white" id="dropdownMenuPages" data-bs-toggle="dropdown" aria-expanded="false">
                                    Manage Account
                                    <img src="/down-arrow-white.svg" alt="down-arrow" className="arrow ms-auto ms-md-2" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3 " aria-labelledby="dropdownMenuPages">
                                    <div className="d-none d-lg-block">
                                        <Link href={`/account/update`}>
                                            <a className="dropdown-item border-radius-md">
                                                <span>Update Profile</span>
                                            </a>
                                        </Link>
                                        {/* <Link href={`/multimedia/upload`}>
                                            <a className="dropdown-item border-radius-md">
                                                <span>Upload Media Files</span>
                                            </a>
                                        </Link> */}
                                        <a className="dropdown-item border-radius-md">
                                            <b className="nav-link" onClick={logoutOfApp}>Logout</b>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar