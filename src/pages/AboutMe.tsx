import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import profileImage from "/assets/proffil.jpg";
import IMG from "/assets/IMG.png";

const AboutMe: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="case-study">
      {/* Full-width container */}
      <div className="case-study-fullwidth">
        {/* Constrained container for text */}
        <div className="case-study-content">
          <header className="mb-1">
            <div className="title-container">
              <h1 className="display-large">{t("aboutMe.header.title")}</h1>
              <p className="display-sub text-muted">
                {t("aboutMe.header.subtitle")}
              </p>
              <div className="portfolio-line mt-4 mb-4"></div>
            </div>
          </header>
          <section className="image-with-text-section">
            <Row className="">
              {/* Left Column: Text */}
              <Col md={6} sm={12} className="mb-4">
                <h3></h3>
                <p>
                  <Trans i18nKey="aboutMe.intro.paragraph1"></Trans>
                </p>
                <p>{t("aboutMe.intro.paragraph2")}</p>
                <p>{t("aboutMe.intro.paragraph3")}</p>
                <div className="project-info ">
                  <div className="info-block ">
                    <h4>{t("aboutMe.projectInfo.role.title")}</h4>
                    <p>{t("aboutMe.projectInfo.role.value")}</p>
                  </div>

                  <div className="info-block">
                    <h4>{t("aboutMe.projectInfo.education.title")}</h4>
                    <p>{t("aboutMe.projectInfo.education.value")}</p>
                  </div>

                  <div className="info-block">
                    <h4>{t("aboutMe.projectInfo.skills.title")}</h4>
                    <p>{t("aboutMe.projectInfo.skills.value")}</p>
                  </div>

                  <div className="info-block">
                    <h4></h4>
                    <p> </p>
                  </div>
                </div>
              </Col>

              {/* Right Column: Image */}
              <Col md={6} sm={12} className="text-center">
                <img
                  src={profileImage}
                  alt="Profil bilde"
                  className="img-fluid"
                  style={{ maxWidth: "300px" }}
                />
              </Col>
            </Row>
          </section>

          <section id="Erfaring" className="case-section">
            <Container fluid>
              <div className="case-section-intro mb-4">
                <h2>{t("aboutMe.experience.heading")}</h2>
                <p style={{ maxWidth: "500px" }}></p>
              </div>

              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.experience.jobs.position")}</h4>
                  <p>{t("aboutMe.experience.jobs.description")}</p>
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.experience.jobs.position2")}</h4>
                  <p>{t("aboutMe.experience.jobs.description2")}</p>
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.experience.jobs.position3")}</h4>
                  <p>{t("aboutMe.experience.jobs.description3")}</p>
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <h4></h4>
                  <p></p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="Utdanning" className="case-section">
            <Container fluid>
              <div className="case-section-intro mb-4">
                <h2>{t("aboutMe.Education.heading")}</h2>
                <p></p>
              </div>

              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.Education.text.title")}</h4>
                  <p>{t("aboutMe.Education.text.description")}</p>
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <h4> </h4>
                  <p></p>
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4> </h4>
                  <p></p>
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <h4></h4>
                  <p></p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="Erfaring" className="case-section">
            <Container fluid>
              <div className="case-section-intro mb-4">
                <h2>{t("aboutMe.Values.heading")}</h2>
                <p style={{ maxWidth: "500px" }}></p>
              </div>

              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.Values.Empathy.title")}</h4>
                  <p>{t("aboutMe.Values.Empathy.text")}</p>
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.Values.Accessibility.title")}</h4>
                  <p>{t("aboutMe.Values.Accessibility.text")}</p>
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.Values.Collaboration.title")}</h4>
                  <p>{t("aboutMe.Values.Collaboration.text")}</p>
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <h4>{t("aboutMe.Values.TeamPlayer.title")}</h4>
                  <p>{t("aboutMe.Values.TeamPlayer.text")}</p>
                </Col>
              </Row>
            </Container>
          </section>
          <div>
            <img
              className="mt-5 "
              src={IMG}
              style={{ width: "80%", display: "block", margin: "auto" }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
