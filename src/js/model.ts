/** 纸书装订决定跨页。构建与阅读器共享这条规则。 */
export function physicalSpreads<T extends { id: string }>(pages: readonly T[]): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const number = Number(page.id.slice(1));
    const next = pages[i + 1];
    if (number % 2 === 0 && next && Number(next.id.slice(1)) === number + 1) {
      groups.push([page, next]);
      i++;
    } else {
      groups.push([page]);
    }
  }
  return groups;
}

export type Gesture =
  | { kind: 'tap' }
  | { kind: 'hold'; release: 'continue' }
  | { kind: 'circle'; tapDegrees: number; threshold: number };

export const gestures = {
  breathe: { kind: 'hold', release: 'continue' },
  rub: { kind: 'circle', tapDegrees: 120, threshold: 300 },
} satisfies Record<string, Gesture>;

export const actionNames = [
  'start', 'belly', 'name', 'feed', 'feed3', 'massage', 'rub', 'confetti',
  'fly', 'moon', 'yawn', 'find', 'count', 'shout', 'seen', 'gift', 'clap',
  'spin', 'stomp', 'sleepy', 'again', 'cover', 'water', 'medicine', 'cough',
  'pass', 'breathe', 'tidy', 'poke',
] as const;

export type ActionName = typeof actionNames[number];
type HotspotGeometry = { at: [number, number]; size: number; label: string; index?: number };
export type Hotspot = HotspotGeometry & (
  | { action: 'rub' | 'breathe'; targetId: 'character'; target: string }
  | { action: 'pass' | 'tidy' | 'feed' | 'feed3' | 'find' ; targetId: string; target: string }
  | { action: 'count'; index: number; targetId: string; target: string }
  | { action: Exclude<ActionName, 'rub' | 'breathe' | 'pass' | 'tidy' | 'feed' | 'feed3' | 'find' | 'count'>; targetId: string; target?: string }
);

export interface PageNumber {
  text: string;
  at: [number, number];
  size?: number;
  on?: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
  rotate?: number;
}

export interface ManuscriptPage {
  id: string;
  /** 取景只改变观看距离；物件在故事坐标中的身份、路径与相邻结果保持不变。 */
  framing?: { at: [number, number]; scale: number };
  /** 可选共读分类；未声明的旧书稿沿用既有动作。 */
  reading?: 'observe' | 'simulate' | 'autonomous';
  /** 兑现来自实际页面顺序中的紧邻前页，不触发跳转或改写结果。 */
  responseTo?: string;
  bg?: Record<string, unknown>;
  props?: { id: string; kind: string; at: number[]; scale: number; [key: string]: unknown }[];
  hotspot?: Hotspot | Hotspot[];
  exit?: string;
  numbers?: PageNumber[];
  /** false 时关闭默认拍角色反馈，保留普通阅读翻页。 */
  pat?: boolean;
  [key: string]: unknown;
}

export function validateFraming(page: ManuscriptPage): void {
  const frame = page.framing;
  if (frame === undefined) return;
  if (!frame || !Array.isArray(frame.at) || frame.at.length !== 2 ||
      !frame.at.every(Number.isFinite) || !Number.isFinite(frame.scale) ||
      frame.scale < 0.5 || frame.scale > 2 ||
      Object.keys(frame).some(key => !['at', 'scale'].includes(key))) {
    throw new Error(page.id + ' 取景须使用有限的at坐标与0.5至2倍scale，请修正framing并重建');
  }
}

export function validateReading(page: ManuscriptPage): void {
  if (page.reading === undefined) {
    if (page.responseTo !== undefined) throw new Error(page.id + ' responseTo需要明确reading类别');
    return;
  }
  if (!['observe', 'simulate', 'autonomous'].includes(page.reading)) throw new Error(page.id + ' 未知reading类别');
  if (page.pat === true || page.trap) throw new Error(page.id + ' 共读可只看或模拟，不能设pat:true或trap');
  const hotspots = page.hotspot ? (Array.isArray(page.hotspot) ? page.hotspot : [page.hotspot]) : [];
  if (page.reading === 'autonomous' && hotspots.length) throw new Error(page.id + ' 角色自主动作不能绑定热区');
  if (page.reading === 'observe' && hotspots.some(h => !['find', 'count'].includes(h.action))) {
    throw new Error(page.id + ' 观察只允许find/count确认，不得移动或吃掉对象');
  }
  if (hotspots.some(h => ['medicine', 'again', 'yawn', 'start'].includes(h.action))) {
    throw new Error(page.id + ' 共读正文不能绑定药物或阅读出口动作');
  }
}

export function validateResponses(pages: readonly ManuscriptPage[]): void {
  pages.forEach((page, index) => {
    validateReading(page);
    validateFraming(page);
    if (page.responseTo !== undefined && (index === 0 || pages[index - 1].id !== page.responseTo)) {
      throw new Error(page.id + ' responseTo必须指向实际顺序的紧邻前页');
    }
  });
}

export const sceneKinds = ['room', 'window-nook', 'doorway', 'wall-corner', 'play-mat', 'grass'] as const;
export const sceneLights = ['day', 'dusk', 'night', 'late-night'] as const;
export interface SceneSpec {
  kind: typeof sceneKinds[number];
  light?: typeof sceneLights[number];
  /** false时草丛退为角色身后；默认保留前景遮挡。 */
  occlude?: boolean;
  /** 草丛水平展开比例，同一场景链保持一致；默认1。 */
  grassScale?: number;
}
export type PageScene = SceneSpec & { side: 'left' | 'right' };

/** 场景按实际装订配对分幅；不重排数据，也不按页号另造左右页表。 */
export function withSpreadScene<T extends { id: string; scene?: unknown }>(pages: readonly T[], scene?: SceneSpec): Array<T & { scene?: PageScene }> {
  if (pages.some(page => page?.scene !== undefined)) throw new Error('场景须在跨页统一声明scene，不在页内改换');
  if (scene === undefined) return [...pages] as Array<T & { scene?: PageScene }>;
  if (!scene || !sceneKinds.includes(scene.kind)) throw new Error('未知场景，请使用共用场景kind');
  if (scene.light !== undefined && !sceneLights.includes(scene.light)) throw new Error('未知场景光照，请使用day/dusk/night/late-night');
  if (Object.keys(scene).some(key => !['kind', 'light', 'occlude', 'grassScale'].includes(key))) throw new Error('场景须在跨页统一声明kind/light，不手填分幅');
  if (scene.grassScale !== undefined && (scene.kind !== 'grass' || !Number.isFinite(scene.grassScale) || scene.grassScale < 1 || scene.grassScale > 2)) throw new Error('草丛grassScale须在1至2之间');
  if (scene.occlude !== undefined && typeof scene.occlude !== 'boolean') throw new Error('场景occlude必须是布尔值');
  const groups = physicalSpreads(pages);
  if (groups.some(group => group.length !== 2)) throw new Error('共享场景需要偶数页与紧邻奇数页组成相邻双页，请检查pages顺序');
  return groups.flatMap(group => group.map((page, i) => ({
    ...page, scene: { kind: scene.kind, light: scene.light, ...(scene.occlude === undefined ? {} : {occlude: scene.occlude}), ...(scene.grassScale === undefined ? {} : {grassScale: scene.grassScale}), side: i === 0 ? 'left' as const : 'right' as const },
  })));
}

export interface Spread {
  background?: Record<string, unknown>;
  scene?: SceneSpec;
  pages: ManuscriptPage[];
}
