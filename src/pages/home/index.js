import React, { useEffect } from 'react'

const Home = () => {
  
  return (
    <>
      <header className="bg-gradient-dark">
        <div className="page-header min-vh-85" style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp7902555.jpg")' }}>
          <span className="mask bg-gradient-dark opacity-6" />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center mx-auto my-auto">
                <h1 className="text-white">Work hard Play Harder</h1>
                <p className="lead mb-4 text-white opacity-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quas exercitationem voluptas tempore! Dolorum voluptatibus dolores esse. Architecto accusamus quis, aut animi, ex quasi vero, sint eum possimus facilis velit.</p>
                <h6 className="text-white mb-2 mt-5">Find us on</h6>
                <div className="d-flex justify-content-center">
                  <a href="/home"><i className="fab fa-facebook text-lg text-white me-4" /></a>
                  <a href="/home"><i className="fab fa-instagram text-lg text-white me-4" /></a>
                  <a href="/home"><i className="fab fa-twitter text-lg text-white me-4" /></a>
                  <a href="/home"><i className="fab fa-google-plus text-lg text-white" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Home