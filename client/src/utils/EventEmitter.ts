type Listener<T> = (state: T) => void;

export class EventEmitter<T> {
  private listeners = new Set<Listener<T>>();

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(state: T) {
    for (const listener of this.listeners) {
      listener(state);
    }
  }
}