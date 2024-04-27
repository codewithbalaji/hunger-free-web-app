import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { usePosts } from "hooks/posts";
import { useUser } from "hooks/users";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { format } from "date-fns";
import EditProfile from "./EditProfile";
import { useAuth } from "hooks/auth";
import { useLogout } from "hooks/auth";
import Swal from "sweetalert2";

export default function Profile() {
  const { id } = useParams();
  const { posts, isLoading: postsLoading } = usePosts(id);
  const { user, isLoading: userLoading } = useUser(id);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { logout, isLoading: logoutLoading } = useLogout();

  useEffect(() => {
    if (userLoading || postsLoading || authLoading || logoutLoading) {
      Swal.fire({
        title: "Loading...",
        html: "Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [userLoading, postsLoading, authLoading, logoutLoading]);

  if (userLoading) return "";

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-auto">
          <Avatar size="xl" user={user} />
        </div>
        <div className="col">
          <h2>{user.username}</h2>
          <div className="mb-3">
            <p>Posts: {posts.length}</p>
            <p>Role: {user.role}</p>
            <p>Joined: {format(user.date, "MMMM yyy")}</p>
          </div>
        </div>
        {!authLoading && authUser.id === user.id && (
          <div className="col-auto">
            <Button
              variant="primary"
              onClick={openModal}
              size="sm"
              className="me-2"
            >
              Change avatar
            </Button>
            <Button variant="danger" onClick={logout} size="sm">
              Logout
            </Button>
          </div>
        )}
        <EditProfile isOpen={isOpen} onClose={closeModal} />
      </div>
      <hr className="my-4" />
      <div className="team-section">
        <h1 className="text-center mb-4">Our Team</h1>
        <h2 className="text-center mb-5">CODE COMMANDOS</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Balaji D</li>
          <li className="list-group-item">Deepan B</li>
          <li className="list-group-item">Yogeshwaran M</li>
        </ul>
      </div>
      <footer className="footer text-center mt-5">
        <p>App current version: beta testing</p>
      </footer>
    </div>
  );
}
