const typographySemantic = {
  hero: {
    lg: { fontSize: 40, fontWeight: 700, lineHeight: 52 },
    md: { fontSize: 36, fontWeight: 700, lineHeight: 48 },
    sm: { fontSize: 32, fontWeight: 700, lineHeight: 44 },
  },
  title: {
    xl: { fontSize: 28, fontWeight: 700, lineHeight: 38 },
    lg: { fontSize: 24, fontWeight: 700, lineHeight: 32 },
    md: { fontSize: 22, fontWeight: 700, lineHeight: 30 },
    sm: { fontSize: 20, fontWeight: 600, lineHeight: 28 },
    xs: { fontSize: 18, fontWeight: 600, lineHeight: 26 },
  },
  body: {
    xl: { fontSize: 18, fontWeight: 500, lineHeight: 26 },
    lg: { fontSize: 16, fontWeight: 500, lineHeight: 24 },
    md: { fontSize: 15, fontWeight: 400, lineHeight: 22 },
    sm: { fontSize: 14, fontWeight: 400, lineHeight: 22 },
  },
  label: {
    xl: { fontSize: 18, fontWeight: 600, lineHeight: 24 },
    lg: { fontSize: 16, fontWeight: 600, lineHeight: 22 },
    md: { fontSize: 14, fontWeight: 500, lineHeight: 20 },
    sm: { fontSize: 13, fontWeight: 500, lineHeight: 18 },
  },
  caption: {
    md: { fontSize: 12, fontWeight: 400, lineHeight: 16 },
  },
} as const;

export { typographySemantic };
