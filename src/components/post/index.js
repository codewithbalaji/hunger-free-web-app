import React from "react";
import { Container, Card } from "react-bootstrap";
import Header from "./Header";
import Actions from "./Actions";

export default function Post({ post }) {
  // Destructuring text and image from post
  const { text, image, foodQuantity, cookedTime, address } = post;

  return (
    <Container className="p-2 py-3 ">
      <Card
        className="border border-2 border-gray rounded-md "
        style={{ maxWidth: "600px" }}
      >
        <Header post={post} />

        <Card.Body className="p-2">
          {/* Rendering text content if available */}
          {text && (
            <p className="mb-3" style={{ fontFamily: "poppins", fontWeight: "400" }}>
              <span style={{ fontFamily: "poppins", fontWeight: "600" }}>
                Food Description:
                <br />
              </span>
              {text}
            </p>
          )}

          {/* Rendering image if available */}
          {image && (
            <div className="d-flex justify-content-center mb-3">
              <Card.Img
                src={image}
                alt="Post"
                style={{ maxWidth: "100%", height: "200px" }}
                className="img-fluid"
              />
            </div>
          )}

          {/* Additional details */}
          <div className="additional-details">
            {foodQuantity && (
              <p className="mb-0">
                <span className="fw-bold">
                  Food Quantity:
                </span>{" "}
                {foodQuantity}
              </p>
            )}
            {cookedTime && (
              <p className="mb-0">
                <span className="fw-bold">
                  Cooked Time:
                </span>{" "}
                {cookedTime}
              </p>
            )}
            {address && (
              <p className="mb-0">
                <span className="fw-bold">
                  Address:
                </span>{" "}
                {address}
              </p>
            )}
          </div>
        </Card.Body>

        <Card.Footer >
          <Actions post={post} />
        </Card.Footer >

      </Card>
    </Container>
  );
}
