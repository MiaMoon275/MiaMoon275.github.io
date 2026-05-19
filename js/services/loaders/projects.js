const PICTURE_PATH = "content/projects/"
const MONTHS_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

class ProjectCard {
    constructor(project) {
        this.project = project;
    }

    getPreviewHtml() {
        if (this.project.preview === "hidden") {
            return "";
        }

        if (this.project.preview) {
            return `
                <div class="img-wrapper">
                    <img 
                        src="${PICTURE_PATH}${this.project.preview}"
                        class="img-fluid"
                    >
                </div>
            `;
        }

        return `
            <div class="img-wrapper">
                <div class="d-flex align-items-center justify-content-center h-100 w-100">
                    ${this.project.name}
                </div>
            </div>
        `;
    }

    getDateHtml () {
        const start = new Date(this.project.start)
        const end = new Date(this.project.end)
        const now = new Date()

        const total = end.getTime() - start.getTime();
        const current = now.getTime() - start.getTime();

        let progress = (current / total) * 100;
        progress = Math.max(0, Math.min(progress, 100));

        let progress_icon;
        const started = now.getTime() >= start.getTime();
        const ended = now.getTime() >= end.getTime();

        if (!started) progress_icon = "bi-calendar2-event";
        else if (progress >= 100) progress_icon = "bi-check-all";
        else if (progress > 66) progress_icon = "bi-hourglass-bottom";
        else if (progress > 33) progress_icon = "bi-hourglass-split";
        else progress_icon = "bi-hourglass-top";

        if (this.project.start && this.project.end) {
            // render proress bar
            if(started && !ended){
                return `
                    <div class="progress progress-purple mb-3" role="progressbar"
                            aria-label="Basic example" aria-valuenow="${now}" aria-valuemin="${start}" aria-valuemax="${end}">
                        <div class="progress-bar progress-bar-purple" style="width: ${progress}%"></div>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <span>${MONTHS_NAMES[start.getMonth()]}
                            <span class="text-purple-1"> / </span> ${start.getFullYear()}
                        </span>
                        <span>
                            <i class="bi ${progress_icon} text-purple-1"></i>
                        </span>
                        <span class="text-end">${MONTHS_NAMES[end.getMonth()]}
                            <span class="text-purple-1"> / </span> ${end.getFullYear()}
                        </span>
                    </div>
                `
            } else if(!started) {
                return `                    
                    <div class="d-flex justify-content-end mb-3">
                        <div>
                            <i class="bi ${progress_icon} text-purple-1 me-2"></i>
                            ${MONTHS_NAMES[start.getMonth()]} ${start.getFullYear()}
                        </div>
                        <div class="ms-2 me-2">
                        -
                        </div>
                        <div>                            
                            ${MONTHS_NAMES[end.getMonth()]} ${end.getFullYear()}
                        </div>
                    </div>                
                `
            } else {
                return `                    
                    <div class="d-flex justify-content-end mb-3">
                        <div>
                            <i class="bi ${progress_icon} text-purple-1 me-2"></i>
                            ${MONTHS_NAMES[start.getMonth()]} ${start.getFullYear()}
                        </div>
                        <div class="ms-2 me-2">
                        -
                        </div>
                        <div>                            
                            ${MONTHS_NAMES[end.getMonth()]} ${end.getFullYear()}
                        </div>
                    </div>                
                `
            }
        } else {
            return "";
        }
    }

    html() {
        return `
            <div class="card-purple h-100 d-flex flex-column border border-dark rounded-5  overflow-hidden">
                
                ${this.getPreviewHtml()}

                <div class="card-header fs-5 pb-3">
                    <i class="bi bi-chevron-left text-purple-3"></i>
                    ${this.project.name}
                    <span class="text-purple-3 fw-light d-inline-block" style="transform: translate(6px, -1px);">/</span>
                    <i class="bi bi-chevron-right text-purple-3 fw-bold"></i>
                </div>
                
                <div class="card-body">
                
                ${this.getDateHtml()}

                    <div class="text-secondary fs-6">
                        ${this.project.description}
                    </div>
                    <div class="d-flex mb-3">

                        <!-- TOOLS -->
                        ${this.project.tools ? `
                            <div class="mb-2">                                
                                <i class="bi bi-gear-fill text-purple-1"></i>
                                ${this.project.tools.map(tool => `
                                    <span class="badge bg-dark text-secondary me-1 mb-1">
                                        ${tool.trim()}
                                    </span>
                                    `).join("")}
                            </div>
                            `: ""}
                    </div>                    
                    <!-- COMPANY -->
                    ${this.project.company ? `                        
                        <div class="d-flex justify-content-between mb-1 fs-7">
                            <div>
                                <i class="bi bi-building-fill text-purple-1"></i>
                                <span class="text-secondary me-2">
                                    ${this.project.company}
                                </span>
                            </div>
                            ${this.project.location ? `
                                <div>
                                    <i class="bi bi-geo-alt-fill text-purple-1 me-2"></i>
                                    <span class="text-secondary">
                                        ${this.project.location}
                                    </span>
                                </div>
                                `: ""}
                        </div>
                        `: ""}
                </div>
            </div>
            `
    }
}

function loadCurrentProject() {
    container = document.getElementById("current-project");
    card = new ProjectCard(CURRENT_PROJECT);
    container.innerHTML = card.html();   
}

function loadProjects() {
    loadCurrentProject();

    const container = document.getElementById("projects");

    container.innerHTML = ""
    let html = ""

    Object.entries(PROJECTS).forEach(([key, project], index, array) => {


        const card = new ProjectCard(project);
        card.getDateHtml();

        let extra_classes = ""
        let col_count = 1;
        col_count = isDesktopDevice ? col_count = 2 : 1
        let col_width = 12;

        col_width = Math.floor(12 / col_count)
        if (col_width < 1) {
            col_width = 1;
        } else if (col_width > 12) {
            col_width = 12;
        }

        // Neue Carousel-Seite öffnen
        if (index % col_count === 0) {
            
            if(index == 0) {
                extra_classes = "active";
            }

            html += `
                <div class="carousel-item ${extra_classes}">
                    <div class="container h-100" style="width: 92%;">                        
                        <div class="row h-100 align-items-stretch">
            `;
        }

        // Card hinzufügen
        html += `
            <div class="col-md-${col_width}">
                ${card.html()}
            </div>
        `;

    
        // Carousel-Seite schließen
        if (index % col_count === col_count - 1 || index === array.length - 1) {
            html += `
                    </div>
                </div>
            </div>
            `;
        }
    });

    container.innerHTML += html;
}
