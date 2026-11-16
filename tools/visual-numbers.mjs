/* 版式与对比度共用数字预期。只改变验收浏览器的显示状态，不改书稿或成品。 */
export async function prepareNumbers(page, specs, scope) {
  // 去掉验收时的过渡，仍由真正的 .is-on 样式决定是否能显示，不能强制覆盖 opacity。
  await page.addStyleTag({ content: '.number{transition:none!important;animation:none!important}' });
  const expected = specs.map(spec => ({ book: spec.book, id: spec.id,
    numbers: (spec.numbers || []).map(number => ({ text: number.text, on: Boolean(number.on) })),
  }));
  return page.evaluate(({ expected, scope }) => {
    const problems = [];
    let declared = 0;
    let shown = 0;
    function visible(node) {
      const box = node.getBoundingClientRect();
      return box.width > 0 && box.height > 0 &&
        node.checkVisibility({ opacityProperty: true, visibilityProperty: true });
    }
    for (const spec of expected) {
      const label = `[${spec.book}/${spec.id}]（${scope === 'screen' ? '屏幕版' : '印刷/拼版'}）数字`;
      const host = document.querySelector(`.page[data-book="${spec.book}"][data-id="${spec.id}"]`);
      declared += spec.numbers.length;
      if (!host) {
        if (spec.numbers.length) problems.push(label + ' 所在页面缺失，请重新构建并检查页面模板');
        continue;
      }
      const nodes = host.querySelectorAll('.number');
      if (nodes.length !== spec.numbers.length) problems.push(
        label + ` 数量与书稿不一致：预期 ${spec.numbers.length}，实际 ${nodes.length}；请核对 numbers 与页面模板`
      );
      for (const [index, number] of spec.numbers.entries()) {
        const slot = 'num-' + (index + 1);
        const matches = host.querySelectorAll('.number.' + slot);
        if (matches.length !== 1) {
          problems.push(label + ' ' + slot + ' 缺失或不唯一，请保留数字槽位与互动索引');
          continue;
        }
        const node = matches[0];
        if (typeof number.text !== 'string' || !number.text.trim() || node.textContent.trim() !== number.text.trim()) {
          problems.push(label + ' ' + slot + ' 文字与书稿不一致，请按 numbers[].text 重新构建');
        }
        if (node.classList.contains('is-on') !== number.on) problems.push(
          label + ' ' + slot + ' 初始应' + (number.on ? '显示' : '隐藏') + '，请核对 numbers[].on 与渲染标记'
        );
        if (number.on && !visible(node)) problems.push(
          label + ' ' + slot + ' 初始应显示但不可见或无布局，请检查隐藏、透明度与尺寸'
        );
        if (!number.on && visible(node)) problems.push(
          label + ' ' + slot + ' 初始应隐藏但可见，请保留点数前的隐藏状态'
        );
        // 纸书保留自己的初始状态；屏幕还要测量互动显示后的数字，不能因初始隐藏而漏检。
        if (!number.on && scope === 'screen') {
          node.classList.add('is-on');
          if (!visible(node)) problems.push(
            label + ' ' + slot + ' 互动显示后仍不可见或无布局，请检查 .number.is-on 的样式'
          );
        }
        if (visible(node)) shown++;
      }
    }
    return { problems, declared, shown };
  }, { expected, scope });
}
