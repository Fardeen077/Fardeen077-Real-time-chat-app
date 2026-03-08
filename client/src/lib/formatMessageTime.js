function formatMessageTime(createdAt) {
    const now = new Date();
    const messageTime = new Date(createdAt);
    const diffMs = now - messageTime;

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) {
        const minutes = diffMinutes % 60;
        return minutes ? `${diffHours} hr ${minutes} min ago` : `${diffHours} hr ago`;
    };
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
}

export default formatMessageTime