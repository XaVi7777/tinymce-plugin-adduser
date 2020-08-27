import plugin from '../scripts/my.tinymce.plugin';
import auctocompleter from '../scripts/autocompleter.tiny';
import "regenerator-runtime/runtime.js";
import init from '../scripts/tinymce.init';

plugin('example');
auctocompleter('auctocompleter');
init();