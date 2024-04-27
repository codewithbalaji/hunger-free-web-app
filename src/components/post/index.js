import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Header from "./Header";
import Actions from "./Actions";

export default function Post({ post }) {
  // Destructuring text and image from post
  const { text, image, foodQuantity, cookedTime, address, } = post;

  return (
    <Container className="p-2">
      <Card className="border border-2 border-gray rounded-md" style={{ maxWidth: "600px" }}>
        <Header post={post} />

        <Card.Body className="p-2">
          {/* Rendering text content if available */}
          {text && (
            <p style={{fontFamily:"poppins",fontWeight:"400"}} className="word-break-break-word fs-md">
              <span style={{fontFamily:"poppins",fontWeight:"500"}}>
                Food Description:
                <br/>
              </span>
              {text}
             
            </p>
          )}

          {/* Rendering image if available */}
          {image && (
            <div className="d-flex justify-content-center mb-2">
              <Card.Img src={image} alt="Post" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
          )}

          {/* Additional details */}
          <div className="d-flex justify-content-between align-items-center">
            {foodQuantity && <p> <span style={{fontFamily:"poppins",fontWeight:"500"}}>Food Quantity:</span> {foodQuantity}</p>}
            {cookedTime && <p><span style={{fontFamily:"poppins",fontWeight:"500"}}>Cooked Time:</span> {cookedTime}</p>}
          </div>
          {address && <div><p><span style={{fontFamily:"poppins",fontWeight:"500"}}>Address:</span> {address}</p></div>}
        </Card.Body>

        <Card.Footer>
          <Actions post={post} />
        </Card.Footer>
      </Card>
    </Container>
  );
}
