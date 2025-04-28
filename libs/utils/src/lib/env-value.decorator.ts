/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EnvParam<TProperty> {
  name?: string;
  transform?: (raw: string) => TProperty;
  defaultValue?: TProperty;
}

export function EnvValue<TProperty>(params?: EnvParam<TProperty>) {
  return (target: any, propertyKey: string | symbol) => {
    const { name, transform, defaultValue } = params || {};
    const propertyType = (Reflect as any).getMetadata(
      'design:type',
      target,
      propertyKey,
    );
    const k = name || (propertyKey as string);
    const v = process.env[k];
    let value;

    if (v) {
      switch (propertyType) {
        case Number:
          value = parseFloat(v);
          break;
        case Boolean:
          // eslint-disable-next-line no-case-declarations
          const t = v.toLowerCase();
          value = ['true', '1', 'on', 'yes'].includes(t);
          break;
        default:
          value = transform ? transform(v) : v;
      }
    } else {
      value = typeof defaultValue !== 'undefined' ? defaultValue : target[k];
    }
    Object.defineProperty(target, propertyKey, {
      value,
      writable: false,
      enumerable: true,
    });
  };
}
