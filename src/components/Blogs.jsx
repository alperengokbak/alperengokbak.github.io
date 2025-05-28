export default function Blogs({ DockerMedium, kubernetes }) {
  return (
    <>
      <h1 className="blogs-header">Blogs</h1>
      <div className="blogs-containers">
        <a
          target={"_blank"}
          href="https://medium.com/@alperengokbak/what-is-dockerize-and-dockerize-your-project-a-step-by-step-guide-899c48a34df6"
        >
          <div className="blogs-container">
            <img src={DockerMedium} className="blog-image" />
            <h2 className="blog-title">What Is Dockerize And Dockerize Your Project</h2>
            <p className="blog-date">25.12.2021</p>
            <div className="blog-tags">
              <p className="tag">#Docker</p>
              <p className="tag">#Dockerize</p>
              <p className="tag">#Containerization</p>
              <p className="tag">#Python</p>
              <p className="tag">#Docker-Command</p>
              <p className="tag">#Devops</p>
            </div>
            <p className="blog-text">
              This article presents a comprehensive guide to containerizing a basic Flask web application using Docker.
              It emphasizes the advantages of Docker—namely consistency across environments, improved portability, and
              operational efficiency. The walkthrough includes the creation of a Dockerfile, building a Docker image,
              and deploying the application within a containerized environment.
            </p>
          </div>
        </a>
        <a
          target={"_blank"}
          href="https://alperengokbak.medium.com/creating-multi-node-kubernetes-cluster-by-using-kubeadm-tool-53af0faf27a4"
        >
          <div className="blogs-container">
            <img src={kubernetes} className="blog-image" />
            <h2 className="blog-title">Creating multi-node Kubernetes Cluster by using Kubeadm tool</h2>
            <p className="blog-date">18.03.2025</p>
            <div className="blog-tags">
              <p className="tag">#Kubernetes</p>
              <p className="tag">#Kubeadm</p>
              <p className="tag">#Multipass</p>
              <p className="tag">#Kubernetes-Cluster</p>
              <p className="tag">#Containerd</p>
            </div>
            <p className="blog-text">
              This article outlines the process of establishing a multi-node Kubernetes cluster using the kubeadm
              toolkit. It serves as a practical, hands-on approach to understanding Kubernetes architecture by manually
              configuring the control plane and joining worker nodes. The guide walks through system preparation,
              initialization procedures, and post-deployment verification, offering foundational insights into cluster
              orchestration and node interaction.
            </p>
          </div>
        </a>
      </div>
    </>
  );
}
