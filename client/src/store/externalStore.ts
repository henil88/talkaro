type Listener = () => void;

export class ExternalStore<T> {
  private listeners = new Set<Listener>();
  private snapshot: T;

  constructor(initialState: T) {
    this.snapshot = initialState;
  }

  getSnapshot = () => this.snapshot;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  protected setSnapshot(next: T) {
    if (Object.is(next, this.snapshot)) return;
    this.snapshot = next;
    this.listeners.forEach((l) => l());
  }
}
