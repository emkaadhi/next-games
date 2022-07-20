import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_games } from '../../store/games'

const GameList = () => {

    const data = useSelector((state) => state.games)
    const isLoading = useSelector((state) => state.games.isLoadingGames)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_games())
    }, [dispatch])

  return (
    <>
    <div>
            <div className="container">
                <div className="row">
                    {
                        data ? (
                            data.games.map((e) => {
                                return (
                                    <div className="col-md-4" key={e.id}>
                                        <div className="card mt-4">
                                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                                <a className="d-block blur-shadow-image">
                                                    <img src={e.image} alt="img-colored-shadow" className="img-fluid border-radius-lg" />
                                                </a>
                                            </div>
                                            <div className="card-body text-cente">
                                                <h4 className="font-weight-bold text-uppercase ">
                                                    <a href="/">{e.title}</a>
                                                </h4>
                                                <p>{e.developer} | {e.release} | {e.genre}</p>
                                                <p className="mb-0">
                                                    {e.description}
                                                </p>
                                                <Link href={`/games/${e.link}`}>
                                                    <button type="button" className="btn bg-gradient-primary btn-sm mb-0 mt-3">Play Now</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : isLoading && (
                            <div className="d-flex justify-content-center mt-3">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default GameList