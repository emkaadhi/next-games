import React, { useEffect } from 'react'
import { get_profile_data, get_total_point } from '../../store/profile'
import { selectUser } from '../../store/users'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'


const CardProfile = () => {
    const user = useSelector(selectUser);

    const router = useRouter()
    const dispatch = useDispatch()

    let { id } = router.query

    const profileData = useSelector((state) => state.profile.profile)
    const loadingProfile = useSelector((state) => state.profile.isLoadingProfile)
    const totalPoint = useSelector((state) => state.profile.point)

    useEffect(() => {
        if (id) {
            dispatch(get_profile_data(id))
        }
    }, [dispatch, id,user])

    useEffect(() => {
        if (id) {
            dispatch(get_total_point(id))
        }
    }, [dispatch, id])

    return (
        <div className="card-container">
            {
                (totalPoint.totalpoint >= 0 && totalPoint.totalpoint <= 10) && (
                    <span className="beginner">BEGINNER</span>
                )
            }
            {
                (totalPoint.totalpoint > 10 && totalPoint.totalpoint <= 20) && (
                    <span className="intermediate">INTERMEDIATE</span>
                )
            }
            {
                (totalPoint.totalpoint > 20) && (
                    <span className="pro">PRO</span>
                )
            }
            {
               loadingProfile ? (
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                ) : profileData  && (
                    <>
                        <img className="rounded-circle img-thumbnail" src={profileData.avatar} alt="user" style={{ width: '125px' }} />
                        <h4 className='text-uppercase mt-1'>{profileData.name}</h4>
                        <h6>{profileData.address}</h6>
                        <h6>{profileData.phone}</h6>
                        {
                            (profileData.playerId != user?.uid) && (
                                <div className="buttons">
                                    <button className="btn btn-primary">
                                        Following
                                    </button>
                                </div>
                            )
                        }
                    </>
                )
            }
            <div className="skills bg-primary">
                <h5 className='text-white text-uppercase'>Game History</h5>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center active">
                        <h6 className='mt-2 text-white'>Total Score</h6>
                        <span className="badge badge-dark badge-pill">{totalPoint.totalpoint}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CardProfile