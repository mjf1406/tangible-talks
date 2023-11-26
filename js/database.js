function setupDatabase(){
    db.version(1).stores({
        messages: `
            id++,
            userId,
            chatRoomId,
            content,
            dt`,
        chat_rooms: `
            id++,
            name,
            icon,
            dt`,
        users: `
            id++,
            color,
            icon,
            name,
            dt`
    });
}