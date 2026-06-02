const buildingPanels = [
    { 
        id: 'buildingGraph1', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-25&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingGraph2', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adfjlm7/energy-delta?orgId=1&timezone=browser&theme=light&panelId=panel-25&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingGraph3', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-24&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingGraph4', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&theme=light&panelId=panel-7&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingA', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-10&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingB', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-12&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingC', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-14&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingD', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-16&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingE', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-18&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingRIE', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-23&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingME', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adpxl84/carbon-emissions?orgId=1&timezone=browser&showCategory=panel-options-override-3&theme=light&panelId=panel-20&__feature.dashboardScene=true' 
    }
];

function getLast6HoursRange() {
    const now = new Date();
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    return {
        from: sixHoursAgo.getTime(),
        to: now.getTime()
    };
}

async function getEmissionFactor() {
    const res = await fetch('https://emission-api.projectelectrical37.workers.dev/');
    const data = await res.json();
    return parseFloat(data.value) || 0.475;
}

async function refreshAllIframes() {
    const { from, to } = getLast6HoursRange();
    const ef = await getEmissionFactor();

    const displayEl = document.getElementById('displayEF');
    if (displayEl) displayEl.textContent = ef;

    document.getElementById('startTime').value = new Date(from).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }).replace(' ', 'T').slice(0, 16);
    document.getElementById('endTime').value = new Date(to).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }).replace(' ', 'T').slice(0, 16);

    buildingPanels.forEach(panel => {
        const iframeElement = document.getElementById(panel.id);
        if (iframeElement) {
            iframeElement.src = `${panel.baseUrl}&from=${from}&to=${to}&var-emission_factor=${ef}`;
        }
    });
}

window.addEventListener('load', refreshAllIframes);
window.addEventListener('pageshow', () => refreshAllIframes());
window.addEventListener('focus', refreshAllIframes);

async function updateGrafanaIframes() {
    const startInput = document.getElementById('startTime').value;
    const endInput = document.getElementById('endTime').value;
    const ef = await getEmissionFactor();

    if (!startInput || !endInput) {
        alert("กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุดให้ครบถ้วน");
        return;
    }

    const fromTimestamp = new Date(startInput).getTime();
    const toTimestamp = new Date(endInput).getTime();

    buildingPanels.forEach(panel => {
        const iframeElement = document.getElementById(panel.id);
        if (iframeElement) {
            iframeElement.src = `${panel.baseUrl}&from=${fromTimestamp}&to=${toTimestamp}&var-emission_factor=${ef}`;
        }
    });
}