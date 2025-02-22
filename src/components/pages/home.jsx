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
                  src="/images/banner1.png"
                  alt="Main banner image for shoes Majesty Collections"
                />
                <div className="caption position-absolute start-0 bottom-0 w-100 p-3 p-md-4 text-white d-flex flex-column align-items-center align-items-md-start text-center text-md-start">
                  <h4>🔥 Step into Style! 🔥</h4>
                  <h5>Trendy Shoes Starting at Ksh 1000</h5>
                  <p>Unbeatable Deals from Ksh 200</p>
                  <Link to="/shop" className="btn btn-primary" style={{ backgroundColor: "var(--color-sample-2)", border: "none" }}>
                    Shop Now
                  </Link>
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
                      src="/images/shoes/shoe.png"
                      alt="Small banner image for shoes Majesty Collections"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="caption position-absolute start-0 bottom-0 w-100 p-2 p-md-3 text-white d-flex flex-column align-items-center text-center">
                      <h6>💯 Elevate Your Look</h6>
                      <p>Premium Shoes, Affordable Prices</p>
                      <Link to="/shop" className="btn btn-sm btn-primary" style={{ backgroundColor: "var(--color-sample-2)", border: "none" }}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Small Banner 2 */}
                <div className="col-12 col-md-6 mb-4">
                  <div className="small-banner-context position-relative h-100">
                    <img
                      className="img-fluid rounded-3 h-100 w-100"
                      src="/images/banner2.png"
                      alt="Small banner image for shoes Majesty Collections"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="caption position-absolute start-0 bottom-0 w-100 p-2 p-md-3 text-white d-flex flex-column align-items-center text-center">
                      <h6>⚡ Limited-Time Offers! ⚡</h6>
                      <p>Grab Yours Before They're Gone!</p>
                      <Link to="/shop" className="btn btn-sm btn-primary" style={{ backgroundColor: "var(--color-sample-2)", border: "none" }}>
                        Shop Now
                      </Link>
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