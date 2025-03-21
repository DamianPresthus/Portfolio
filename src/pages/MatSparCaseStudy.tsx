import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import TOCMatSpar from "../components/TOCMatSpar.tsx";
import MatSparCase from "/assets/MatSparCase.png";
import ImageWithText from "../components/ImageWithText.tsx";
import ImageWithTextFlipped from "../components/ImageWithTextFlipped.tsx";
import Home from "/assets/MatSparHome.png";
import Matplan from "/assets/MatSparMatplan.png";
import LeggTil from "/assets/MatSparLeggTil.png";
import Wireframes from "/assets/MatSparWireframes.png";
import Hovedfunksjoner from "/assets/MatSparFunksjoner.png";
import Antagelser from "/assets/MatSparAntagelser.png";
import PainPoints from "/assets/PainPoints.png";
import Screens1 from "/assets/MatSparScreens1.png";
import Screens2 from "/assets/MatSparScreens2.png";
import Logo from "/assets/MatSparLogo.png";
import Spacing from "/assets/MatSparSpacing.png";
import Dulting from "/assets/MatSparDulting.png";
import CoreFeatures from "../components/matSparCoreFeatures.tsx";

const MatSparCaseStudy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="case-study">
      <div className="case-study-fullwidth">
        <div className="case-study-content">
          <TOCMatSpar />

          <header className="mb-1" id="MatSpar">
            <div className="title-container">
              <h1 className="display-large">
                {t("matSparCaseStudy.header.title")}
              </h1>
              <p className="display-sub text-muted">
                {t("matSparCaseStudy.header.subtitle")}
              </p>
              <div className="portfolio-line mt-4"></div>
              <img
                className="mt-5"
                src={MatSparCase}
                style={{ width: "100%" }}
                alt={t("matSparCaseStudy.header.title")}
              />
            </div>
          </header>

          <section className="case-section">
            <div className="case-section-intro">
              <h2>{t("matSparCaseStudy.intro.heading")}</h2>
              <p>{t("matSparCaseStudy.intro.text")}</p>
              <div className="project-info">
                <div className="info-block">
                  <h4>
                    {t("matSparCaseStudy.projectInfo.groupProject.title")}
                  </h4>
                  <p>
                    {t("matSparCaseStudy.projectInfo.groupProject.description")}
                  </p>
                </div>
                <div className="info-block">
                  <h4>{t("matSparCaseStudy.projectInfo.role.title")}</h4>
                  <p>{t("matSparCaseStudy.projectInfo.role.description")}</p>
                </div>
                <div className="info-block">
                  <h4>{t("matSparCaseStudy.projectInfo.timeline.title")}</h4>
                  <p>
                    {t("matSparCaseStudy.projectInfo.timeline.description")}
                  </p>
                </div>
                <div className="info-block">
                  <h4>{t("matSparCaseStudy.projectInfo.tools.title")}</h4>
                  <p>{t("matSparCaseStudy.projectInfo.tools.description")}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="summary" className="case-section w-100">
            <Container fluid>
              <div className="case-section-content w-75">
                <h3>{t("matSparCaseStudy.summary.heading")}</h3>
                <p>{t("matSparCaseStudy.summary.text")}</p>
              </div>
              <p
                className="mt-5 d-flex justify-content-lg-end justify-content-left"
                id="problemstilling"
              >
                {t("matSparCaseStudy.summary.quote")}
              </p>
              <div className="mt-5 d-flex justify-content-lg-end justify-content-left">
                <p className="w-75" id="case-section-content-right">
                  {t("matSparCaseStudy.summary.description")}
                </p>
              </div>
              <div className="show-case">
                <ImageWithTextFlipped
                  title={t("matSparCaseStudy.showCase.homeScreen.title")}
                  text={t("matSparCaseStudy.showCase.homeScreen.text")}
                  imageUrl={Home}
                  alt={t("matSparCaseStudy.showCase.homeScreen.title")}
                />
              </div>
              <div className="show-case">
                <ImageWithText
                  title={t("matSparCaseStudy.showCase.newMealPlan.title")}
                  text={t("matSparCaseStudy.showCase.newMealPlan.text")}
                  imageUrl={Matplan}
                  alt={t("matSparCaseStudy.showCase.newMealPlan.title")}
                />
              </div>
              <div className="show-case">
                <ImageWithTextFlipped
                  title={t("matSparCaseStudy.showCase.add.title")}
                  text={t("matSparCaseStudy.showCase.add.text")}
                  imageUrl={LeggTil}
                  alt={t("matSparCaseStudy.showCase.add.title")}
                />
              </div>
            </Container>
          </section>

          <section id="research" className="case-section">
            <Container fluid>
              <div className="case-section-intro mb-5">
                <h2>{t("matSparCaseStudy.research.heading")}</h2>
                <p>{t("matSparCaseStudy.research.text")}</p>
              </div>
              <h3 className="mb-4">
                {t("matSparCaseStudy.research.subHeading")}
              </h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.research.col1.title")}</h4>
                  <p>{t("matSparCaseStudy.research.col1.text1")}</p>
                  <p>{t("matSparCaseStudy.research.col1.text2")}</p>
                  <img
                    src={Antagelser}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("matSparCaseStudy.design.col2.title")}
                  />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.research.col2.title")}</h4>

                  <p>{t("matSparCaseStudy.research.col2.text")}</p>
                  <p>{t("matSparCaseStudy.research.col2.text2")}</p>
                  <img
                    src={PainPoints}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("matSparCaseStudy.design.col2.title")}
                  />
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.research.col3.title")}</h4>
                  <p>{t("matSparCaseStudy.research.col3.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.research.col4.title")}</h4>

                  <p>{t("matSparCaseStudy.research.col4.text")}</p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="define" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("matSparCaseStudy.define.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.define.col1.title")}</h4>
                  <p>{t("matSparCaseStudy.define.col1.text")}</p>
                  <p>{t("matSparCaseStudy.define.col1.text2")}</p>
                  <img
                    src={Hovedfunksjoner}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("matSparCaseStudy.design.col2.title")}
                  />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.define.col2.title")}</h4>
                  <p>{t("matSparCaseStudy.define.col2.text")}</p>
                  <img
                    src={Wireframes}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("matSparCaseStudy.design.col2.title")}
                  />
                </Col>
              </Row>
            </Container>
          </section>

          <section id="design" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("matSparCaseStudy.design.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.design.col1.title")}</h4>
                  <p className="mb-5">
                    {t("matSparCaseStudy.design.col1.text")}
                  </p>
                  <img
                    src={Screens1}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("matSparCaseStudy.design.col1.title")}
                  />
                </Col>
                <Col md={6} sm={12}>
                  <h4>{t("matSparCaseStudy.design.col2.title")}</h4>
                  <p className="mb-5">
                    {t("matSparCaseStudy.design.col2.text")}
                  </p>

                  <img
                    src={Screens2}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt={t("matSparCaseStudy.design.col2.title")}
                  />
                </Col>
              </Row>
            </Container>
          </section>

          <section id="testing" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("matSparCaseStudy.testing.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.testing.col1.title")}</h4>
                  <p>{t("matSparCaseStudy.testing.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.testing.col2.title")}</h4>
                  <p>{t("matSparCaseStudy.testing.col2.text")}</p>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="Løsningen" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("matSparCaseStudy.solution.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4 className="mb-4">
                    {t("matSparCaseStudy.solution.features.title")}
                  </h4>
                  <p>{t("matSparCaseStudy.solution.features.text")}</p>
                  <CoreFeatures />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4 className="mb-4">
                    {t("matSparCaseStudy.solution.uvp.title")}
                  </h4>
                  <p>{t("matSparCaseStudy.solution.uvp.text")}</p>
                  <div className="text-center">
                    <img
                      src={Logo}
                      className="img-fluid"
                      style={{ maxWidth: "40%" }}
                      alt="MatSpar Logo"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="UI" className="case-section">
            <Container fluid>
              <h3 className="mb-4">{t("matSparCaseStudy.UI.heading")}</h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.UI.col1.title")}</h4>
                  <p>{t("matSparCaseStudy.UI.col1.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.UI.col2.title")}</h4>
                  <p>{t("matSparCaseStudy.UI.col2.text")}</p>
                </Col>
              </Row>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>Grid System and Visual Consistency</h4>
                  <p className="mb-5">
                    MatSpar uses an 8-point grid system to ensure a harmonious
                    layout and visual consistency. This creates a tidy structure
                    where spacing and sizes are balanced, making navigation
                    predictable and user-friendly. The use of whitespace reduces
                    visual clutter, improves readability, and helps the user
                    focus on the most important content.
                  </p>
                  <img
                    src={Spacing}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt="Screens2"
                  />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>Feedback and Interaction Design</h4>
                  <p className="mb-4">
                    MatSpar employs subtle animations on the "Add" page by
                    suggesting dishes that utilize leftovers from the meal plan,
                    encouraging less food waste and a more varied diet. To make
                    the app intuitive and responsive, we provide immediate
                    feedback when the user adds a dish, so that they understand
                    the previous meal plan will be removed. This creates a more
                    predictable and user-friendly experience.
                  </p>
                  <img
                    src={Dulting}
                    className="img-fluid"
                    style={{ maxWidth: "100%" }}
                    alt="Screens2"
                  />
                </Col>
              </Row>
            </Container>
          </section>

          <section id="next-steps" className="case-section">
            <Container fluid>
              <h3 className="mb-4">
                {t("matSparCaseStudy.nextSteps.heading")}
              </h3>
              <Row className="g-5 mb-3">
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.nextSteps.conclusion.title")}</h4>
                  <p>{t("matSparCaseStudy.nextSteps.conclusion.text")}</p>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <h4>{t("matSparCaseStudy.nextSteps.keyLearnings.title")}</h4>
                  <p>{t("matSparCaseStudy.nextSteps.keyLearnings.text")}</p>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MatSparCaseStudy;
