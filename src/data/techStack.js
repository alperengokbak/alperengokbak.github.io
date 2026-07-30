import azure from "../assets/tech-icons/azure.svg";
import aws from "../assets/tech-icons/aws.svg";
import terraform from "../assets/tech-icons/terraform.svg";

import bicep from "../assets/tech-icons/bicep.svg";
import kubernetes from "../assets/tech-icons/kubernetes.svg";
import helm from "../assets/tech-icons/helm.svg";
import docker from "../assets/tech-icons/docker.svg";
import linux from "../assets/tech-icons/linux.svg";
import azuredevops from "../assets/tech-icons/azuredevops.svg";
import githubactions from "../assets/tech-icons/githubactions.svg";
import git from "../assets/tech-icons/git.svg";
import python from "../assets/tech-icons/python.svg";
import javascript from "../assets/tech-icons/javascript.svg";
import nodejs from "../assets/tech-icons/nodejs.svg";
import postgresql from "../assets/tech-icons/postgresql.svg";

export const stackSections = [
  {
    title: "Cloud & Infrastructure",
    items: [
      { name: "Azure", icon: azure },
      { name: "AWS", icon: aws },
      { name: "Terraform", icon: terraform },
      { name: "Azure Bicep", icon: bicep },
      { name: "Kubernetes", icon: kubernetes },
      { name: "Helm", icon: helm },
      { name: "Docker", icon: docker },
      { name: "Linux", icon: linux },
    ],
  },
  {
    title: "DevOps & CI/CD",
    items: [
      { name: "Azure DevOps", icon: azuredevops },
      { name: "GitHub Actions", icon: githubactions },
      { name: "Git", icon: git },
    ],
  },
  {
    title: "Development",
    items: [
      { name: "Python", icon: python },
      { name: "JavaScript", icon: javascript },
      { name: "Node.js", icon: nodejs },
      { name: "PostgreSQL", icon: postgresql },
    ],
  },
];
