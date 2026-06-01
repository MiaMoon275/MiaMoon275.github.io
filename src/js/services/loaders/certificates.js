import { CERTIFICATES } from "../../../../config/user.config.js";

export function loadCertificates() {
    const container = document.getElementById("certifications");


    for(const certificate of Object.values(CERTIFICATES)) {
        let icon = "bi-award-fill";
        if (certificate.icon) {
            icon = certificate.icon;
        }

        const html = `        
            <a href="${certificate.url}">
                <div class="card d-flex flex-column p-3 rounded-3">
                    <div class="row g-0">
                    
                        <div class="col-3 d-flex align-items-center justify-content-center">
                            ${certificate.logoUrl ? `
                                <img src="${certificate.logoUrl}" class="logo-small" alt="logo">
                            `: `
                                </i><i class="bi ${icon} text-white icon-big"></i>
                            `}
                        </div>

                        <div class="col-9 fs-8">

                            <div class="card-header fs-6 fw-bold lh-1 ps-0">
                                ${certificate.name}
                            </div>

                            <div class="card-body d-flex justify-content-between fw-bold ps-0 pt-1">

                                <div class="text-white">
                                    ${certificate.issuer}
                                </div>

                                <div class="text-white">
                                    ${certificate.issuedYear}
                                </div>

                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        `

        container.innerHTML += html;
    }
}

