import { primitive } from './color-primitive';
import { semantic } from './color-semantic';
import { typographyPrimitive } from './typography-primitive';
import { typographySemantic } from './typography-semantic';

export const colors = { primitive, semantic } as const;
export const typography = { primitive: typographyPrimitive, semantic: typographySemantic } as const;
