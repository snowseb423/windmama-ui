
export const LEFTACTIVE = 'LEFTACTIVE';
export function leftActive() {
  return {
    type: LEFTACTIVE,
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export const RIGHTACTIVE = 'RIGHTACTIVE';
export function rightActive() {
  return {
    type: RIGHTACTIVE,
    width: window.innerWidth,
    height: window.innerHeight
  };
}
