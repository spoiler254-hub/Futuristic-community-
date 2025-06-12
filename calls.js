document.addEventListener('DOMContentLoaded', function() {
    const startCallBtn = document.getElementById('startCall');
    const joinCallBtn = document.getElementById('joinCall');
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');

    // Mock WebRTC implementation
    // In a real app, you would use a proper WebRTC library like Agora, PeerJS, or SimplePeer

    startCallBtn.addEventListener('click', async function() {
        try {
            // Get user media
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideo.srcObject = stream;
            
            // In a real app, you would create a peer connection here
            alert('Call started! Share this code with others to join: NEXUS-1234');
            
            // Mock remote stream after 2 seconds
            setTimeout(() => {
                remoteVideo.srcObject = stream.clone();
                remoteVideo.onloadedmetadata = () => remoteVideo.play();
            }, 2000);
        } catch (err) {
            console.error('Error accessing media devices:', err);
            alert('Could not access camera/microphone. Please check permissions.');
        }
    });

    joinCallBtn.addEventListener('click', async function() {
        const callCode = prompt('Enter call code:');
        if (callCode) {
            try {
                // Get user media
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideo.srcObject = stream;
                
                // In a real app, you would connect to the existing peer here
                alert(`Joining call ${callCode}...`);
                
                // Mock remote stream after 2 seconds
                setTimeout(() => {
                    remoteVideo.srcObject = stream.clone();
                    remoteVideo.onloadedmetadata = () => remoteVideo.play();
                }, 2000);
            } catch (err) {
                console.error('Error accessing media devices:', err);
                alert('Could not access camera/microphone. Please check permissions.');
            }
        }
    });
});
