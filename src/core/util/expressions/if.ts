interface IfChain<TSuccess, TFailure> {
  (): TSuccess | TFailure;
  then(expr: TSuccess, ...fn: Function[]): IfChain<TSuccess, TFailure>;
  else(expr: TFailure, ...fn: Function[]): IfChain<TSuccess, TFailure>;
}

export default function If<T, E>(target: any) {
  let thenVal: [any, Function[]] = [undefined, []];
  let elseVal: [any, Function[]] = [undefined, []];

  const chain: IfChain<T, E> = () => {
    if (target) {
      thenVal[1].forEach(fn => fn());
      return thenVal[0];
    }
    elseVal[1].forEach(fn => fn());
    return elseVal[0];
  };
  chain.then = (expr: T, ...fn: Function[]) => {
    thenVal = [expr, fn];
    return chain;
  };
  chain.else = (expr: E, ...fn: Function[]) => {
    elseVal = [expr, fn];
    return chain;
  };
  return chain;
}
