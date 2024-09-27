import React from 'react';
import img1 from "assets/help1.webp";
import img2 from "assets/vol.webp";
import img3 from "assets/vo.webp";

const Blogs = () => {
  return (
    <div className="container-fluid" style={{backgroundColor:""}}>
        <h1 className='mt-3'>Our Latest Blogs</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src={img3} className="card-img-top" alt="help" />
            <div className="card-body">
              <h5 className="card-title">Volunteer Food Donations Transforming Communities</h5>
              <p className="card-text">Dive into the heartwarming stories of volunteers reaching out to homeless populations in diverse neighborhoods. Explore how these acts of kindness not only provide nourishment but also foster a sense of community and compassion across different areas, bringing hope and support to those in need.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src={img2} className="card-img-top" alt="help" />
            <div className="card-body">
              <h5 className="card-title">Volunteers' Journey to Addressing Hunger Across Regions</h5>
              <p className="card-text">Follow the journey of dedicated volunteers as they navigate through different geographical areas, from bustling city centers to remote rural communities, to distribute food to homeless individuals. Discover the challenges they face and the innovative solutions they employ to ensure that no one is left behind in the fight against hunger.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src={img1} className="card-img-top" alt="help" />
            <div className="card-body">
              <h5 className="card-title">Volunteers Uniting Communities Through Food Donations</h5>
              <p className="card-text">Explore how volunteers bridge the gap between abundance and scarcity by redistributing surplus food to homeless populations in various areas. Through collaborative efforts and a shared commitment to ending hunger, these volunteers create connections that transcend geographic boundaries, fostering solidarity and empathy across diverse communities.</p>
            <br></br>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </div>
    
  );
};

export default Blogs;