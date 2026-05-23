import { PROJECTS } from "../../../../config/projects.config.js";
const PICTURE_PATH = "content/projects/"
const MONTHS_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

class ProjectCard {
    constructor(project) {
        this.project = project;
    }

    getHtml(project) {
        return `            
            <div class="card-project flex-shrink-0 rounded-3">
                        
                <div class="card-header">
                    <div class="project-name text-truncate">
                        ${this.project.name ? this.project.name : "No name available"}
                    </div>
                </div>

                <div class="card-body">
                    <div class="container-fluid g-0">
                        <div class="row g-0">

                            ${this.project.preview ? `
                            <div class="col-md-4 d-none d-md-block">
                                <div class="img-wrapper">
                                    <img src="${PICTURE_PATH}/${this.project.preview}" class="img-fluid">
                                </div>
                            </div>
                            `: ""}

                            <div class="col g-0">
                                <div class="description-wrapper">
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
                    <div class="tool-badge-wrapper">
                        <div class="project-tools">
                            ${this.project.tools ?
                                this.project.tools.map(tool => `
                                    <span class="tool-badge bg-dark text-secondary">
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
                                <i class="bi bi-building-fill text-purple-1"></i>
                                <span class="me-2">
                                    ${this.project.company ?
                                        this.project.company
                                    : "Mia E.S. Software Development"}
                                </span>
                            </div>       
                        
                            <div class="d-none d-md-block">
                                <i class="bi bi-geo-alt-fill text-purple-1 me-2"></i>
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
