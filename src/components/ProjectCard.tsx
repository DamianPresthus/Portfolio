import React from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  special?: boolean;
  link?: string; // Add a link prop to navigate to case studies
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  alt,
  link = "#", // Default to "#" if no link is provided
}) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        className="card project-card mb-3 border-0 shadow"
        style={{
          borderRadius: "24px",
          background: "#ffffff",
          overflow: "hidden",
          cursor: "pointer", // Indicate it's clickable
        }}
      >
        {/* Text section */}
        <div className="p-4">
          <h3>{title}</h3>
          <p className="mb-0 header-subtitle">{description}</p>
        </div>

        {/* Image section */}
        <img
          src={imageUrl}
          alt={alt}
          className={`img-fluid custom-img project-img`}
          style={{
            width: "100%",
            objectFit: "cover",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        />
      </div>
    </Link>
  );
};

export default ProjectCard;
