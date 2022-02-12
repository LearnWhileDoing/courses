// noinspection JSUnusedGlobalSymbols

interface SwitchChain<TTarget, TResult> {
  case<R>(expr: TTarget | TTarget[], result: R, ...fn: Function[]): SwitchChain<TTarget, TResult | R>;
  default<R>(result: R, ...fn: Function[]): SwitchChain<TTarget, TResult | R>;
  (): TResult;
}

type Case<T, R> = [T, R, Function[]];

export default function Switch<TTarget = any>(target: TTarget) {
  const cases: Case<TTarget, any>[] = [];
  let defaultCase: [any, Function[]] = [undefined, []];

  const chain: SwitchChain<TTarget, undefined> = () => {
    for (const c of cases) {
      if (c[0] === target) {
        c[2].forEach(fn => fn());
        return c[1];
      }
    }

    defaultCase[1].forEach(fn => fn());

    return defaultCase[0];
  };
  chain.case = <R>(expr: TTarget | TTarget[], result: R, ...fn: Function[]) => {
    if (Array.isArray(expr)) expr.forEach(e => cases.push([e, result, fn]));
    else cases.push([expr, result, fn]);
    return chain;
  };
  chain.default = <R>(result: R, ...fn: Function[]) => {
    defaultCase = [result, fn];
    return chain;
  };
  return chain;
}
