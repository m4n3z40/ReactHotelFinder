'use strict';

class Dispatcher {
    /**
     * Creates an instance of the event mediator
     *
     * @constructor
     */
    constructor() {
        this._registry = {};
        this._dispatching = [];
    }

    /**
     * Registers a handler for an event
     *
     * @param {string} event
     * @param {Function} handler
     */
    on(event, handler) {
        var registry = this._registry;

        if (!(event in registry)) {
            registry[event] = [];
        }

        if (registry[event].indexOf(handler) > -1) return;

        registry[event].push(handler);
    }

    /**
     * Removes the handler for an event
     *
     * @param {string} event
     * @param {Function} handler
     */
    off(event, handler) {
        var registry = this._registry;

        if (!(event in registry)) return;

        if (!handler) {
            delete registry[event];
            return;
        }

        var index = registry[event].indexOf(handler);

        if (index > -1) registry[event].splice(index, 1);
    }

    /**
     * Executes all registered handlers for the given event
     *
     * @param {string} event
     * @param {Object} payload
     */
    dispatch(event, ...payload) {
        var registry = this._registry,
            dispatching = this._dispatching;

        if (!(event in registry) || this.isDispatching(event)) return;

        dispatching.push(event);

        registry[event].forEach(handler => handler(...payload));

        dispatching.splice(dispatching.indexOf(event), 1);
    }

    /**
     * Returns true if there are handlers registered for the passed event,
     * false otherwise
     *
     * @param {string} event
     * @returns {boolean}
     */
    hasHandlers(event) {
        var registry = this._registry;

        return (event in registry) && (registry[event].length > 0);
    }

    /**
     * Indicates if an event is currently being dispatched
     *
     * @param {string} event
     * @returns {boolean}
     */
    isDispatching(event) {
        return this._dispatching.indexOf(event) > -1;
    }
}

module.exports = Dispatcher;