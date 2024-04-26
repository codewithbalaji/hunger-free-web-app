import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Spinner } from 'react-bootstrap';
import { useAuth } from 'hooks/auth';
import { useDeletePost } from 'hooks/posts';


export default function Actions({ post }) {
  const { id, uid } = post;
  const { user, isLoading: userLoading } = useAuth();
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);


  return (
    <div className="p-2 d-flex">
      {!userLoading && user.id === uid && (
        <Button
          className="ms-auto"
          onClick={deletePost}
          size="md"
          variant="outline-danger"
          disabled={deleteLoading}
          style={{ borderRadius: '50%' }}
        >
          {deleteLoading ? <Spinner animation="border" size="sm" /> : <FaTrash />}
        </Button>
      )}
    </div>
  );
}
