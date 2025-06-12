document.addEventListener('DOMContentLoaded', function() {
    // Mock chat data
    const chats = [
        { id: 1, name: "CosmicExplorer", avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "The quantum flux is unstable!", time: "12:30 PM", unread: 2 },
        { id: 2, name: "StellarVoyager", avatar: "https://i.pravatar.cc/150?img=12", lastMessage: "Warp drive engaged", time: "10:15 AM", unread: 0 },
        { id: 3, name: "NeuralPioneer", avatar: "https://i.pravatar.cc/150?img=8", lastMessage: "The algorithm is learning", time: "Yesterday", unread: 5 },
    ];

    const messages = {
        1: [
            { sender: "CosmicExplorer", text: "The quantum flux is unstable!", time: "12:30 PM", incoming: true },
            { sender: "You", text: "I'll recalibrate the deflector", time: "12:32 PM", incoming: false },
            { sender: "CosmicExplorer", text: "Hurry! The singularity is forming", time: "12:33 PM", incoming: true }
        ]
    };

    const chatList = document.querySelector('.chat-list');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');

    // Render chat list
    function renderChatList() {
        chatList.innerHTML = '';
        chats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = `chat-item ${chat.unread > 0 ? 'unread' : ''}`;
            chatItem.innerHTML = `
                <div class="chat-item-avatar">
                    <img src="${chat.avatar}" alt="${chat.name}">
                </div>
                <div class="chat-item-info">
                    <div class="chat-item-name">${chat.name}</div>
                    <div class="chat-item-last">${chat.lastMessage}</div>
                </div>
                <div class="chat-item-time">${chat.time}</div>
                ${chat.unread > 0 ? `<div class="chat-item-unread">${chat.unread}</div>` : ''}
            `;
            chatItem.addEventListener('click', () => loadChat(chat.id));
            chatList.appendChild(chatItem);
        });
    }

    // Load chat messages
    function loadChat(chatId) {
        const chat = chats.find(c => c.id === chatId);
        document.querySelector('.chat-user span').textContent = chat.name;
        document.querySelector('.chat-user img').src = chat.avatar;

        chatMessages.innerHTML = '';
        if (messages[chatId]) {
            messages[chatId].forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${msg.incoming ? 'message-incoming' : 'message-outgoing'}`;
                messageDiv.innerHTML = `
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                `;
                chatMessages.appendChild(messageDiv);
            });
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // In a real app, you would send this to a server
            if (!messages[1]) messages[1] = [];
            messages[1].push({
                sender: "You",
                text: text,
                time: time,
                incoming: false
            });
            
            loadChat(1);
            chatInput.value = '';
            
            // Mock reply
            setTimeout(() => {
                messages[1].push({
                    sender: "CosmicExplorer",
                    text: getRandomReply(),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    incoming: true
                });
                loadChat(1);
            }, 1000 + Math.random() * 2000);
        }
    }

    // Mock replies
    function getRandomReply() {
        const replies = [
            "Fascinating! The quantum signature matches!",
            "Negative, the temporal rift is widening!",
            "Affirmative, proceeding to coordinates.",
            "Warning: Anomaly detected in sector 5!",
            "The neural network is adapting.",
            "Engage hyperdrive on my mark!"
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // Event listeners
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    // Initialize
    renderChatList();
    loadChat(1);
});
