import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  special?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  alt,
}) => {
  return (
    <div
      className="card project-card mb-3 border-0 shadow"
      style={{
        borderRadius: "24px",
        background: "#ffffff",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div className="p-4">
        <h3>{title}</h3>
        <p className="mb-0 header-subtitle">{description}</p>
      </div>

      <img
        src={imageUrl}
        alt={alt}
        className="img-fluid custom-img project-img"
        style={{
          width: "100%",
          objectFit: "cover",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      />
    </div>
  );
};

export default ProjectCard;
