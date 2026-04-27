import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom"; // ✅ Moved together
import ProjectCard from "./ProjectCard";
import HarmoniCard from "/assets/HarmoniCard.png";
import MatSparCard from "/assets/MatSparCard.png";
import fristilImage from "/assets/fristil.png";
import F1 from "/assets/F1Card2.png";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  link: string;
}

export const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { lng } = useParams(); // ✅ Correct usage
  const langPrefix = `/${lng ?? "no"}`; // ✅ Use URL param for routing

  const projectList: Project[] = [
    {
      id: 1,
      title: t("projects.harmoni.title"),
      description: t("projects.harmoni.description"),
      imageUrl: HarmoniCard,
      alt: t("projects.harmoni.alt"),
      link: `${langPrefix}/case-study/harmoni`,
    },
    {
      id: 2,
      title: t("projects.matspar.title"),
      description: t("projects.matspar.description"),
      imageUrl: MatSparCard,
      alt: t("projects.matspar.alt"),
      link: `${langPrefix}/case-study/matspar`,
    },
    {
      id: 3,
      title: t("projects.f1.title"),
      description: t("projects.f1.description"),
      imageUrl: F1,
      alt: t("projects.f1.alt"),
      link: `${langPrefix}/case-study/F1`,
    },
    {
      id: 4,
      title: t("projects.Fristil.title"),
      description: t("projects.Fristil.description"),
      imageUrl: fristilImage,
      alt: t("projects.onehub.alt"),
      link: "", // still in progress
    },
  ];

  return (
    <div className="custom-row">
      {projectList.map((project) => (
        <div className="custom-column" key={project.id}>
          {project.link ? (
            <Link to={project.link} style={{ textDecoration: "none" }}>
              <ProjectCard {...project} />
            </Link>
          ) : (
            <div className="wip-container">
              <ProjectCard {...project} />
              <div className="wip-overlay">
                <div className="wip-message">
                  <h4>Work In Progress</h4>
                  <p>Dette prosjektet er under utvikling.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
