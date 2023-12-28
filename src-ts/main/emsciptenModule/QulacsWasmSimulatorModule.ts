export interface QulacsWasmSimulatorModule extends EmscriptenWasm.Module {
    getExceptionMessage(exceptionPtr: number): string;
    myFunc(): void;
}
