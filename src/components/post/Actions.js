import React from "react";
import { FaPhoneAlt, FaTrash } from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";
import { useAuth } from "hooks/auth";
import { useDeletePost, useAcceptRequest } from "hooks/posts";


export default function Actions({ post }) {
  const { id, uid, request, acceptby, ph } = post;
  const { user, isLoading: userLoading } = useAuth();
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { acceptRequest, isLoading: acceptLoading } = useAcceptRequest(id);

  // Check if user is loaded and user has a role
  const isVolunteer = user && user.role === "volunteer";
  const isContributor = user && user.role === "contributor";


 

  return (
    <div className="p-2 d-flex align-items-center justify-content-between bg-light ">
      {isVolunteer &&
        !request && ( // Only render if user is volunteer and request is false
          <>
            <Button
              className="me-2"
              onClick={acceptRequest}
              size="md"
              variant="outline-success"
              disabled={acceptLoading || deleteLoading}
            >
              {acceptLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Accept"
              )}
            </Button>
          </>
        )}
      {isVolunteer && request && (
        <>
          {acceptby === user.username ? (
            <>
              <a href={`tel:+91${ph}`}>
                <FaPhoneAlt size="19" className="nav-linker" />
              </a>
              <span className="badge bg-success mx-2">Accepted</span>
            </>
          ) : (
            <span className="badge bg-warning mx-2">Accepted by someone</span>
          )}
        </>
      )}

      {!userLoading && user && user.id === uid && (
        <>
          <Button
            onClick={deletePost}
            size="md"
            variant="outline-danger"
            disabled={acceptLoading || deleteLoading}
          >
            {deleteLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FaTrash />
            )}
          </Button>
          {isContributor && request === true && (
            <span className="badge bg-success mx-2">Pickup Confirmed by {acceptby}</span>
          )}
        </>
      )}
    </div>
  );
}
