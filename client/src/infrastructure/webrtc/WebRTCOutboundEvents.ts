export default class WebRTCOutboundEvents {
  protected iceHandler?: (peerId: string, ice: RTCIceCandidateInit) => void;
  protected offerHandler?: (
    peerId: string,
    sdp: RTCSessionDescriptionInit,
  ) => void;
  protected answerHandler?: (
    peerId: string,
    sdp: RTCSessionDescriptionInit,
  ) => void;

  onIce(cb: typeof this.iceHandler) {
    this.iceHandler = cb;
  }

  onOffer(cb: typeof this.offerHandler) {
    this.offerHandler = cb;
  }

  onAnswer(cb: typeof this.answerHandler) {
    this.answerHandler = cb;
  }
}
