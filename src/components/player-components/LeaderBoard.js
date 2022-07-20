import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_leader_board, get_player } from '../../store/players'
import Link from 'next/link'
import { selectUser } from '../../store/users'

const LeaderBoard = () => {

    const leaderBoard = useSelector((state) => state.player.leaderBoard)
    const loadingBoard = useSelector((state) => state.player.loadingBoard)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(get_leader_board())
    }, [dispatch])

    return (
        <>
            <ul className="list-group mt-3">
                <li className="list-group-item active"><h5 className='text-white text-uppercase'>Leader Board</h5></li>
                {
                    leaderBoard ? (
                        leaderBoard.map((e) => {
                            return (
                                <li className="list-group-item" key={e.id}>
                                    <a href="#" className="list-group-item list-group-item-action border-0">
                                        <div className="d-flex align-items-start">
                                            <img src={e.avatar} className="rounded-circle mr-1" alt="Vanessa Tucker" width={40} height={40} />
                                            <div className="flex-grow-1 ml-3 mt-1">
                                                <p>{e.name} <span className="badge badge-danger ml-3">{e.totalpoint}</span></p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    ) : loadingBoard && (
                        <div className="d-flex justify-content-center mt-3">
                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                }
            </ul>
        </>
    )
}

export default LeaderBoard