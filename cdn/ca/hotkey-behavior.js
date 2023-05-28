Site.Elements.define("ca-hotkey-behavior", (Base, { publish }) => class extends Base {
    /** @this {HTMLElement} */
    async connectedCallback() {
        const document = this.ownerDocument;
        // const window = document.defaultView;

        const onKeydown = (...args) => {
            // if (!this._keyboardLayoutMap) {
            //     return;
            // }
            const anyInputFocused = document.activeElement !== document.body
            if (anyInputFocused) {
                return;
            }

            this.broadcastState(...args);
        };
        this._unsub = () => {
            document.removeEventListener("keydown", onKeydown);
        };
        document.addEventListener("keydown", onKeydown);

        // TODO: Do we need "getLayoutMap" for hotkey handling?
        //const keyboard = window.navigator.keyboard;
        //if ("getLayoutMap" in keyboard) {
        //    this._keyboardLayoutMap = await keyboard.getLayoutMap();
        //} else {
        //    this._keyboardLayoutMap = {
        //        get(key) {
        //            return key;
        //        },
        //    };
        //}
    }
    disconnectedCallback() {
        this._unsub();
        this._unsub = null;
    }

    /** @param {KeyboardEvent} ev */
    broadcastState(ev) {
        // const key = this._keyboardLayoutMap.get(ev.key);
        // const upKey = keyboardLayoutMap.get('KeyW');
        // window.alert(`Press ${upKey} to move up.`);

        const data = {
            altKey: ev.altKey,
            ctrlKey: ev.ctrlKey,
            isComposing: ev.isComposing,
            location: ev.location,
            metaKey: ev.metaKey,
            repeat: ev.repeat,
            shiftKey: ev.shiftKey,
            key: ev.key,
        };
        publish("app.hotkey", data);
    }
});
