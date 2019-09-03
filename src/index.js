import Feather_ttf from 'react-native-vector-icons/Fonts/Feather.ttf';
require('./index.web.tsx')

const IconsCSS = `
@font-face {
  src: url(${Feather_ttf});
  font-family: Feather;
}
`;

const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) style.styleSheet.cssText = IconsCSS;
else style.appendChild(document.createTextNode(IconsCSS));

document.head.appendChild(style);
