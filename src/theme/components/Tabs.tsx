import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // import utility for setting light and dark mode props

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tabsAnatomy.keys,
);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  tab: {
    fontWeight: 'semibold', // change the font weight
  },
  tabpanel: {
    fontFamily: 'mono', // change the font family
  },
});

// define custom sizes
const sizes = {
  xl: definePartsStyle({
    // define the parts that will change for each size
    tab: {
      fontSize: 'xl',
      py: '4',
      px: '6',
    },
    tabpanel: {
      py: '4',
      px: '6',
      width: '80vw',
    },
  }),
};

// define custom variants
const colorfulVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props; // add colorScheme as a prop

  return {
    tab: {
      border: '2px solid',
      borderColor: 'transparent',
      bg: mode(`${c}.300`, `${c}.600`)(props),
      borderTopRadius: 'lg',
      borderBottom: 'none',
      _selected: {
        bg: mode('#fff', 'gray.800')(props),
        color: mode(`${c}.500`, `${c}.300`)(props),
        borderColor: mode(`${c}.500`, `${c}.300`)(props),
        borderBottom: 'none',
        mb: '-2px',
      },
    },
    tablist: {
      borderBottom: '2x solid',
      borderColor: mode(`${c}.500`, `${c}.300`)(props),
    },
    tabpanel: {
      border: '2px solid',
      borderColor: mode(`${c}.500`, `${c}.300`)(props),
      borderBottomRadius: 'lg',
      borderTopRightRadius: 'lg',
    },
  };
});

const variants = {
  colorful: colorfulVariant,
};

// define which sizes, variants, and color schemes are applied by default
const defaultProps: { size: 'xl'; variant: 'colorful'; colorScheme: 'green' } = {
  size: 'xl',
  variant: 'colorful',
  colorScheme: 'green',
};

// export the component theme
export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
});
