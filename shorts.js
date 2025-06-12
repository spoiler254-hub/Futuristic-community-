document.addEventListener('DOMContentLoaded', function() {
    const shortUpload = document.getElementById('shortUpload');
    const uploadBtn = document.querySelector('.upload-btn');
    const shortsFeed = document.querySelector('.shorts-feed');

    // Mock shorts data
    const shorts = [
        { id: 1, userId: "CosmicExplorer", userAvatar: "https://i.pravatar.cc/150?img=5", mediaUrl: "https://example.com/short1.mp4", timestamp: Date.now() - 3600000 },
        { id: 2, userId: "StellarVoyager", userAvatar: "https://i.pravatar.cc/150?img=12", mediaUrl: "https://example.com/short2.jpg", timestamp: Date.now() - 7200000 },
        { id: 3, userId: "NeuralPioneer", userAvatar: "https://i.pravatar.cc/150?img=8", mediaUrl: "https://example.com/short3.mp4", timestamp: Date.now() - 10800000 },
    ];

    // Render shorts feed
    function renderShorts() {
        shortsFeed.innerHTML = '';
        shorts.forEach(short => {
            const isVideo = short.mediaUrl.endsWith('.mp4');
            const timeLeft = 24 - Math.floor((Date.now() - short.timestamp) / 3600000);
            
            if (timeLeft > 0) {
                const shortItem = document.createElement('div');
                shortItem.className = 'short-item';
                shortItem.innerHTML = `
                    <div class="short-timer">
                        <div class="short-timer-progress" style="width: ${(timeLeft / 24) * 100}%"></div>
                    </div>
                    ${isVideo ? 
                        `<video class="short-media" autoplay loop>
                            <source src="${short.mediaUrl}" type="video/mp4">
                        </video>` : 
                        `<img class="short-media" src="${short.mediaUrl}" alt="Short">`}
                    <div class="short-info">
                        <div class="short-user">
                            <div class="short-user-avatar">
                                <img src="${short.userAvatar}" alt="${short.userId}">
                            </div>
                            <span>${short.userId}</span>
                        </div>
                        <p>${timeLeft}h remaining</p>
                    </div>
                `;
                shortsFeed.appendChild(shortItem);
                
                // Update timer every second
                const timer = shortItem.querySelector('.short-timer-progress');
                const interval = setInterval(() => {
                    const newTimeLeft = 24 - Math.floor((Date.now() - short.timestamp) / 3600000);
                    if (newTimeLeft > 0) {
                        timer.style.width = `${(newTimeLeft / 24) * 100}%`;
                    } else {
                        clearInterval(interval);
                        shortItem.remove();
                    }
                }, 1000);
            }
        });
    }

    // Handle file upload
    uploadBtn.addEventListener('click', function() {
        shortUpload.click();
    });

    shortUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // In a real app, you would upload to a server
            const isVideo = file.type.startsWith('video/');
            const mockUrl = isVideo ? 
                'https://example.com/uploaded.mp4' : 
                'https://example.com/uploaded.jpg';
            
            // Add to shorts array
            shorts.unshift({
                id: shorts.length + 1,
                userId: "You",
                userAvatar: "https://i.pravatar.cc/150",
                mediaUrl: mockUrl,
                timestamp: Date.now()
            });
            
            renderShorts();
            alert('Short uploaded! It will disappear in 24 hours.');
        }
    });

    // Initialize
    renderShorts();
});
