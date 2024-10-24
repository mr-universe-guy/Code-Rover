export class Listener {
    constructor(eventType, callback) {
        this.eventType = eventType;
        this.callback = callback;
    }
}

export class EventBus {
    static listenerMap = new Map();
    constructor() {}

    static addListener(listener) {
        let eventType = listener.eventType;
        if(!this.listenerMap.has(eventType)){
            this.listenerMap.set(eventType, new Set());
        }
        this.listenerMap.get(eventType).add(listener);
    }

    static publish(eventType, eventData) {
        let listeners = this.listenerMap.get(eventType);
        if(!listeners) {return;}
        listeners.forEach((listener) => {
            listener.callback(eventData);
        });
    }
}