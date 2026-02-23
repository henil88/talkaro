export type OfferSignal = {
  type: "offer";
  from: string;
  to: string;
  sdp: RTCSessionDescriptionInit;
};

export type AnswerSignal = {
  type: "answer";
  from: string;
  to: string;
  sdp: RTCSessionDescriptionInit;
};

export type IceSignal = {
  type: "ice";
  from: string;
  to: string;
  candidate: RTCIceCandidateInit;
};
