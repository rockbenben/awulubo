export {};
/** 一次进入页面拥有全部异步反馈。离开后，该次反馈再也不能写画面或完成任务。 */
interface Reader {
  cancelTurn(): void;
  finish(page: HTMLElement): void;
  goToId(id: string): void;
}
interface Visit {
  page: HTMLElement;
  alive: boolean;
  done: boolean;
  progress: { count: number; misses: number; assisting: boolean };
  frames: Set<number>;
  timers: Set<number>;
  pending?: { timer: number; finish: () => void };
}
declare global {
  interface Window {
    Book: Reader;
    BookEffects: typeof effects;
  }
}
const visits = new Map<HTMLElement, Visit>();
function visit(page: HTMLElement): Visit | undefined {
  return visits.get(page);
}
function valid(entry: Visit | undefined): entry is Visit {
  return !!entry?.alive && visits.get(entry.page) === entry;
}
function cancel(entry: Visit): void {
  entry.alive = false;
  entry.frames.forEach(cancelAnimationFrame);
  entry.timers.forEach(clearTimeout);
  entry.page.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
}
const effects = {
  begin(page: HTMLElement): boolean {
    if (!valid(visit(page))) return false;
    window.Book.cancelTurn();
    return true;
  },
  progress(page: HTMLElement): Visit['progress'] {
    const entry = visit(page);
    if (!valid(entry)) throw new Error('互动状态只属于当前书页的这次进入');
    return entry.progress;
  },
  enter(pages: HTMLElement[]): void {
    visits.forEach(cancel);
    visits.clear();
    for (const page of pages) {
      visits.set(page, {
        page, alive: true, done: false,
        progress: { count: 0, misses: 0, assisting: false },
        frames: new Set(), timers: new Set(),
      });
    }
  },
  capture(page: HTMLElement): () => boolean {
    const entry = visit(page);
    return () => valid(entry);
  },
  frame(page: HTMLElement, callback: FrameRequestCallback): void {
    const entry = visit(page);
    if (!valid(entry)) return;
    const id = requestAnimationFrame(time => {
      entry.frames.delete(id);
      if (valid(entry)) callback(time);
    });
    entry.frames.add(id);
  },
  delay(page: HTMLElement, ms: number, callback: () => void): number | undefined {
    const entry = visit(page);
    if (!valid(entry)) return;
    const id = window.setTimeout(() => {
      entry.timers.delete(id);
      if (valid(entry)) callback();
    }, ms);
    entry.timers.add(id);
    return id;
  },
  after(ms: number, callback: () => void, page: HTMLElement): void {
    const entry = visit(page);
    if (!valid(entry)) return;
    window.Book.cancelTurn();
    if (entry.pending) {
      clearTimeout(entry.pending.timer);
      entry.timers.delete(entry.pending.timer);
    }
    const finish = () => {
      if (!valid(entry)) return;
      entry.pending = undefined;
      callback();
    };
    const timer = effects.delay(page, ms, finish)!;
    entry.pending = { timer, finish };
  },
  skip(id: string): (() => void) | false {
    for (const entry of visits.values()) {
      if (entry.page.dataset.id !== id || !entry.pending) continue;
      const pending = entry.pending;
      clearTimeout(pending.timer);
      entry.timers.delete(pending.timer);
      entry.pending = undefined;
      return pending.finish;
    }
    return false;
  },
  pending(): string[] {
    return [...visits.values()].filter(entry => entry.pending).map(entry => entry.page.dataset.id!);
  },
  finish(page: HTMLElement): void {
    const entry = visit(page);
    if (!valid(entry) || entry.done) return;
    entry.done = true;
    window.Book.finish(page);
  },
  exit(page: HTMLElement): void {
    if (valid(visit(page)) && page.dataset.exit) window.Book.goToId(page.dataset.exit);
  },
};
window.BookEffects = effects;
