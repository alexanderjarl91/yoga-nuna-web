export type Theme = {
  name: string;
  colors: {
    background: string;
    primary: string;
  };
};

export const themes: Record<string, Theme> = {
  light: {
    name: 'Light',
    colors: {
      background: '#FFFFFF',
      primary: '#171717'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '#000000',
      primary: '#FFFFFF'
    }
  },
  red: {
    name: 'Red',
    colors: {
      background: '#660000',
      primary: '#3B82F6'
    }
  }
};