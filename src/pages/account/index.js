import React, { useEffect} from 'react'
import CardProfile from '../../components/profile-components/CardProfile';
import GameBoard from '../../components/game-components/GameBoard';
import PlayerList from '../../components/player-components/PlayerList';
import LeaderBoard from '../../components/player-components/LeaderBoard';

const Account = () => {

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-3">
            <CardProfile />
          </div>
          <div className="col-md-6">
            <GameBoard />
          </div>
          <div className="col-md-3">
            <PlayerList/>
            <LeaderBoard/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account