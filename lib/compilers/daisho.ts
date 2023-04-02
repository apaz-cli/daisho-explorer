import {BaseCompiler} from '../base-compiler.js';
import {DaishoParser} from './argument-parsers.js';

export class DaishoCompiler extends BaseCompiler {
    static get key() {
        return 'daisho';
    }
    override getArgumentParser() {
        return DaishoParser;
    }
}
