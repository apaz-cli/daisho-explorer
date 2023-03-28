import {ParseFiltersAndOutputOptions} from '../../types/features/filters.interfaces';
import {BaseCompiler} from '../base-compiler';
import {PgenParser} from './argument-parsers';

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
