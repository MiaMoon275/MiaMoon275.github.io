class ProjectCard {
    constructor(project) {
        this.project = project;
    }

    html() {
        return `
            <div class="card-project mb-4 p-3 border border-dark rounded-3">
                <div class="card-body">

                    <!-- HEADER -->
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <!-- TITLE -->
                            <h5 class="mb-0 fw-bold fs-5">
                                ${this.project.name}
                            </h5>

                        </div>

                        <!-- BADGE -->
                        ${this.project.badge?.trim() ? `
                            <span class="badge bg-dark align-self-center fs-6">
                                ${this.project.badge}
                            </span>
                        ` : ""}                        

                    </div>
                    <!-- DESCRIPTION -->
                    ${this.project.description?.trim() ? `
                        <div class="text-secondary fs-6 mt-2">
                            <span class="text-purple-2">(</span>
                            <span>${this.project.description}</span>
                            <span class="text-purple-2">)</span>
                        </div>
                    ` : ""}

                    <!-- TOOLS -->
                    ${this.project.tools ? `
                        <div class="mb-2 text-small">
                            
                            <i class="bi bi-gear-fill text-purple-1"></i>
                            ${this.project.tools.map(tool => `
                                <span class="badge bg-dark text-secondary me-1 mb-1">
                                    ${tool.trim()}
                                </span>
                                `).join("")}
                        </div>
                        `: ""}

                    <!-- COMPANY -->
                    ${this.project.company ? `                        
                        <div class="mb-1 text-small">
                            <i class="bi bi-building-fill text-purple-1"></i>
                            <span class="text-secondary small">
                                ${this.project.company}
                            </span>
                            ${this.project.location ? `
                                <i class="bi bi-geo-alt-fill text-purple-1 ms-2"></i>
                                <span class="text-secondary small">
                                    ${this.project.location}
                                </span>
                                `: ""}

                        </div>
                        `: ""}

                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">

                    <!-- LEFT: Contributions -->
                    <span class="text-purple-1 text-small">
                        <i class="bi bi-activity text-purple-1"></i>
                        ${this.project.contributions ?? 0} 
                        <span class="text-secondary">contributions</span>
                    </span>
                    
                    ${this.project.readme ? `
                        <!-- RIGHT: Readme Link -->
                        <a href="#" class="btn btn-sm text-small btn-outline-light">
                            View README
                        </a>
                    `: ""}

                </div>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const card = new ProjectCard(CURRENT_PROJECT);
    document.getElementById("currentProject").innerHTML = card.html();
});
