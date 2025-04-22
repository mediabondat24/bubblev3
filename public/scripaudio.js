let ws;
        let audioCtx;
        let source;
        let processor;

        async function startStreaming() {
            ws = new WebSocket("ws://YOUR_VPS_IP:8080"); // Ganti dengan IP VPS Anda
            ws.binaryType = "arraybuffer";

            ws.onopen = () => console.log("Terhubung ke WebSocket VPS");
            ws.onerror = err => console.error("WebSocket error:", err);
            ws.onclose = () => console.log("Koneksi WebSocket ditutup");

            try {
                // Pastikan kita memiliki izin mikrofon sebelum memulai
                const permission = await navigator.permissions.query({ name: "microphone" });

                if (permission.state === "denied") {
                    console.error("Izin mikrofon ditolak. Harap izinkan akses mikrofon.");
                    return;
                }

                // Ambil audio dari mikrofon atau sistem
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                source = audioCtx.createMediaStreamSource(stream);
                processor = audioCtx.createScriptProcessor(4096, 1, 1);

                source.connect(processor);
                processor.connect(audioCtx.destination);

                processor.onaudioprocess = event => {
                    if (ws.readyState === WebSocket.OPEN) {
                        const audioData = event.inputBuffer.getChannelData(0);
                        ws.send(audioData.buffer);
                    }
                };
            } catch (err) {
                console.error("Gagal mendapatkan audio:", err);
            }
        }

        // Jalankan otomatis saat halaman dimuat
        document.addEventListener("DOMContentLoaded", async () => {
            // Coba langsung jalankan
            await startStreaming();

            // Jika gagal karena izin, munculkan alert untuk meminta interaksi
            setTimeout(() => {
                if (!audioCtx || audioCtx.state === "suspended") {
                    alert("Klik di mana saja untuk mengaktifkan streaming audio!");
                    document.addEventListener("click", startStreaming, { once: true });
                }
            }, 1000);
        });