"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Modal,
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { reports, providers } from "../data/mockData";

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const [reportsList, setReportsList] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    totalProviders: 0,
    activeProviders: 0,
  });

  useEffect(() => {
    // Cargar reportes y estadísticas
    setReportsList(reports);

    const totalReports = reports.length;
    const pendingReports = reports.filter((r) => r.status === "pending").length;
    const resolvedReports = reports.filter(
      (r) => r.status === "resolved"
    ).length;
    const totalProviders = providers.length;
    const activeProviders = providers.filter((p) => p.isAvailable).length;

    setStats({
      totalReports,
      pendingReports,
      resolvedReports,
      totalProviders,
      activeProviders,
    });
  }, []);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleUpdateReportStatus = (reportId, newStatus) => {
    setReportsList((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );

    // Actualizar estadísticas
    const updatedReports = reportsList.map((report) =>
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    const pendingReports = updatedReports.filter(
      (r) => r.status === "pending"
    ).length;
    const resolvedReports = updatedReports.filter(
      (r) => r.status === "resolved"
    ).length;

    setStats((prev) => ({
      ...prev,
      pendingReports,
      resolvedReports,
    }));

    setShowReportModal(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: "warning", text: "Pendiente" },
      reviewed: { bg: "info", text: "Revisado" },
      resolved: { bg: "success", text: "Resuelto" },
      dismissed: { bg: "secondary", text: "Desestimado" },
    };
    return statusConfig[status] || { bg: "secondary", text: "Desconocido" };
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { bg: "danger", text: "Alta" },
      medium: { bg: "warning", text: "Media" },
      low: { bg: "info", text: "Baja" },
    };
    return priorityConfig[priority] || { bg: "secondary", text: "Normal" };
  };

  if (!isAdmin()) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <i className="bi bi-shield-exclamation fs-1 d-block mb-3"></i>
          <h4>Acceso Denegado</h4>
          <p>No tienes permisos para acceder al panel de administración.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="accent-alamano">
            <i className="bi bi-shield-check me-2"></i>
            Panel de Administración
          </h1>
          <p className="text-muted">Bienvenido, {user?.name}</p>
        </div>
      </div>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-flag fs-1 accent-alamano"></i>
              <h3 className="mt-2">{stats.totalReports}</h3>
              <p className="text-muted mb-0">Total Reportes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-clock fs-1 text-warning"></i>
              <h3 className="mt-2">{stats.pendingReports}</h3>
              <p className="text-muted mb-0">Pendientes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-check-circle fs-1 text-success"></i>
              <h3 className="mt-2">{stats.resolvedReports}</h3>
              <p className="text-muted mb-0">Resueltos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-people fs-1 accent-alamano"></i>
              <h3 className="mt-2">{stats.activeProviders}</h3>
              <p className="text-muted mb-0">Proveedores Activos</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="reports" className="mb-4">
        <Tab eventKey="reports" title={`Reportes (${stats.totalReports})`}>
          <Card className="card-alamano">
            <Card.Header>
              <h4 className="mb-0">
                <i className="bi bi-flag me-2"></i>
                Gestión de Reportes
              </h4>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>Reportado por</th>
                    <th>Motivo</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsList.map((report) => {
                    const statusBadge = getStatusBadge(report.status);
                    const priorityBadge = getPriorityBadge(report.priority);

                    return (
                      <tr key={report.id}>
                        <td>{new Date(report.date).toLocaleDateString()}</td>
                        <td>
                          <strong>{report.providerName}</strong>
                        </td>
                        <td>{report.reporterName}</td>
                        <td>{report.reasonText}</td>
                        <td>
                          <Badge bg={priorityBadge.bg}>
                            {priorityBadge.text}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={statusBadge.bg}>{statusBadge.text}</Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewReport(report)}
                          >
                            <i className="bi bi-eye me-1"></i>
                            Ver
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {reportsList.length === 0 && (
                <div className="text-center py-4">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="text-muted mt-2">No hay reportes disponibles</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab
          eventKey="providers"
          title={`Proveedores (${stats.totalProviders})`}
        >
          <Card className="card-alamano">
            <Card.Header>
              <h4 className="mb-0">
                <i className="bi bi-people me-2"></i>
                Gestión de Proveedores
              </h4>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th>Categoría</th>
                    <th>Ubicación</th>
                    <th>Calificación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider) => (
                    <tr key={provider.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              provider.profileImage ||
                              "/assets/images/users/default-avatar.jpg"
                            }
                            alt={provider.name}
                            className="rounded-circle me-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                          />
                          <strong>{provider.name}</strong>
                        </div>
                      </td>
                      <td>{provider.category}</td>
                      <td>{provider.location}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          {provider.rating.toFixed(1)} ({provider.reviewCount})
                        </div>
                      </td>
                      <td>
                        <Badge bg={provider.isAvailable ? "success" : "danger"}>
                          {provider.isAvailable ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          <i className="bi bi-eye me-1"></i>
                          Ver
                        </Button>
                        <Button variant="outline-warning" size="sm">
                          <i className="bi bi-pencil me-1"></i>
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Modal de detalles del reporte */}
      <Modal
        show={showReportModal}
        onHide={() => setShowReportModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-flag me-2"></i>
            Detalles del Reporte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Fecha:</strong>{" "}
                  {new Date(selectedReport.date).toLocaleDateString()}
                </Col>
                <Col md={6}>
                  <strong>ID del Reporte:</strong> {selectedReport.id}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>Proveedor Reportado:</strong>{" "}
                  {selectedReport.providerName}
                </Col>
                <Col md={6}>
                  <strong>Reportado por:</strong> {selectedReport.reporterName}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>Motivo:</strong> {selectedReport.reasonText}
                </Col>
                <Col md={6}>
                  <strong>Prioridad:</strong>
                  <Badge
                    bg={getPriorityBadge(selectedReport.priority).bg}
                    className="ms-2"
                  >
                    {getPriorityBadge(selectedReport.priority).text}
                  </Badge>
                </Col>
              </Row>

              <div className="mb-3">
                <strong>Detalles:</strong>
                <p className="mt-2 p-3 bg-light rounded">
                  {selectedReport.details}
                </p>
              </div>

              <div className="mb-3">
                <strong>Estado Actual:</strong>
                <Badge
                  bg={getStatusBadge(selectedReport.status).bg}
                  className="ms-2"
                >
                  {getStatusBadge(selectedReport.status).text}
                </Badge>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-2">
            <Button
              variant="info"
              onClick={() =>
                handleUpdateReportStatus(selectedReport.id, "reviewed")
              }
              disabled={selectedReport?.status === "reviewed"}
            >
              <i className="bi bi-eye-check me-1"></i>
              Marcar como Revisado
            </Button>
            <Button
              variant="success"
              onClick={() =>
                handleUpdateReportStatus(selectedReport.id, "resolved")
              }
              disabled={selectedReport?.status === "resolved"}
            >
              <i className="bi bi-check-circle me-1"></i>
              Resolver
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                handleUpdateReportStatus(selectedReport.id, "dismissed")
              }
              disabled={selectedReport?.status === "dismissed"}
            >
              <i className="bi bi-x-circle me-1"></i>
              Desestimar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboardPage;
