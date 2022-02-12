export function mapOf<K extends string | number | symbol, V>(
  ...props: [K, V][]
) {
  const obj: Record<K, V> = {} as any;
  props.forEach((prop) => {
    obj[prop[0]] = prop[1];
  });
  return obj;
}
