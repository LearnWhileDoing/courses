interface AsyncPipeChain<TInput = undefined, TOutput = undefined> {
  (): Promise<TOutput>;
  thru<TOutput>(fn: (input: TInput, ...args: any[]) => TOutput, ...args: any[]): AsyncPipeChain<TOutput, TOutput>;
  thruAsync<TOutput>(
    fn: (input: TInput, ...args: any[]) => Promise<TOutput>,
    ...args: any[]
  ): AsyncPipeChain<TOutput, TOutput>;
}

interface PipeChain<TInput = undefined, TOutput = undefined> {
  (): TOutput;
  thru<TOutput>(fn: (input: TInput, ...args: any[]) => TOutput, ...args: any[]): PipeChain<TOutput, TOutput>;
  thruAsync<TOutput>(
    fn: (input: TInput, ...args: any[]) => Promise<TOutput>,
    ...args: any[]
  ): AsyncPipeChain<TOutput, TOutput>;
}

type PipeSegment = (input: any) => any;

const _segment = function (fn: (input: any, ...args: any[]) => any, child?: PipeSegment, ...args: any[]) {
  return function (input) {
    if (child) {
      let output = child(input);
      if (output instanceof Promise) return new Promise(async resolve => resolve(fn(await output, ...args)));
      return fn(output, ...args);
    }
    return fn(input, ...args);
  };
};

// noinspection JSUnusedGlobalSymbols
export function Pipe<TInput = any>(target: TInput) {
  let segment = _segment(a => a);

  const chain: any = () => {
    return segment(target);
  };
  chain.thru = <TOutput extends any>(fn: (input: TInput, ...args: any[]) => TOutput, ...args) => {
    segment = _segment(fn, segment, ...args);
    return chain;
  };
  chain.thruAsync = <TOutput extends any>(fn: (input: TInput, ...args: any[]) => Promise<TOutput>, ...args) => {
    segment = _segment(fn, segment, ...args);
    return chain as AsyncPipeChain<TOutput, TOutput>;
  };
  return chain as PipeChain<any, any>;
}
