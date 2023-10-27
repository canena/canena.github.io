// TODO: TypeScript type-foo to keep the augmentations easier to manage?

// Augmenting the generic PubSub APIs for the editor support
declare interface HubSandbox {
    publish(channel: "DBG.log", data: string[]): void;
    subscribe(channel: "DBG.log"): ColdCallbagSubscription<string[]>;

    publish(channel: "document.scroll", data: ScrollEventData): void;
    subscribe(channel: "document.scroll"): ColdCallbagSubscription<ScrollEventData>;

    publish(channel: "app.hotkey", data: HotkeyEventData): void;
    subscribe(channel: "app.hotkey"): ColdCallbagSubscription<HotkeyEventData>;
}
declare interface ScrollEventData {
    innerHeight: number,
    innerWidth: number,
    scrollHeight: number,
    scrollWidth: number,
    scrollX: number,
    scrollY: number,
}
declare interface HotkeyEventData {
    altKey: boolean,
    ctrlKey: boolean,
    isComposing: boolean,
    location: number,
    metaKey: boolean,
    repeat: boolean,
    shiftKey: boolean,
    key: string,
}


declare interface BaseElement extends HTMLElement {
}
declare var BaseElementStatic: {
    prototype: BaseElement;
    new(): BaseElement;

    throttle(fn: Function, timeframeMs);
    sanitize(unsafeHtml: string): string;
}

declare interface KnownCapabilities {
    Scheduler: {
        cancel(handle: number): void;
        schedule(fn: FrameRequestCallback): Number;
    },
    Store: {
        getItem(key: string): any | null;
        setItem(key: string, value: any): void;
    },
}
declare interface SiteStatic {
    features: {
        track: boolean;
    },
    Elements: {
        define<T extends BaseElement>(tagName: string, factory: (Base: BaseElementStatic, sandbox: HubSandbox, capabilities: KnownCapabilities) => T);
    },
}
declare const Site: SiteStatic;
