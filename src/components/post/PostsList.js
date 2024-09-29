import React from 'react';
import { Container } from 'react-bootstrap';
import Post from './index';

export default function PostsList({ posts }) {
  return (
    <Container className="px-4 pb-5 pt-5 d-flex flex-column align-items-center ">
      {posts?.length === 0 ? (
        <p className="text-center fs-2">
          No contribution Yet....
        </p>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Container>
  );
}
