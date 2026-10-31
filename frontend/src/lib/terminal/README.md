# Terminal logic scaffold — not implemented

Future pure modules: command parser/registry, line editing, boot formatter/state and safe output normalization. They consume `data/filesystem.ts`; they never call host shell or filesystem APIs. Move logic out of TerminalView only alongside regression tests. Current imageToAscii.ts remains unchanged pending approved retirement.
