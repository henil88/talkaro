const rooms: Map<string, Set<string>> = new Map();
const socketToRoom: Map<string, string> = new Map();
const socketToUser: Map<string, { _id: string }> = new Map();
export { rooms, socketToRoom, socketToUser };
