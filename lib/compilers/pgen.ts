import {ParseFiltersAndOutputOptions} from '../../types/features/filters.interfaces.js';
import {BaseCompiler} from '../base-compiler.js';
import {PgenParser} from './argument-parsers.js';

export class PgenCompiler extends BaseCompiler {
    static get key() {
        return 'pgen';
    }
    override getArgumentParser() {
        return PgenParser;
    }
    protected override optionsForFilter(
        filters: ParseFiltersAndOutputOptions,
        outputFilename: string,
        userOptions?: string[] | undefined,
    ): string[] {
        return ['-o', this.filename(outputFilename)];
    }
}
