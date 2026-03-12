export const socketEvent = {
  JOIN: "join", // Triggered when a peer joins the room
  JOINED: "joined", // Notifies others when a peer has successfully joined
  LEAVE: "leave", // Triggered when a peer leaves the room
  LEFT: "peer-left", // Notifies others when a peer leaves
  OFFER: "offer", // Sent to initiate a WebRTC connection offer
  ANSWER: "answer", // Sent to respond to a WebRTC offer
  ICE: "ice", // For sending ICE candidate data in WebRTC
  ERROR: "error", // Error handling
  DISCONNECT: "disconnect", // Peer disconnect event
  PEER_SETTINGS: "peer-settings", // Peer settings for avatar, muted state, and username
};
