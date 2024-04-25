import React from 'react';
import { Container } from 'react-bootstrap';
import Header from "./Header";
import Actions from "./Actions";

export default function Post({ post }) {
  // Destructuring text and image from post
  const { text, image } = post;

  return (
    <Container className="p-2" style={{ maxWidth: "600px", textAlign: "left" }}>
      <div className="border border-2 border-gray rounded-md">
        <Header post={post} />

        <div className="p-2" style={{ minHeight: "100px" }}>
          {/* Rendering text content */}
          {text && (
            <p className="word-break-break-word fs-md">
              {text}
            </p>
          )}

          {/* Rendering image if available */}
          {image && (
            <div style={{ objectFit: 'cover' }}>
              <img src={image} alt="Post" />
            </div>
          )}
        </div>

        <Actions post={post} />
      </div>
    </Container>
  );
}
