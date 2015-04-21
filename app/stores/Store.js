'use strict';

var instancesCount =  0;

/**
 * Store base class for the flux architecture
 *
 * @class
 */
class Store {
    /**
     * Class constructor
     * 
     * @param  {Object} eventEmitter
     * @param  {string} name
     * @param  {Object} handlers
     * @return {void}
     */
    constructor(eventEmitter, name, handlers = {}) {
        if (eventEmitter) {
            this.setEventEmitter(eventEmitter);
        }

        this._name = name;

        this.setHandlers(handlers);

        this._instanceId = ++instancesCount;
    }

    /**
     * Returns the store name
     * 
     * @return {string}
     */
    getName() {
        return this._name;
    }    

    /**
     * Sets the action handlers by passing a hash object.
     * The key being the action name and
     * the value being a function on name of a function of this class.
     *
     * @param {Object} handlers
     */
    setHandlers(handlers) {
        var eventEmitter = this.getEventEmitter();

        if (eventEmitter && this._handlers) {
            removeActionHandlers(this);
        }

        this._handlers = handlers;

        if (eventEmitter) registerActionHandlers(this);
    }

    /**
     * Returns the handlers hash object.
     *
     * @return {Object}
     */
    getHandlers() {
        return this._handlers;
    }

    /**
     * Sets the eventEmitter that will take care of action dispatching in the store.
     *
     * @param {Object} eventEmitter
     */
    setEventEmitter(eventEmitter) {
        var handlers = this.getHandlers();

        if (handlers && this._eventEmitter) {
            removeActionHandlers(this);
        }

        this._eventEmitter = eventEmitter;

        if (handlers) registerActionHandlers(this);
    }

    /**
     * Gets the eventEmitter instance.
     *
     * @return {Object}
     */
    getEventEmitter() {
        return this._eventEmitter;
    }

    /**
     * Gets the change action name for this store instance
     *
     * @return {string}
     */
    getChangeActionName() {
        return  'CHANGE_ACTION.'+this._name+'.'+this._instanceId;
    }

    /**
     * Register a listener that will be notified of every change that hgetEventEmitter()ens in the store
     *
     * @param {Function} listener
     */
    registerListener(listener) {
        this.getEventEmitter().on(this.getChangeActionName(), listener);
    }

    /**
     * Removes the change listener waiting for changes of this store
     *
     * @param {Function} listener
     */
    removeListener(listener) {
        this.getEventEmitter().off(this.getChangeActionName(), listener);
    }

    /**
     * Notifies all listeners that the store has changed its state
     */
    emitChanges() {
        this.getEventEmitter().emit(this.getChangeActionName(), this);
    }
}

/**
 * Registers the action handlers contained in the store
 *
 * @param {Store} store
 */
function registerActionHandlers(store) {
    var handlers = store.getHandlers();

    for(var actionName in handlers) {
        store.getEventEmitter().on(actionName, handlers[actionName]);
    }
}

/**
 * Removes the action handlers contained in the store
 *
 * @param {Store} store
 */
function removeActionHandlers(store) {
    var handlers = store.getHandlers();

    for(var actionName in handlers) {
        store.getEventEmitter().off(actionName, handlers[actionName]);
    }
}

module.exports = Store;