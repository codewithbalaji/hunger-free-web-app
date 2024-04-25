import React from 'react';
import img1 from "assets/help1.jpg";
import img2 from "assets/vol.jpg";

const Blogs = () => {
  return (
    <div className="container">
        <h1 className='mt-3'>Our Latest Blogs</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src={img1} className="card-img-top" alt="help" />
            <div className="card-body">
              <h5 className="card-title">Blog Title</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src={img2} className="card-img-top" alt="help" />
            <div className="card-body">
              <h5 className="card-title">Blog Title</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src={img1} className="card-img-top" alt="help" />
            <div className="card-body">
              <h5 className="card-title">Blog Title</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
