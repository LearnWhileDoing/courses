import { DBSchema as _DBSchema, openDB } from "idb";

import PageProgress from "~/ctrl/util/PageProgress";

export default interface DBSchema extends _DBSchema {
  current: {
    value: Record<string, PageProgress>;
    key: string;
  };
  completed: {
    value: string[];
    key: string;
  };
}
