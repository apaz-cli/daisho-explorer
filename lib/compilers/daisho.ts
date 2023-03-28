import {BaseCompiler} from '../base-compiler';
import {DaishoParser} from './argument-parsers';

export class DaishoCompiler extends BaseCompiler {
    static get key() {
        return 'daisho';
    }
    override getArgumentParser() {
        return DaishoParser;
    }
}
