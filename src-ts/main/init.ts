const ModuleQulacsWasm = require("../wasm/module.js");
import { QulacsSimulatorAppClient } from "./client/QulacsSimulatorAppClient/QulacsSimulatorAppClient";
import { QulacsWasmSimulatorModule } from "./emsciptenModule/QulacsWasmSimulatorModule";

export interface InitQulacsSimulatorModuleOption {
    module?: WebAssembly.Module;
}

export async function initQulacsSimulatorModule(option: InitQulacsSimulatorModuleOption = {}): Promise<QulacsSimulatorAppClient> {
    let qulacsModule: QulacsWasmSimulatorModule;
    if (option.module) {
        qulacsModule = await initWasmFromModule(option.module);
    } else {
        qulacsModule = await initWasm();
    }

    const wasmClient = new QulacsSimulatorAppClient({module: qulacsModule});
    return wasmClient;
}

function initWasm(): Promise<QulacsWasmSimulatorModule> {
    return Promise.resolve(ModuleQulacsWasm());
}

function initWasmFromModule(compiledModule: WebAssembly.Module): Promise<QulacsWasmSimulatorModule> {
    return new Promise((resolve, reject) => {
        function onInstantiateWasm(importObject: WebAssembly.Imports, successCallback: (module: WebAssembly.Module) => void) {
            WebAssembly.instantiate(compiledModule, importObject)
                .then(instance => {
                    successCallback(instance);
                })
                .catch(e => reject(e));
        }
        ModuleQulacsWasm({ instantiateWasm: onInstantiateWasm })
            .then((emscriptenModule: EmscriptenWasm.Module) => {
                resolve(emscriptenModule as QulacsWasmSimulatorModule);
            })
            .catch((e: any) => reject(e));
        });
}
