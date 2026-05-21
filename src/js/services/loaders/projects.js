import { PROJECTS } from "../../../../config/projects.config.js";
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
                    <div class="d-flex align-items-center justify-content-center fs-8 h-100 w-100">
                        <i class="bi bi-window-sidebar fs-1 text-secondary"></i>
                    </div>
                </div>
        `;
    }

    getScheduleHtml (screenMdUp) {
        const start = new Date(this.project.start)
        const end = new Date(this.project.end)
        const now = new Date()

        const total = end.getTime() - start.getTime();
        const current = now.getTime() - start.getTime();

        let progress = (current / total) * 100;
        progress = Math.max(0, Math.min(progress, 100));

        let progressIcon;
        const started = now.getTime() >= start.getTime();
        const ended = now.getTime() >= end.getTime();

        if (!started) progressIcon = "bi-calendar2-event";
        else if (progress >= 100) progressIcon = "bi-check-all";
        else if (progress > 66) progressIcon = "bi-hourglass-bottom";
        else if (progress > 33) progressIcon = "bi-hourglass-split";
        else progressIcon = "bi-hourglass-top";

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
                            <i class="bi ${progressIcon} text-purple-1"></i>
                        </span>
                        <span class="text-end">${MONTHS_NAMES[end.getMonth()]}
                            <span class="text-purple-1"> / </span> ${end.getFullYear()}
                        </span>
                    </div>
                `
            } else if(!started) {
                return `                    
                    <div class="d-flex justify-content-center mb-3">
                        <div>
                            <i class="bi ${progressIcon} text-purple-1 me-2"></i>
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
                    <div class="d-flex justify-content-center mb-3">
                        <div>
                            <i class="bi ${progressIcon} text-purple-1 me-2"></i>
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

    html(screenMdUp) {
        return `
            <div class="card-purple d-flex flex-column w-100 h-100 rounded-top-5 rounded-bottom-2 overflow-hidden">
                
<!-- PREVIEW -->

                ${this.getPreviewHtml()}

<!-- NAME -->

                <div class="card-header d-flex justify-content-center text-center fs-6 pb-3">
                    <i class="bi bi-chevron-left text-purple-3"></i>
                    ${this.project.name}
                    <span class="text-purple-3 fw-light d-inline-block" style="transform: translate(6px, -1px);">/</span>
                    <i class="bi bi-chevron-right text-purple-3 fw-bold"></i>
                </div>

                <div class="card-body flex-grow-1">
                
<!-- DESCRIPTION -->

                    <div class="text-secondary text-center fs-8 mb-2">
                        ${this.project.description}
                    </div>

                </div>
                <div class="card-footer">

<!-- TOOLS -->

                    <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
                        ${this.project.tools ? `
                            ${this.project.tools.map(tool => `
                                <span class="badge bg-dark text-secondary">
                                    ${tool.trim()}
                                </span>
                            `).join("")}
                        ` : ""}
                    </div>

<!-- SCHEDULE -->

                    ${this.getScheduleHtml(screenMdUp)}

<!-- COMPANY & LOCATION -->

                    <div class="d-flex flex-wrap justify-content-center gap-2 fs-8 mt-3">
                        ${this.project.company ? `
                            <div>
                                <i class="bi bi-building-fill text-purple-1"></i>
                                <span class="text-secondary me-2">
                                    ${this.project.company}
                                </span>
                            </div>
                        `: ""}
                        ${this.project.location ? `
                        <div>
                            <i class="bi bi-geo-alt-fill text-purple-1 me-2"></i>
                            <span class="text-secondary">
                                ${this.project.location}
                            </span>
                        </div>
                        `: ""}

                    </div>
                </div>
            </div
        </div>
            `
    }
}

export function loadProjects(screenMdUp) {
    const container = document.getElementById("projects");

    container.innerHTML = ""
    let html = ""

    PROJECTS.forEach((project, index) => {
        
        const card = new ProjectCard(project);
        const cardsPerPage = 2;
        let extraClasses = ""
        let colCount = 1;
        colCount = screenMdUp ? colCount = cardsPerPage : 1
        let colWidth = 12;

        colWidth = Math.floor(12 / colCount)
        colWidth = Math.max(1, Math.min(colWidth, 12));

        // Neue Carousel-Seite öffnen
        if (index % colCount === 0) {
            
            if(index == 0) {
                extraClasses = "active";
            }

            html += `
                <div class="carousel-item ${extraClasses} h-100">
                    <div class="container p-0 h-100">
                        <div class="row h-100">
            `;
        }

        if ((cardsPerPage % 2 != 0 && array.length - index) == 1) {
            colWidth = 12
        }

        // Card hinzufügen
        html += `
                            <div class="col-md-${colWidth} d-flex align-items-stretch">
                                <div class="ps-2 pe-2 ps-md-0 pe-ms-0">
                                    ${card.html()}
                                </div>
                            </div>
        `;

    
        // Carousel-Seite schließen
        if (index % colCount === colCount - 1 || index === PROJECTS.length - 1) {
            html += `
                        </div>
                    </div>
                </div>
            `;
        }
    })

    container.innerHTML += html;
    const elCarousel = document.querySelector('#project-carousel');
    const carousel = new bootstrap.Carousel(elCarousel, {
        interval: 10000,
        touch: true,
        pause: false
    });

    elCarousel.addEventListener("touchstart", () => {
        carousel.pause();
    });

    // document.getElementById("btn-project-prev").addEventListener("click", () => {
    //     carousel.pause();
    // });

    // document.getElementById("btn-project-next").addEventListener("click", () => {
    //     carousel.pause();
    // });

    if(!screenMdUp) {
        carousel.cycle();
    }
}
