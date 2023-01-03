export const getCharFromKeyCode = (keyCode) => {
  switch (keyCode) {
    case 37:
      return 'ArrowLeft';
    case 38:
      return 'ArrowUp';
    case 39:
      return 'ArrowRight';
    case 40:
      return 'ArrowDown';
    default:
      return '';
  }
};

export const getKeyCodeFromChar = (char) => {
  switch (char) {
    case 'ArrowLeft':
      return 37;
    case 'ArrowUp':
      return 38;
    case 'ArrowRight':
      return 39;
    case 'ArrowDown':
      return 40;
    default:
      return 0;
  }
};
