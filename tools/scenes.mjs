/* 共用场景只提供环境，不创建角色、故事物件或动作。 */
import { sceneKinds, sceneLights } from '../src/js/model.ts';

export function sceneView(scene, bg) {
  if (scene === undefined) return null;
  if (!scene || !sceneKinds.includes(scene.kind)) throw new Error('未知场景，请检查跨页scene.kind');
  if (!['left', 'right'].includes(scene.side)) throw new Error('场景缺少装订分幅，请通过withSpreadScene或loadBooks生成');
  // 空间始终共享；省略光照时跟随已有页内底色，允许正文支持的右页入夜。
  const light = scene.light || (['--wash-night', '--night'].includes(bg?.wash) ? 'night' : 'day');
  if (!sceneLights.includes(light)) throw new Error('未知场景光照：' + light);
  const dark = light === 'night' || light === 'late-night';
  const base = bg?.wash || (dark ? '--wash-night' : '--paper');
  if (!/^--[a-z][a-z0-9-]*$/.test(base)) throw new Error('场景底色必须使用已有色板变量');
  return {
    kind: scene.kind, side: scene.side, light, base,
    symbol: 'scene-' + scene.kind,
    vegetationTransform: `translate(${1850 * (1 - (scene.grassScale || 1))} 0) scale(${scene.grassScale || 1} 1)`,
    foreground: scene.kind === 'grass' && scene.occlude !== false ? 'scene-grass-front' : null,
    backdrop: scene.kind === 'grass' && scene.occlude === false ? 'scene-grass-front' : null,
    transform: scene.side === 'left' ? 'translate(0 0)' : 'translate(-1000 0)',
    vars: [
      `--scene-base:var(${base})`,
      `--scene-ink:var(${dark ? '--paper' : '--ink'})`,
      `--scene-line-opacity:${light === 'late-night' ? '.08' : dark ? '.14' : '.24'}`,
      `--scene-shape-opacity:${light === 'late-night' ? '.015' : dark ? '.035' : '.28'}`,
      `--scene-castle-opacity:${light === 'late-night' ? '.015' : dark ? '.035' : '.65'}`,
      `--scene-island-opacity:${light === 'late-night' ? '.015' : dark ? '.025' : '.23'}`,
      `--scene-sky:var(${dark ? '--night' : light === 'dusk' ? '--wash-orange' : '--wash-blue'})`,
      `--scene-grass-opacity:${light === 'late-night' ? '.1' : dark ? '.2' : '.7'}`,
      `--scene-grass-front:var(${dark ? '--night' : '--green'})`,
    ].join(';'),
  };
}
