// 1. สร้าง Array เก็บข้อมูลของแต่ละตึก (ใส่ id ของ iframe และ URL พื้นฐาน)
const buildingPanels = [
    { 
        id: 'buildingA', 
        baseUrl: '' 
    },
    { 
        id: 'buildingB', 
        baseUrl: '' 
    },
    { 
        id: 'buildingC', 
        baseUrl: '' 
    },
    { 
        id: 'buildingD', 
        baseUrl: '' 
    },
    { 
        id: 'buildingE', 
        baseUrl: '' 
    },
    { 
        id: 'buildingRIE', 
        baseUrl: '' 
    },
    { 
        id: 'buildingME', 
        baseUrl: '' 
    },
    { 
        id: 'buildingAE', 
        baseUrl: '' 
    },
    { 
        id: 'buildingPP', 
        baseUrl: '' 
    },
    { 
        id: 'buildingGraph1', 
        baseUrl: '' 
    },
    { 
        id: 'buildingGraph2', 
        baseUrl: '' 
    }
    // *** คุณสามารถก๊อปปี้บล็อกด้านบน แล้วแก้ id กับ panelId ให้ครบ 9 ตึกได้เลยครับ ***
];


// เพิ่มส่วนนี้ต่อจาก buildingPanels และก่อน updateGrafanaIframes()

function getLast6HoursRange() {
    const now = new Date();
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    return {
        from: sixHoursAgo.getTime(),
        to: now.getTime()
    };
}

function refreshAllIframes() {
    const { from, to } = getLast6HoursRange();

    document.getElementById('startTime').value = new Date(from).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }).replace(' ', 'T').slice(0, 16);
    document.getElementById('endTime').value = new Date(to).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }).replace(' ', 'T').slice(0, 16);

    buildingPanels.forEach(panel => {
        const iframeElement = document.getElementById(panel.id);
        if (iframeElement) {
            iframeElement.src = `${panel.baseUrl}&from=${from}&to=${to}`;
        }
    });
}

window.addEventListener('load', refreshAllIframes);
window.addEventListener('pageshow', () => refreshAllIframes());

// 2. ฟังก์ชันอัปเดต iframe ทั้งหมดเมื่อกดปุ่ม
function updateGrafanaIframes() {
    const startInput = document.getElementById('startTime').value;
    const endInput = document.getElementById('endTime').value;

    if (!startInput || !endInput) {
        alert("กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุดให้ครบถ้วน");
        return;
    }

    // แปลงเวลาเป็น Timestamp สำหรับ Grafana
    const fromTimestamp = new Date(startInput).getTime();
    const toTimestamp = new Date(endInput).getTime();

    // 3. ใช้ Loop (forEach) เพื่อวนอัปเดตทุกตึกใน Array อัตโนมัติ
    buildingPanels.forEach(panel => {
        const iframeElement = document.getElementById(panel.id);
        
        // ตรวจสอบว่ามี iframe ตัวนี้อยู่ในหน้า HTML จริงๆ ค่อยสั่งเปลี่ยน URL
        if (iframeElement) {
            iframeElement.src = `${panel.baseUrl}&from=${fromTimestamp}&to=${toTimestamp}`;
        }
    });
}
