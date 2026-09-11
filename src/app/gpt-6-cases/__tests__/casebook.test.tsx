import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import collection from '@/data/casebooks/gpt-6.json';
import Casebook from '../casebook';

beforeEach(() => {
  window.history.replaceState(null, '', '/gpt-6-cases');
  Element.prototype.scrollIntoView = jest.fn();
});

it('reveals a linked case even when the current category hides it', async () => {
  render(<Casebook collection={collection} />);
  fireEvent.click(screen.getByRole('button', { name: '办公研究 1' }));
  expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(document.getElementById('globe-dashboard')).toBeNull();
  act(() => {
    window.history.replaceState(null, '', '#globe-dashboard');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  await waitFor(() => expect(document.querySelector('#globe-dashboard details')).toHaveAttribute('open'));
  expect(screen.getAllByRole('article')).toHaveLength(20);
});

it('opens a directly linked practice on arrival', () => {
  window.history.replaceState(null, '', '#p-visual-loop');
  render(<Casebook collection={collection} />);
  expect(document.getElementById('p-visual-loop')).toHaveAttribute('open');
});

it('copies the editable task template and reports clipboard failure honestly', async () => {
  const writeText = jest.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('denied'));
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  render(<Casebook collection={collection} />);
  fireEvent.click(screen.getByRole('button', { name: '复制模板' }));
  await screen.findByRole('button', { name: '已复制' });
  expect(writeText).toHaveBeenCalledWith(expect.stringContaining('【具体任务】'));
  fireEvent.click(screen.getByRole('button', { name: '已复制' }));
  await screen.findByRole('button', { name: '请选中下方文字复制' });
});
