namespace Firebase {
  export type Default = typeof import("firebase").default;
  export type App = import("firebase").default.app.App;
}

export default Firebase;
