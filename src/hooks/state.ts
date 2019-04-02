import { useRef, useState, MutableRefObject } from 'react';

export function useToggle(defaultState: boolean): [boolean, Function] {
  const [toggle, onToggle] = useState(defaultState);

  return [toggle, () => onToggle(!toggle)];
}

export function useMenu<T>(): [boolean, MutableRefObject<null | T>, () => void, () => void] {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<null | T>(null);

  return [open, anchorEl, () => setOpen(true), () => setOpen(false)];
}
