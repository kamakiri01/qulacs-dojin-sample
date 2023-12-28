#include <emscripten/bind.h>
#include <cppsim/state.hpp>
#include <cppsim/gate_factory.hpp>
#include <cppsim/gate_merge.hpp>
#include <cppsim/gate_matrix.hpp>
#include <string>
#include <vector>
#include <emscripten.h>
#include <iostream>
#include <emscripten/html5.h>
#include <cppsim/circuit.hpp>

extern "C" {
    int myFunc() {
        printf("Hello World!\n");
        return 0;
    }
    // @see https://emscripten.org/docs/porting/Debugging.html#handling-c-exceptions-from-javascriptd
    std::string getExceptionMessage(intptr_t exceptionPtr) { return std::string(reinterpret_cast<std::exception *>(exceptionPtr)->what()); }
}

EMSCRIPTEN_BINDINGS(Bindings) {
    emscripten::register_vector<double>("vector<double>");
    emscripten::register_vector<CPPCTYPE>("vector<CPPCTYPE>");
    emscripten::register_vector<ITYPE>("vector<ITYPE>");
    emscripten::register_vector<int>("vector<int>");
    emscripten::register_vector<long int>("vector<long int>");

    emscripten::function("myFunc", &myFunc, emscripten::allow_raw_pointers());
    emscripten::function("getExceptionMessage", &getExceptionMessage);
};
