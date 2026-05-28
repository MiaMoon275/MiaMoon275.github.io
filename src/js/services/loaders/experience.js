import { MY_TECHS, MY_SKILLS } from "../../../../config/user.config.js";

function generateExp(elementId, arr) {
    let html = ""

    Object.entries(arr).forEach(([name, percentage]) => {
        html += `
            <div>
                <div class="d-flex">
                    <span class="fs-7 mb-1">${name}</span>
                    <span class="ms-auto">${percentage} %</span>
                </div>
                <div class="progress mb-3" role="progressbar"
                        aria-label="Basic example" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${percentage}%"></div>
                </div>
            </div>
        `
    })
    document.getElementById(elementId).innerHTML = html;
}


export function loadExperience() {
    generateExp("exp-tech", MY_SKILLS);
}
