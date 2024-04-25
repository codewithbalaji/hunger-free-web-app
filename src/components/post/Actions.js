import React from 'react';
import { Link } from 'react-router-dom';
import { PROTECTED } from 'lib/routes';
import { FaComment, FaRegComment, FaTrash } from 'react-icons/fa';
import { Button, Spinner } from 'react-bootstrap';
import { useAuth } from 'hooks/auth';
import { useDeletePost } from 'hooks/posts';
import { useComments } from 'hooks/comments';

export default function Actions({ post }) {
  const { id, uid } = post;
  const { user, isLoading: userLoading } = useAuth();
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <div className="p-2 d-flex">
      <div className="d-flex align-items-center ms-2">
        <Button
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          size="md"
          variant="outline-teal"
          className="rounded-circle"
          disabled={commentsLoading}
        >
          {commentsLoading ? <Spinner animation="border" size="sm" /> : (comments?.length === 0 ? <FaRegComment /> : <FaComment />)}
        </Button>
        <span>{comments?.length}</span>
      </div>

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
