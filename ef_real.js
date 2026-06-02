const buildingPanels = [
    { 
        id: 'buildingA', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-14&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingB', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-20&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingC', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-26&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingD', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-28&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingE', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-31&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingRIE', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-37&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingME', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-34&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingAE', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-40&__feature.dashboardScene=true' 
    },
    { 
        id: 'buildingPP', 
        baseUrl: 'https://grafana.energysolutionsystems.com/d-solo/adzz96j/energy?orgId=1&timezone=browser&refresh=5s&theme=light&panelId=panel-23&__feature.dashboardScene=true' 
    }
];

async function getEmissionFactor() {
    const res = await fetch('https://emission-api.projectelectrical37.workers.dev/');
    const data = await res.json();
    return parseFloat(data.value) || 0.475;
}

async function refreshAllIframes() {
    const ef = await getEmissionFactor();

    const displayEl = document.getElementById('displayEF');
    if (displayEl) displayEl.textContent = ef;

    buildingPanels.forEach(panel => {
        const iframeElement = document.getElementById(panel.id);
        if (iframeElement) {
            iframeElement.src = `${panel.baseUrl}&var-emission_factor=${ef}`;
        }
    });
}

window.addEventListener('load', refreshAllIframes);
window.addEventListener('pageshow', () => refreshAllIframes());
window.addEventListener('focus', refreshAllIframes);