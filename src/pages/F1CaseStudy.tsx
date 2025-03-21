import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TOCF1 from "../components/TOCF1.tsx";

import F1Drivers from "/assets/F1Drivers.png";
import F1Teams from "/assets/F1Teams.png";

import F1Event from "/assets/F1Event.png";
import F1Races from "/assets/F1Races.png";
import FeaturesList from "../components/F1FeaturesList.tsx";
import { useTranslation } from "react-i18next";

const F1CaseStudy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="case-study" id="intro">
      <div className="case-study-fullwidth">
        <div className="case-study-content">
          <TOCF1 />
          <header className="mb-1">
            <div className="title-container">
              <h1 className="display-large">{t("F1CaseStudy.header.title")}</h1>
              <p className="display-sub text-muted">
                {t("F1CaseStudy.header.subtitle")}
              </p>
              <div className="portfolio-line mt-4"></div>
              <img
                className="mt-5"
                src={F1Teams}
                style={{ width: "100%" }}
                alt={t("F1CaseStudy.header.title")}
              />
            </div>
          </header>
          <section id="intro" className="case-section">
            <div className="case-section-intro">
              <h2>{t("F1CaseStudy.intro.heading")}</h2>
              <p>{t("F1CaseStudy.intro.text")}</p>
              <div className="project-info">
                <div className="info-block">
                  <h4>{t("F1CaseStudy.projectInfo.techStack")}</h4>
                  <p>{t("F1CaseStudy.projectInfo.techStackValue")}</p>
                </div>
                <div className="info-block">
                  <h4>{t("F1CaseStudy.projectInfo.role")}</h4>
                  <p>{t("F1CaseStudy.projectInfo.roleValue")}</p>
                </div>
                <div className="info-block">
                  <h4>{t("F1CaseStudy.projectInfo.timeline")}</h4>
                  <p>{t("F1CaseStudy.projectInfo.timelineValue")}</p>
                </div>
                <div className="info-block">
                  <h4>{t("F1CaseStudy.projectInfo.tools")}</h4>
                  <p>{t("F1CaseStudy.projectInfo.toolsValue")}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="summary" className="case-section w-100">
            <Container fluid>
              <div className="case-section-content w-75">
                <h3>{t("F1CaseStudy.summary.heading")}</h3>
                <p>{t("F1CaseStudy.summary.text")}</p>
              </div>

              <p
                className="mt-5 d-flex justify-content-lg-end justify-content-left"
                id="problemstilling"
              >
                {t("F1CaseStudy.summary.quote")}
              </p>
              <div className="mt-5 d-flex justify-content-lg-end justify-content-left">
                <p className="w-75" id="case-section-content-right">
                  {t("F1CaseStudy.summary.description")}
                </p>
              </div>
              <div className="show-case">
                <Row className="align-items-center">
                  {/* Text Column: on mobile, order 1; on md+, order 2 */}
                  <Col md={6} sm={12} className="order-1 order-md-2 mb-4">
                    <div className="w-75 custom-margin">
                      <h3>{t("F1CaseStudy.showCase.drivers.title")}</h3>
                      <p>{t("F1CaseStudy.showCase.drivers.text")}</p>
                    </div>
                  </Col>
                  {/* Image Column: on mobile, order 2; on md+, order 1 */}
                  <Col
                    md={6}
                    sm={12}
                    className="order-2 order-md-1 text-center text-md-start"
                  >
                    <img
                      src={F1Drivers}
                      alt={t("F1CaseStudy.showCase.drivers.imageAlt")}
                      className="img-fluid"
                      style={{ maxWidth: "600px" }}
                    />
                  </Col>
                </Row>
              </div>

              <div className="show-case" >
                <Row className="align-items-center">
                  {/* Left Column: Text */}
                  <Col md={6} sm={12} className="mb-4">
                    <div className="w-75">
                      <h3>{t("F1CaseStudy.showCase.event.title")}</h3>
                      <p>{t("F1CaseStudy.showCase.event.text")}</p>
                    </div>
                  </Col>
                  {/* Right Column: Image */}
                  <Col md={6} sm={12} className="text-center">
                    <img
                      src={F1Event}
                      alt={t("F1CaseStudy.showCase.event.imageAlt")}
                      className="img-fluid"
                      style={{ maxWidth: "600px" }}
                    />
                  </Col>
                </Row>
              </div>

              <div className="show-case">
                <Row className="align-items-center">
                  {/* Text Column: on mobile, order 1; on md+, order 2 */}
                  <Col md={6} sm={12} className="order-1 order-md-2 mb-4">
                    <div className="w-75 custom-margin">
                      <h3>{t("F1CaseStudy.showCase.races.title")}</h3>
                      <p>{t("F1CaseStudy.showCase.races.text")}</p>
                    </div>
                  </Col>
                  {/* Image Column: on mobile, order 2; on md+, order 1 */}
                  <Col
                    md={6}
                    sm={12}
                    className="order-2 order-md-1 text-center text-md-start"
                  >
                    <img
                      src={F1Races}
                      alt={t("F1CaseStudy.showCase.races.imageAlt")}
                      className="img-fluid"
                      style={{ maxWidth: "600px" }}
                    />
                  </Col>
                </Row>
              </div>
            </Container>
          </section>

          <section id="TekniskLøsning" className="case-section">
            <Container fluid>
              <div className="case-section-intro mb-5">
                <h2>{t("F1CaseStudy.technicalSolution.heading")}</h2>
                <p>{t("F1CaseStudy.technicalSolution.text")}</p>
              </div>

              <h3 className="mb-4">
                {t("F1CaseStudy.technicalSolution.backendHeading")}
              </h3>

              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.technicalSolution.col1.title")}</h4>
                  <p>{t("F1CaseStudy.technicalSolution.col1.text1")}</p>
                  <p>{t("F1CaseStudy.technicalSolution.col1.text2")}</p>
                  <p>{t("F1CaseStudy.technicalSolution.col1.text3")}</p>
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.technicalSolution.col1.title")}</h4>
                  <FeaturesList />
                </Col>
              </Row>
            </Container>
          </section>

          <section id="define" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("F1CaseStudy.frontend.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.frontend.col1.title")}</h4>
                  <p>{t("F1CaseStudy.frontend.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4> {t("F1CaseStudy.frontend.col2.title")}</h4>
                  <p>{t("F1CaseStudy.frontend.col2.text")}</p>
                  <p></p>
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4> {t("F1CaseStudy.frontend.row2.col1.title")}</h4>
                  <p>{t("F1CaseStudy.frontend.row2.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.frontend.row2.col2.title")}</h4>
                  <p>{t("F1CaseStudy.frontend.row2.col2.text")}</p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="design" className="case-section">
            <Container fluid>
              <h3 className="mb-4">
                {t("F1CaseStudy.universalDesign.heading")}
              </h3>

              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.universalDesign.row1.col1.title")}</h4>
                  <p className="mb-5">
                    {t("F1CaseStudy.universalDesign.row1.col1.text")}
                  </p>
                </Col>

                <Col md={6} sm={12}>
                  <h4>{t("F1CaseStudy.universalDesign.row1.col2.title")}</h4>
                  <p className="mb-5">
                    {t("F1CaseStudy.universalDesign.row1.col2.text")}
                  </p>
                </Col>
              </Row>

              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.universalDesign.row2.col1.title")}</h4>
                  <p className="mb-5">
                    {t("F1CaseStudy.universalDesign.row2.col1.text")}
                  </p>
                </Col>

                <Col md={6} sm={12}>
                  <h4>{t("F1CaseStudy.universalDesign.row2.col2.title")}</h4>
                  <p className="mb-5">
                    {t("F1CaseStudy.universalDesign.row2.col2.text")}
                  </p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="testing" className="case-section">
            <Container fluid>
              <h3 className="mb-4">
                {t("F1CaseStudy.learningAndDevelopment.heading")}
              </h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.learningAndDevelopment.col1.title")}</h4>
                  <p>{t("F1CaseStudy.learningAndDevelopment.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("F1CaseStudy.learningAndDevelopment.col2.title")}</h4>
                  <p>{t("F1CaseStudy.learningAndDevelopment.col2.text")}</p>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </div>
  );
};

export default F1CaseStudy;
