import { PROJECTS } from "../../../../config/projects.config.js";
const PICTURE_PATH = "content/projects/"

class ProjectCard {
    constructor(project) {
        this.project = project;
    }

    getHtml(project) {
        return `
        <div class="card card-project d-flex flex-column flex-shrink-0">
            
            <div class="card-header text-white ">
                <div class="project-name text-truncate purple-gradient-accent">
                    ${this.project.name ? this.project.name : "No name available"}
                </div>
            </div>

            <div class="card-body">
                <div class="container-fluid g-0 h-100">
                    <div class="row g-0 h-100">

                        ${this.project.preview ? `
                        <div class="col-md-4 d-none d-md-block">
                            <div class="img-wrapper">
                                <img src="${PICTURE_PATH}/${this.project.preview}" class="img-fluid">
                            </div>
                        </div>
                        `: ""}

                        <div class="col g-0">
                            <div class="description-wrapper d-flex justify-content-center align-items-center h-100">
                                <p class="project-description">
                                    ${this.project.description ? this.project.description : "No description available"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>

            <div class="card-footer">

                <!-- Tool Badges -->
                <div class="tool-badge-wrapper d-flex justify-content-center align-items-center">
                    <div class="project-tools">
                        ${this.project.tools ?
                            this.project.tools.map(tool => `
                                <span class="tool-badge bg-dark">
                                    ${tool.trim()}
                                </span>
                            `).join("")
                        : ""}
                    </div>
                </div>
            
                <!-- Company -->
                <div class="project-company">
                    <div class="d-flex align-items-end justify-content-center gap-2">
                        <div>
                            <i class="bi bi-building-fill text-light"></i>
                            <span class="me-2">
                                ${this.project.company ?
                                    this.project.company
                                : "Mia E.S. Software Development"}
                            </span>
                        </div>       
                    
                        <div class="d-none d-md-block">
                            <i class="bi bi-geo-alt-fill text-light me-2"></i>
                            <span>
                                ${this.project.location ?
                                    this.project.location
                                : "Germany"}
                            </span>
                        </div>

                    </div>
                </div>

            </div>
            
        </div>
        `       
    }
}

export function loadProjects(screenMdUp) {
    const container = document.getElementById("projects");
    container.innerHTML = ""

    PROJECTS.forEach((project, index) => {
        const card = new ProjectCard(project);

        // Card hinzufügen
        container.innerHTML += card.getHtml();
    });
}
