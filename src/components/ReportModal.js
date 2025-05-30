"use client";

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";

const ReportModal = ({ show, handleClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reason, details });
    setReason("");
    setDetails("");
    handleClose();
  };

  const reportReasons = [
    { value: "fake", label: t("fakeProfile") },
    { value: "inappropriate", label: t("inappropriateContent") },
    { value: "scam", label: t("scamAttempt") },
    { value: "incorrect", label: t("incorrectInfo") },
    { value: "other", label: t("otherReason") },
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("reportProfileTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t("reportReason")}</Form.Label>
            <Form.Select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">{t("selectReason")}</option>
              {reportReasons.map((reasonOption) => (
                <option key={reasonOption.value} value={reasonOption.value}>
                  {reasonOption.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("reportDetailsField")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t("provideMoreDetails")}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {t("submitReport")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;
