import React from "react";
import { Row, Col } from "react-bootstrap";

interface ImageWithTextProps {
  title: string;
  text: string;
  imageUrl: string;
  alt: string;
}

const ImageWithTextFlipped: React.FC<ImageWithTextProps> = ({
  title,
  text,
  imageUrl,
  alt,
}) => {
  return (
    <section className="image-with-text-section">
      <Row className="align-items-center">
        {/* Text column: on mobile, order 1; on md+, order 2 */}
        <Col md={6} sm={12} className="order-1 order-md-2 mb-4">
          <h3>{title}</h3>
          <p>{text}</p>
        </Col>
        {/* Image column: on mobile, order 2; on md+, order 1 */}
        <Col
          md={6}
          sm={12}
          className="order-2 order-md-1 text-center text-md-start"
        >
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

export default ImageWithTextFlipped;
