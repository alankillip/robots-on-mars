import { restrictCommands } from "./utils";

describe("restrictCommands", () => {
  it("should filter out illegal characters and normalize to upper case", () => {
    const input = `wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'`;
    expect(restrictCommands(input)).toEqual([
      "F",
      "F",
      "R",
      "R",
      "R",
      "L",
      "F",
      "L",
      "L",
      "L",
      "L",
      "F",
      "F",
      "L",
      "R",
      "R",
    ]);
  });
  it("should limit commands to 50", () => {
    const input = `wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'
    wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'wijFnp34uFnveh
    iARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'wijFnp34uFnvehiARRRLDKFGJLLL
    SLDFFLRKJHWM,RNT'sdsdwkng'wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RN
    T'sdsdwkng'wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'wijF
    np34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'wijFnp34uFnvehiARRR
    LDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLR
    KJHWM,RNT'sdsdwkng'wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkn
    g'wijFnp34uFnvehiARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'wijFnp34uFnvehi
    ARRRLDKFGJLLLSLDFFLRKJHWM,RNT'sdsdwkng'`;
    expect(restrictCommands(input).length).toBe(50);
  });
});
