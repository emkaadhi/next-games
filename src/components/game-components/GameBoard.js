import React, { useEffect } from 'react'
import { get_game_board } from '../../store/games'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/users';
import moment from 'moment';
import { useRouter } from 'next/router';


const GameBoard = () => {

    const user = useSelector(selectUser);
    const router = useRouter()

    const gameBoard = useSelector((state) => state.games.gamesBoard)
    const loadingGameBoard = useSelector((state) => state.games.isloadingGameBoard)
    const dispatch = useDispatch()

    let { id } = router.query

    useEffect(() => {
        if (id) {
            dispatch(get_game_board(id))
        }
    }, [dispatch,id])

    return (
        <div>
            <div className="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6">
                <div className="card-header p-0 position-relative mt-n6 mx-3 z-index-2 bg-transparent">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg p-3">
                        <h3 className="text-white text-primary mb-0 text-uppercase">Game Board</h3>
                    </div>
                </div>
                {
                    loadingGameBoard ? (
                        <div className="d-flex justify-content-center mt-3">
                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : gameBoard && (
                        gameBoard.map((e) => {
                            return (
                                e.playerId === user?.uid ? (
                                    <div className="card-body" key={e.id}>
                                        <div className="chat-message-right">
                                            <div>
                                                <img src={e.avatar} className="rounded-circle mr-1" alt="img-user" width={50} height={50} />
                                                <div className="text-muted small text-nowrap mt-2">{moment(e.createdAt.toDate()).fromNow()}</div>
                                            </div>
                                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                                <div className="font-weight-bold mb-1">{e.name}</div>
                                                Play {e.playCount} , Win {e.userWin} , Draw {e.userDraw} , Loss {e.userLoss} , Total Point {e.point}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card-body" key={e.id}>
                                        <div className="chat-message-left">
                                            <div>
                                                <img src={e.avatar} className="rounded-circle mr-1" alt="img-user" width={50} height={50} />
                                                <div className="text-muted small text-nowrap mt-2">{moment(e.createdAt.toDate()).fromNow()}</div>
                                            </div>
                                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                                <div className="font-weight-bold mb-1">{e.name}</div>
                                                Play {e.playCount} , Win {e.userWin} , Draw {e.userDraw} , Loss {e.userLoss} , Total Point {e.point}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default GameBoard