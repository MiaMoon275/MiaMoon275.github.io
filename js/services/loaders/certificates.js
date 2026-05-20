function loadCertificates() {
    const container = document.getElementById("certifications");


    for(const certificate of Object.values(CERTIFICATES)) {
        let icon = "bi-award-fill";
        if (certificate.icon) {
            icon = certificate.icon;
        }

        html = `        
            <a href="${certificate.url}">
                <div class="card-purple h-100 d-flex flex-column p-3 border border-dark rounded-3">
                    <div class="row g-0">
                    
                        <div class="col-3 d-flex align-items-center justify-content-center">
                            ${certificate.logo_url ? `
                                <img src="${certificate.logo_url}" class="logo-small" alt="logo">
                            `: `
                                </i><i class="bi ${icon} certificate-icon"></i>
                            `}
                        </div>

                        <div class="col-9">
                            <div class="card-header fs-6 lh-1">
                                ${certificate.name}
                            </div>
                            <div class="card-body fw-bold pt-0">
                                <div class="text-purple-3">
                                    ${certificate.issuer}
                                </div>
                                <div class="d-flex">
                                    <div>
                                        ${certificate.issued_year}
                                    </div>
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

