import toast from "~/core/util/toast";

class ErrorHandlingService {
  private static _instance: ErrorHandlingService;

  static get I() {
    if (!this._instance) this._instance = new ErrorHandlingService();
    return this._instance;
  }

  handleErrorSilently(e: Error) {
    console.error(e);
  }

  notifyUserOfError(e: Error, title: string) {
    this.handleErrorSilently(e);

    console.log("ok");

    toast({
      title: title,
      description: (e as Error).message,
      status: "error",
      isClosable: true,
    });
  }
}

export default ErrorHandlingService;
