function loadCertificates() {
    const certificates_element = document.getElementById("certifications");

    for(const certificate of Object.values(CERTIFICATES)) {
        html = `        
            <a href="${certificate.url}">
                <div class="card-purple h-100 d-flex flex-column p-3 border border-dark rounded-3">
                    <div class="row g-0">
                        <div class="col-3 d-flex align-items-center justify-content-center">
                            <img src="${certificate.logo_url}" class="logo-small" alt="logo">
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
                                    <!--
                                    <div class="d-flex w-100 justify-content-end">
                                        <button class="btn btn-outline-light" onclick="window.location.href="${certificate.url}">Show</button>
                                    </div>
                                    -->

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        certificates_element.innerHTML += html;
    }
}

