"use client"

import { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

const ReportModal = ({ show, handleClose, onSubmit }) => {
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ reason, details })
    setReason("")
    setDetails("")
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reportar perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Motivo del reporte</Form.Label>
            <Form.Select value={reason} onChange={(e) => setReason(e.target.value)} required>
              <option value="">Selecciona un motivo</option>
              <option value="fake">Perfil falso</option>
              <option value="inappropriate">Contenido inapropiado</option>
              <option value="scam">Intento de estafa</option>
              <option value="incorrect">Información incorrecta</option>
              <option value="other">Otro motivo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Detalles</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Proporciona más detalles sobre el problema..."
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar reporte
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ReportModal
