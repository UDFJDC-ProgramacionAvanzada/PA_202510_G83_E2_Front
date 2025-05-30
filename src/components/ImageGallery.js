"use client";

import { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";

const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <>
      <Row>
        {images.map((image, index) => (
          <Col xs={6} md={4} key={index} className="mb-3">
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.alt || `${t("image")} ${index + 1}`}
              className="gallery-image"
              onClick={() => handleImageClick(image)}
              style={{ cursor: "pointer" }}
            />
          </Col>
        ))}
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.title || t("image")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.alt || t("enlargedImage")}
              className="img-fluid"
            />
          )}
          {selectedImage?.description && (
            <p className="mt-3">{selectedImage.description}</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageGallery;
