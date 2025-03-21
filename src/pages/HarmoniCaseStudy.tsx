import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import TableOfContents from "../components/TableOfContents.tsx";
import HarmoniCase from "/assets/HarmoniShowcase1.png";
import ImageWithText from "../components/ImageWithText";
import ImageWithTextFlipped from "../components/ImageWithTextFlipped.tsx";
import HarmoniHjem from "/assets/HarmoniHome.png";
import HarmoniTankevirus from "/assets/HarmoniTankevirus.png";
import HarmoniHumor from "/assets/HarmoniHumor.png";
import HarmoniKart from "/assets/HarmoniKart.png";
import Wireframes from "/assets/HarmoniWireframes.png";
import HarmoniTypo from "/assets/HarmoniTypo.png";
import HarmoniFarger2 from "/assets/HarmoniFarger2.png";
import ShowCase2 from "/assets/HarmoniShowCase2.png";
import FeedbackList from "../components/HarmoniFeedbackList.tsx";
import HarmoniChanges from "../components/HarmoniChangesList.tsx";
import FutureImprovements from "../components/HarmoniForbedringerListe.tsx";
import KeyLearnings from "../components/HarmoniKeyLearnings.tsx";
import FeaturesList from "../components/HarmoniFeaturesList.tsx";
import SupportFeaturesList from "../components/HarmoniSupportFeatures.tsx";

const HarmoniCaseStudy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="case-study" id="Harmoni">
      {/* Full-width container */}
      <div className="case-study-fullwidth">
        {/* Constrained container for text */}
        <div className="case-study-content">
          <TableOfContents />
          <header className="mb-1">
            <div className="title-container">
              <h1 className="display-large">
                {t("harmoniCaseStudy.header.title")}
              </h1>
              <p className="display-sub text-muted">
                {t("harmoniCaseStudy.header.subtitle")}
              </p>
              <div className="portfolio-line mt-4"></div>
              <img
                className="mt-5"
                src={HarmoniCase}
                style={{ width: "100%" }}
                alt={t("harmoniCaseStudy.header.title")}
              />
            </div>
          </header>

          <section id="intro" className="case-section">
            <div className="case-section-intro">
              <h2>{t("harmoniCaseStudy.intro.heading")}</h2>
              <p>{t("harmoniCaseStudy.intro.text")}</p>
              <div className="project-info">
                <div className="info-block">
                  <h4>
                    {t("harmoniCaseStudy.projectInfo.groupProject.title")}
                  </h4>
                  <p>
                    {t("harmoniCaseStudy.projectInfo.groupProject.description")}
                  </p>
                </div>
                <div className="info-block">
                  <h4>{t("harmoniCaseStudy.projectInfo.role.title")}</h4>
                  <p>{t("harmoniCaseStudy.projectInfo.role.description")}</p>
                </div>
                <div className="info-block">
                  <h4>{t("harmoniCaseStudy.projectInfo.timeline.title")}</h4>
                  <p>
                    {t("harmoniCaseStudy.projectInfo.timeline.description")}
                  </p>
                </div>
                <div className="info-block">
                  <h4>{t("harmoniCaseStudy.projectInfo.tools.title")}</h4>
                  <p>{t("harmoniCaseStudy.projectInfo.tools.description")}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="summary" className="case-section w-100">
            <Container fluid>
              <div className="case-section-content w-75">
                <h3>{t("harmoniCaseStudy.summary.heading")}</h3>
                <p>{t("harmoniCaseStudy.summary.text")}</p>
              </div>
              <p
                className="mt-5 d-flex justify-content-lg-end justify-content-left"
                id="problemstilling"
              >
                {t("harmoniCaseStudy.summary.quote")}
              </p>
              <div className="mt-5 d-flex justify-content-lg-end justify-content-left">
                <p className="w-75" id="case-section-content-right">
                  {t("harmoniCaseStudy.summary.description")}
                </p>
              </div>
              <div className="show-case">
                <ImageWithTextFlipped
                  title={t("harmoniCaseStudy.design.col1.title")}
                  text={t("harmoniCaseStudy.design.col1.text")}
                  imageUrl={HarmoniHjem}
                  alt={t("harmoniCaseStudy.design.col1.title")}
                />
              </div>
              <div className="show-case">
                <ImageWithText
                  title={t("harmoniCaseStudy.design.col2.title")}
                  text={t("harmoniCaseStudy.design.col2.text")}
                  imageUrl={HarmoniTankevirus}
                  alt={t("harmoniCaseStudy.design.col2.title")}
                />
              </div>
              <div className="show-case">
                <ImageWithTextFlipped
                  title={t("harmoniCaseStudy.design.col1.title")}
                  text={t("harmoniCaseStudy.design.col1.text")}
                  imageUrl={HarmoniHumor}
                  alt={t("harmoniCaseStudy.design.col1.title")}
                />
              </div>
            </Container>
          </section>

          <section id="Ws" className="case-section">
            <Container fluid>
              <div className="case-section-intro mb-5">
                <h2>{t("harmoniCaseStudy.Ws.heading")}</h2>
                <p>{t("harmoniCaseStudy.Ws.text")}</p>
              </div>
              <h3 className="mb-4">{t("harmoniCaseStudy.Ws.subHeading")}</h3>
              <Row className="g-5">
                <Col lg={4} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.Ws.col1.title")}</h4>
                  <p>{t("harmoniCaseStudy.Ws.col1.text1")}</p>
                  <p>{t("harmoniCaseStudy.Ws.col1.text2")}</p>
                </Col>
                <Col lg={4} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.Ws.col2.title")}</h4>
                  <p>
                    <Trans i18nKey="harmoniCaseStudy.Ws.col2.text1">
                      <strong>Harmoni</strong>
                    </Trans>
                  </p>

                  <p>{t("harmoniCaseStudy.Ws.col2.text2")}</p>
                </Col>
                <Col lg={4} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.Ws.col3.title")}</h4>
                  <p>
                    <Trans i18nKey="harmoniCaseStudy.Ws.col3.text1"></Trans>
                  </p>
                  <p>
                    <Trans i18nKey="harmoniCaseStudy.Ws.col3.text2"></Trans>
                  </p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="define" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("harmoniCaseStudy.define.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.define.col1.title")}</h4>
                  <p>{t("harmoniCaseStudy.define.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.define.col2.title")}</h4>
                  <p>{t("harmoniCaseStudy.define.col2.text")}</p>
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.define.col3.title")}</h4>
                  <p>{t("harmoniCaseStudy.define.col3.text")}</p>
                  <FeaturesList />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.define.col4.title")}</h4>
                  <p>{t("harmoniCaseStudy.define.col4.text")}</p>
                  <SupportFeaturesList />
                </Col>
              </Row>
            </Container>
          </section>

          <section id="design" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("harmoniCaseStudy.design.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.design.col1.title")}</h4>
                  <p>{t("harmoniCaseStudy.design.col1.text")}</p>
                  <img
                    src={HarmoniKart}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("harmoniCaseStudy.design.col1.title")}
                  />
                </Col>
                <Col md={6} sm={12}>
                  <h4>{t("harmoniCaseStudy.design.col2.title")}</h4>
                  <p>{t("harmoniCaseStudy.design.col2.text")}</p>

                  <img
                    src={Wireframes}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("harmoniCaseStudy.design.col2.title")}
                  />
                </Col>
              </Row>
            </Container>
          </section>

          <section id="testing" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("harmoniCaseStudy.testing.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.testing.col1.title")}</h4>
                  <p>{t("harmoniCaseStudy.testing.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.testing.col2.title")}</h4>
                  <p>{t("harmoniCaseStudy.testing.col2.text")}</p>
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.testing.col3.title")}</h4>
                  <p>{t("harmoniCaseStudy.testing.col3.text")}</p>
                  <FeedbackList />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.testing.col4.title")}</h4>
                  <p>{t("harmoniCaseStudy.testing.col4.text")}</p>
                  <HarmoniChanges />
                </Col>
              </Row>
            </Container>
          </section>

          <section id="final-ui" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("harmoniCaseStudy.finalUI.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.finalUI.col1.title")}</h4>
                  <p>{t("harmoniCaseStudy.finalUI.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.finalUI.col2.title")}</h4>
                  <p>{t("harmoniCaseStudy.finalUI.col2.text")}</p>
                </Col>
              </Row>
              <Row className="g-5 text-center mb-5">
                <Col lg={12} md={12} sm={12}>
                  <img
                    src={ShowCase2}
                    style={{ width: "100%" }}
                    alt="Final UI"
                  />
                </Col>
              </Row>
              <Row className="g-5 mb-5">
                <Col lg={6} md={12} sm={12}>
                  <h4 className="mb-4">
                    {t("harmoniCaseStudy.finalUI.col3.title")}
                  </h4>
                  <p>{t("harmoniCaseStudy.finalUI.col3.text")}</p>
                  <img
                    src={HarmoniFarger2}
                    style={{ width: "100%" }}
                    alt="Final UI"
                  />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4 className="mb-4">
                    {t("harmoniCaseStudy.finalUI.col4.title")}
                  </h4>
                  <p>{t("harmoniCaseStudy.finalUI.col4.text")}</p>
                  <img
                    src={HarmoniTypo}
                    style={{ width: "100%" }}
                    alt="Final UI"
                  />
                </Col>
              </Row>
              <Row className="g-5 mb-5">
                <Col lg={6} md={12} sm={12}>
                  <h4 className="mb-4">
                    {t("harmoniCaseStudy.finalUI.col5.title")}
                  </h4>
                  <p>{t("harmoniCaseStudy.finalUI.col5.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4 className="mb-4">
                    {t("harmoniCaseStudy.finalUI.col6.title")}
                  </h4>
                  <p>{t("harmoniCaseStudy.finalUI.col6.text")}</p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="next-steps" className="case-section">
            <Container fluid>
              <h3 className="mb-4">
                {t("harmoniCaseStudy.nextSteps.heading")}
              </h3>
              <Row className="g-5">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.nextSteps.col1.title")}</h4>
                  <p>{t("harmoniCaseStudy.nextSteps.col1.text")}</p>
                  <KeyLearnings />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("harmoniCaseStudy.nextSteps.col2.title")}</h4>
                  <p>{t("harmoniCaseStudy.nextSteps.col2.text")}</p>
                  <FutureImprovements />
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HarmoniCaseStudy;
