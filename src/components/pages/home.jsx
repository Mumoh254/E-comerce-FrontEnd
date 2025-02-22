import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
 // Import a CSS file for custom styles

export default function Home() {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            {/* Main Banner */}
            <div className="col-12 col-md-6 mb-4">
              <div className="main-banner-context position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="/images/banner2.png"
                  alt="Main banner image for shoes Majesty Collections"
                />
                <div className="caption position-absolute start-0 bottom-0 p-4 text-white">
                  <h4>Special Sale 💥</h4>
                  <h5>Shoes from Ksh 1000</h5>
                  <p>From Ksh 200</p>
                  <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                </div>
              </div>
            </div>

            {/* Small Banners */}
            <div className="col-12 col-md-6">
              <div className="row h-100">
                {/* Small Banner 1 */}
                <div className="col-12 col-md-6 mb-4">
                  <div className="small-banner-context position-relative h-100">
                    <img
                      className="img-fluid rounded-3 h-100 w-100"
                      src="/images/banner1.png"
                      alt="Small banner image for shoes Majesty Collections"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="caption position-absolute start-0 bottom-0 p-3 text-white">
                      <h6>Special Sale 💥</h6>
                      <p>Shoes from Ksh 1000</p>
                      <Link to="/shop" className="btn btn-sm btn-primary">Shop Now</Link>
                    </div>
                  </div>
                </div>

                {/* Small Banner 2 */}
                <div className="col-12 col-md-6 mb-4">
                  <div className="small-banner-context position-relative h-100">
                    <img
                      className="img-fluid rounded-3 h-100 w-100"
                      src="/images/banner1.png"
                      alt="Small banner image for shoes Majesty Collections"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="caption position-absolute start-0 bottom-0 p-3 text-white">
                      <h6>Special Sale 💥</h6>
                      <p>Shoes from Ksh 1000</p>
                      <Link to="/shop" className="btn btn-sm btn-primary">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}