class EventEmitter {
  static events = {};

  on(type, listener) {
    EventEmitter.events[type] = EventEmitter.events[type] || [];
    EventEmitter.events[type].push(listener);
  }

  emit(type, args) {
    if (EventEmitter.events[type]) {
      EventEmitter.events[type].forEach(listener => listener(args));
    }
  }
}

export default EventEmitter;
