"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Table,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, getTestCredentials } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const testCredentials = getTestCredentials();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("completeAllFields"));
      return;
    }

    try {
      setLoading(true);
      const result = await login(email, password);

      if (result.success) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || t("loginError"));
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = (testEmail, testPassword) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={10}>
          <Row>
            <Col md={6}>
              <Card className="card-alamano">
                <Card.Body className="p-4">
                  <h2 className="text-center mb-4 accent-alamano">
                    {t("loginTitle")}
                  </h2>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("email")}</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>{t("password")}</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check type="checkbox" label={t("rememberMe")} />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? t("loggingIn") : t("loginTitle")}
                    </Button>
                  </Form>

                  <div className="text-center mt-3">
                    <Link to="/forgot-password">{t("forgotPassword")}</Link>
                  </div>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p>{t("noAccount")}</p>
                    <Link
                      to="/register"
                      className="btn btn-outline-primary w-100"
                    >
                      {t("register")}
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="card-alamano">
                <Card.Header className="bg-light-alamano">
                  <h5 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    {t("testAccounts")}
                  </h5>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted small mb-3">
                    {t("testAccountsDescription")}
                  </p>

                  <Table size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th>{t("type")}</th>
                        <th>{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong className="text-danger">
                            {t("administrator")}
                          </strong>
                          <br />
                          <small className="text-muted">
                            {t("adminDescription")}
                          </small>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              handleTestLogin(
                                testCredentials.admin.email,
                                testCredentials.admin.password
                              )
                            }
                          >
                            <i className="bi bi-shield-check me-1"></i>
                            {t("use")}
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="accent-alamano">
                            {t("regularUser")}
                          </strong>
                          <br />
                          <small className="text-muted">
                            {t("userDescription")}
                          </small>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              handleTestLogin(
                                testCredentials.user.email,
                                testCredentials.user.password
                              )
                            }
                          >
                            <i className="bi bi-person me-1"></i>
                            {t("use")}
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="accent-secondary-alamano">
                            {t("provider")}
                          </strong>
                          <br />
                          <small className="text-muted">
                            {t("providerDescription")}
                          </small>
                        </td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              handleTestLogin(
                                testCredentials.provider.email,
                                testCredentials.provider.password
                              )
                            }
                          >
                            <i className="bi bi-briefcase me-1"></i>
                            {t("use")}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <Alert variant="info" className="mt-3 mb-0">
                    <small>
                      <i className="bi bi-lightbulb me-1"></i>
                      <strong>{t("tip")}:</strong> {t("tipDescription")}
                    </small>
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
