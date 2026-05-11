export const PIN_WIDTH = 88;
export const PIN_HEIGHT = 97;
export const PIN_IMG_LEFT = 16;
export const PIN_IMG_TOP = 14;
export const PIN_IMG_SIZE = 52;

export const SELECTED_PIN_WIDTH = 108;
export const SELECTED_PIN_HEIGHT = 118;
export const SELECTED_PIN_IMG_LEFT = 18;
export const SELECTED_PIN_IMG_TOP = 16;
export const SELECTED_PIN_IMG_SIZE = 68;

export const WRAPPER_WIDTH = SELECTED_PIN_WIDTH;
export const WRAPPER_HEIGHT = SELECTED_PIN_HEIGHT;
export const WRAPPER_Y_ANCHOR = 102 / 118;

export function buildPinHtml(
  markerSrc: string,
  imageUrl: string,
  count: number,
  isSelected: boolean,
): string {
  const pinW = isSelected ? SELECTED_PIN_WIDTH : PIN_WIDTH;
  const pinH = isSelected ? SELECTED_PIN_HEIGHT : PIN_HEIGHT;
  const imgL = isSelected ? SELECTED_PIN_IMG_LEFT : PIN_IMG_LEFT;
  const imgT = isSelected ? SELECTED_PIN_IMG_TOP : PIN_IMG_TOP;
  const imgS = isSelected ? SELECTED_PIN_IMG_SIZE : PIN_IMG_SIZE;

  const offsetLeft = (WRAPPER_WIDTH - pinW) / 2;
  const offsetTop = WRAPPER_HEIGHT - pinH;

  const badgeLabel = count > 99 ? '99+' : String(count);
  const badge =
    count > 1
      ? `<div style="position:absolute;top:4px;right:10px;min-width:27px;height:27px;border-radius:14px;background:var(--color-semantic-theme-red-normal);color:var(--color-semantic-system-white);font-size:var(--text-primitive-16);font-weight:var(--font-weight-primitive-semibold);line-height:var(--leading-primitive-22);display:flex;align-items:center;justify-content:center;padding:0 5px;box-sizing:border-box;">${badgeLabel}</div>`
      : '';
  return [
    `<div style="position:relative;width:${WRAPPER_WIDTH}px;height:${WRAPPER_HEIGHT}px;cursor:pointer;user-select:none;">`,
    `<div style="position:absolute;left:${offsetLeft}px;top:${offsetTop}px;width:${pinW}px;height:${pinH}px;">`,
    `<img src="${markerSrc}" alt="" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;"/>`,
    `<div style="position:absolute;left:${imgL}px;top:${imgT}px;width:${imgS}px;height:${imgS}px;border-radius:50%;overflow:hidden;background:var(--color-semantic-object-subtler);">`,
    `<img src="${imageUrl}" alt="" draggable="false" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:cover;pointer-events:none;"/>`,
    `</div>`,
    badge,
    `</div>`,
    `</div>`,
  ].join('');
}

export function getClusterStyles(): kakao.maps.ClusterStyle[] {
  const base: kakao.maps.ClusterStyle = {
    background:
      'color-mix(in srgb, var(--color-semantic-accent-normal) 80%, transparent)',
    border: '1px solid var(--color-semantic-accent-bold)',
    borderRadius: '50%',
    color: 'var(--color-semantic-system-white)',
    textAlign: 'center',
  };
  return [
    {
      ...base,
      width: '64px',
      height: '64px',
      lineHeight: '64px',
      fontSize: 'var(--text-primitive-18)',
      fontWeight: 'var(--font-weight-primitive-semibold)',
    },
    {
      ...base,
      width: '128px',
      height: '128px',
      lineHeight: '128px',
      fontSize: 'var(--text-primitive-20)',
      fontWeight: 'var(--font-weight-primitive-semibold)',
    },
    {
      ...base,
      width: '200px',
      height: '200px',
      lineHeight: '200px',
      fontSize: 'var(--text-primitive-22)',
      fontWeight: 'var(--font-weight-primitive-bold)',
    },
  ];
}
