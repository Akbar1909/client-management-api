export declare function extractObjectPart<T extends Record<string, any>>({ keys, obj, type, }: {
    keys: Array<keyof T>;
    obj: T;
    type: 'include' | 'exclude';
}): {};
