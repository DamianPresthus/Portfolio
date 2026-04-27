import React from "react";
import { Row, Col } from "react-bootstrap";

interface ImageWithTextProps {
  title: string;
  text: string;
  imageUrl: string;
  alt: string;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({
  title,
  text,
  imageUrl,
  alt,
}) => {
  return (
    <section className="image-with-text-section">
      <Row className="align-items-center">
        {/* Left Column: Text */}
        <Col md={6} sm={12} className="mb-4">
          <h3>{title}</h3>
          <p>{text}</p>
        </Col>

        {/* Right Column: Image */}
        <Col md={6} sm={12} className="text-center">
          <img
            src={imageUrl}
            alt={alt}
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default ImageWithText;
