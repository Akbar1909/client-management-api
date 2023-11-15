type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export declare const customSerialize: <T, F extends (item: ArrayElement<T>) => ReturnType<F> = (item: ArrayElement<T>) => ArrayElement<T>>(data: T, fc?: F | undefined) => ReturnType<F>[];
export {};
