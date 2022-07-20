import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_player } from '../../store/players'
import Link from 'next/link'
import { selectUser } from '../../store/users'

const PlayerList = () => {

    const user = useSelector(selectUser);

    const dispatch = useDispatch()
    const playerData = useSelector((state) => state.player.player)
    const playerLoading = useSelector((state) => state.player.loadingPlayer)

    useEffect(() => {
        dispatch(get_player())
    }, [dispatch])

    return (
        <>
            <ul className="list-group">
                <li className="list-group-item active"><h5 className='text-white text-uppercase'>Player List</h5></li>
                {
                    playerLoading ? (
                        <div className="d-flex justify-content-center mt-3">
                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : playerData && (
                        playerData.map((e) => {
                            return (
                                e.playerId !== user?.uid && (
                                    <Link href={{ pathname: '/account', query: { id: e.id } }} className="list-group-item" key={e.id}>
                                        <a className="list-group-item list-group-item-action border-0">
                                            <div className="d-flex align-items-start">
                                                <img src={e.avatar} className="rounded-circle mr-1" alt="Vanessa Tucker" width={40} height={40} />
                                                <div className="flex-grow-1 ml-3 mt-1">
                                                    {e.name}
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            )
                        })
                    )
                }
            </ul>
        </>
    )
}

export default PlayerList