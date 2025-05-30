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
import { useLanguage } from "../context/LanguageContext";
import { reports, providers } from "../data/mockData";

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const { t, formatDate } = useLanguage();
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
      pending: {
        bg: "secondary",
        text: t("pending"),
        className: "status-pending",
      },
      reviewed: {
        bg: "info",
        text: t("reviewed"),
        className: "status-reviewed",
      },
      resolved: {
        bg: "success",
        text: t("resolved"),
        className: "status-resolved",
      },
      dismissed: {
        bg: "dark",
        text: t("dismissed"),
        className: "status-dismissed",
      },
    };
    return (
      statusConfig[status] || {
        bg: "secondary",
        text: "Desconocido",
        className: "",
      }
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { bg: "dark", text: t("high") },
      medium: { bg: "secondary", text: t("medium") },
      low: { bg: "info", text: t("low") },
    };
    return priorityConfig[priority] || { bg: "secondary", text: "Normal" };
  };

  if (!isAdmin()) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <i className="bi bi-shield-exclamation fs-1 d-block mb-3 text-danger"></i>
          <h4>{t("accessDenied")}</h4>
          <p>{t("noPermissions")}</p>
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
            {t("adminPanel")}
          </h1>
          <p className="text-muted">
            {t("welcome")}, {user?.name}
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-flag fs-1 accent-alamano"></i>
              <h3 className="mt-2 accent-alamano">{stats.totalReports}</h3>
              <p className="text-muted mb-0">{t("totalReports")}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-clock fs-1 accent-secondary-alamano"></i>
              <h3 className="mt-2 accent-secondary-alamano">
                {stats.pendingReports}
              </h3>
              <p className="text-muted mb-0">{t("pending")}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-check-circle fs-1 accent-alamano"></i>
              <h3 className="mt-2 accent-alamano">{stats.resolvedReports}</h3>
              <p className="text-muted mb-0">{t("resolved")}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="text-center">
              <i className="bi bi-people fs-1 accent-alamano"></i>
              <h3 className="mt-2 accent-alamano">{stats.activeProviders}</h3>
              <p className="text-muted mb-0">{t("activeProviders")}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="reports" className="mb-4">
        <Tab
          eventKey="reports"
          title={`${t("reports")} (${stats.totalReports})`}
        >
          <Card className="card-alamano">
            <Card.Header className="bg-light-alamano">
              <h4 className="mb-0">
                <i className="bi bi-flag me-2"></i>
                {t("reportsManagement")}
              </h4>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="table-hover">
                <thead>
                  <tr>
                    <th>{t("date")}</th>
                    <th>{t("provider")}</th>
                    <th>{t("reportedBy")}</th>
                    <th>{t("reason")}</th>
                    <th>{t("priority")}</th>
                    <th>{t("status")}</th>
                    <th>{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsList.map((report) => {
                    const statusBadge = getStatusBadge(report.status);
                    const priorityBadge = getPriorityBadge(report.priority);

                    return (
                      <tr key={report.id}>
                        <td>{formatDate(new Date(report.date))}</td>
                        <td>
                          <strong className="accent-alamano">
                            {report.providerName}
                          </strong>
                        </td>
                        <td>{report.reporterName}</td>
                        <td>{report.reasonText}</td>
                        <td>
                          <Badge bg={priorityBadge.bg}>
                            {priorityBadge.text}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            bg={statusBadge.bg}
                            className={statusBadge.className}
                          >
                            {statusBadge.text}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewReport(report)}
                          >
                            <i className="bi bi-eye me-1"></i>
                            {t("view")}
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
                  <p className="text-muted mt-2">{t("noReportsAvailable")}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab
          eventKey="providers"
          title={`${t("providers")} (${stats.totalProviders})`}
        >
          <Card className="card-alamano">
            <Card.Header className="bg-light-alamano">
              <h4 className="mb-0">
                <i className="bi bi-people me-2"></i>
                {t("providersManagement")}
              </h4>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="table-hover">
                <thead>
                  <tr>
                    <th>{t("provider")}</th>
                    <th>{t("category")}</th>
                    <th>{t("location")}</th>
                    <th>{t("rating")}</th>
                    <th>{t("status")}</th>
                    <th>{t("actions")}</th>
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
                              border: "2px solid var(--alamano-light)",
                            }}
                          />
                          <strong className="accent-alamano">
                            {provider.name}
                          </strong>
                        </div>
                      </td>
                      <td>{t(`categories.${provider.categoryId}`)}</td>
                      <td>{provider.location}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <span className="accent-alamano">
                            {provider.rating.toFixed(1)}
                          </span>
                          <span className="text-muted ms-1">
                            ({provider.reviewCount})
                          </span>
                        </div>
                      </td>
                      <td>
                        <Badge bg={provider.isAvailable ? "success" : "dark"}>
                          {provider.isAvailable ? t("active") : t("inactive")}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          <i className="bi bi-eye me-1"></i>
                          {t("view")}
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <i className="bi bi-pencil me-1"></i>
                          {t("edit")}
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
        <Modal.Header closeButton className="bg-light-alamano">
          <Modal.Title>
            <i className="bi bi-flag me-2 accent-alamano"></i>
            {t("reportDetails")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>{t("date")}:</strong>{" "}
                  {formatDate(new Date(selectedReport.date))}
                </Col>
                <Col md={6}>
                  <strong>{t("reportId")}:</strong>{" "}
                  <span className="accent-alamano">{selectedReport.id}</span>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>{t("reportedProvider")}:</strong>{" "}
                  <span className="accent-alamano">
                    {selectedReport.providerName}
                  </span>
                </Col>
                <Col md={6}>
                  <strong>{t("reportedBy")}:</strong>{" "}
                  {selectedReport.reporterName}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>{t("reason")}:</strong> {selectedReport.reasonText}
                </Col>
                <Col md={6}>
                  <strong>{t("priority")}:</strong>
                  <Badge
                    bg={getPriorityBadge(selectedReport.priority).bg}
                    className="ms-2"
                  >
                    {getPriorityBadge(selectedReport.priority).text}
                  </Badge>
                </Col>
              </Row>

              <div className="mb-3">
                <strong>{t("details")}:</strong>
                <p className="mt-2 p-3 bg-light-alamano rounded">
                  {selectedReport.details}
                </p>
              </div>

              <div className="mb-3">
                <strong>{t("currentStatus")}:</strong>
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
              {t("markAsReviewed")}
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                handleUpdateReportStatus(selectedReport.id, "resolved")
              }
              disabled={selectedReport?.status === "resolved"}
            >
              <i className="bi bi-check-circle me-1"></i>
              {t("resolve")}
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                handleUpdateReportStatus(selectedReport.id, "dismissed")
              }
              disabled={selectedReport?.status === "dismissed"}
            >
              <i className="bi bi-x-circle me-1"></i>
              {t("dismiss")}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboardPage;
