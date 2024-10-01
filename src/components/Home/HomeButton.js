import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import img1 from "assets/home3.png";
import img2 from "assets/home2.png";
import img3 from "assets/home1.png";
import { Link, Link as RouterLink } from "react-router-dom";
import { DASHBOARD, RENDER_POST } from "lib/routes";
import { useAuth } from 'hooks/auth';

const HomeButton = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [role, setRole] = useState(localStorage.getItem('userRole') || null);

  useEffect(() => {
    if (user && user.role) {
      // Store the user role in localStorage for the first time
      localStorage.setItem('userRole', user.role);
      setRole(user.role); // Update the local state with the user's role
    }
  }, [user]);

  if (authLoading && !role) return "Loading...";

  // Render based on stored role or fetched user role
  const userRole = role || (user && user.role);

  return (
    <Container className="p-0 pt-4">
      <div className="d-flex justify-content-between">
        {userRole === "contributor" && (
          <Link as={RouterLink} to={DASHBOARD} className="mr-3">
            <img
              src={img1}
              alt="Home"
              className="img-fluid rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
            <p className="text-center">Donate</p>
          </Link>
        )}
        {userRole === "volunteer" && (
          <Link as={RouterLink} to={RENDER_POST} className="mr-3">
            <img
              src={img1}
              alt="Home"
              className="img-fluid rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
            <p className="text-center">Today Posts</p>
          </Link>
        )}
        <a href="https://hungerfree.vercel.app/" className="mr-3">
          <img
            src={img2}
            alt="Home"
            className="img-fluid rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <p className="text-center">Web Page</p>
        </a>
        <a href="https://hungerfree.vercel.app/about">
          <img
            src={img3}
            alt="Home"
            className="img-fluid rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <p className="text-center">About us</p>
        </a>
      </div>
    </Container>
  );
};

export default HomeButton;
