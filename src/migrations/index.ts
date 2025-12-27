import * as migration_20251220_230408 from './20251220_230408';

export const migrations = [
  {
    up: migration_20251220_230408.up,
    down: migration_20251220_230408.down,
    name: '20251220_230408'
  },
];
