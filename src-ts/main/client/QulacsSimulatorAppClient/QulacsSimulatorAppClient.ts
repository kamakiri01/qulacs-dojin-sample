import { QulacsWasmSimulatorModule } from "../../emsciptenModule/QulacsWasmSimulatorModule";

export interface QulacsSimulatorAppClientParameterObject {
    module: QulacsWasmSimulatorModule;
}

export class QulacsSimulatorAppClient {
    module: QulacsWasmSimulatorModule;

    constructor(param: QulacsSimulatorAppClientParameterObject) {
        this.module = param.module;
    }

    myFunc() {
        this._callWasmWithThrowableException(() => this.module.myFunc());
    }

    _callWasmWithThrowableException<T>(moduleFunc: () => T): T {
        try {
            return moduleFunc();
        } catch (exception) {
            if (typeof exception === "number") {
                const wasmErrorMessage = this.module.getExceptionMessage(exception as number);
                throw new Error(wasmErrorMessage);
            }
            throw exception;
        }
    }
}
