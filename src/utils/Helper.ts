import CryptoJS from 'crypto-js';

export const encryptData = (name: string, data: any, type = 'object') => {
    try {
        if (type === 'object') {
            const encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_ENCRYPTION_KEY).toString();
            console.log("name", name, "data", data);
            localStorage.setItem(name, encryptData);
            // return
        } else {
            const encryptData = CryptoJS.AES.encrypt(data, import.meta.env.VITE_ENCRYPTION_KEY).toString();
            localStorage.setItem(name, encryptData);
            // return
        }
    } catch (error) {
        console.error('Error during encryption or storing data:', error);
    }
};

export const decryptData = (name: string, type = 'object') => {
    try {
        const data = localStorage.getItem(name);
        if (data) {
            if (type === 'object') {
                const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_ENCRYPTION_KEY);
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                return JSON.parse(decryptedData);
            } else {
                const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_ENCRYPTION_KEY);
                return bytes.toString(CryptoJS.enc.Utf8);
            }
        } else {
            return null;
        }
    } catch (error) {
        // localStorage.removeItem(name);
        throw new Error('Decryption failed or malformed data.');

    }
};

function parseTimeToSeconds(timeStr: any) {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + s;
}

export const calculateWorkedTime = (attendance: any) => {
    if (!attendance?.clockIn) return 0;

    // Use current time if clockOut is not yet set
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const currentTimeStr = `${String(istTime.getHours()).padStart(2, "0")}:${String(istTime.getMinutes()).padStart(2, "0")}:${String(istTime.getSeconds()).padStart(2, "0")}`;
    // const currentTimeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    console.log("Frontend current time:", currentTimeStr);
    const clockOut = attendance.clockOut || attendance.lastActionTime || currentTimeStr;

    // Base working seconds
    let totalSeconds = parseTimeToSeconds(clockOut) - parseTimeToSeconds(attendance.clockIn);

    // Subtract total break seconds
    const breakSeconds = (attendance.breaks || []).reduce((sum: any, b: any, index: any, arr: any) => {
        if (b.start && b.end) {
            // completed break
            return sum + (parseTimeToSeconds(b.end) - parseTimeToSeconds(b.start));
        } else if (b.start && !b.end && index === arr.length - 1) {
            // ongoing break → exclude from total
            return sum + (parseTimeToSeconds(currentTimeStr) - parseTimeToSeconds(b.start));
        }
        return sum;
    }, 0);

    // Ensure not negative
    return Math.max(totalSeconds - breakSeconds, 0);
}


export const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return "";

    try {
        const parsedUrl = new URL(url);
        let videoId = "";

        // youtu.be/VIDEO_ID
        if (parsedUrl.hostname.includes("youtu.be")) {
            videoId = parsedUrl.pathname.slice(1);
        }

        // youtube.com/watch?v=VIDEO_ID
        else if (parsedUrl.searchParams.get("v")) {
            videoId = parsedUrl.searchParams.get("v")!;
        }

        // youtube.com/embed/VIDEO_ID
        else if (parsedUrl.pathname.startsWith("/embed/")) {
            videoId = parsedUrl.pathname.split("/embed/")[1];
        }

        // youtube.com/live/VIDEO_ID
        else if (parsedUrl.pathname.startsWith("/live/")) {
            videoId = parsedUrl.pathname.split("/live/")[1];
        }

        // youtube.com/shorts/VIDEO_ID
        else if (parsedUrl.pathname.startsWith("/shorts/")) {
            videoId = parsedUrl.pathname.split("/shorts/")[1];
        }

        return videoId
            ? `https://www.youtube.com/embed/${videoId}`
            : "";
    } catch {
        return "";
    }
};

