// Copyright (c) 2012, Compiler Explorer Authors
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
import * as monaco from 'monaco-editor';

import './nc-mode';

function definition(): monaco.languages.IMonarchLanguage {
    return {
        keywords: [
            '%define',
            '%oom',
            '%node',
            '%include',
            '%preinclude',
            '%postinclude',
            '%code',
            '%precode',
            '%postcode',
            '%define',
            '%predefine',
            '%postdefine',
            '%extra',
            '%extrainit',
            '%context',
            '%contextinit',
        ],

        opsymbols: /[/&!?*+:|<\->]+/,
        operators: ['/', '&', '!', '?', '*', '+', ':', '|', '<-', '->'],
        delimsymbols: /[,;]+/,
        delims: [',', ';'],

        // C# style strings
        escapes: /\\./,

        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // whitespace
                [/[ \t\r\n]+/, 'white'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment'],

                // UpperIdent
                [/[_A-Z]+/, 'type.identifier'],

                // LowerIdent
                [
                    /[_a-z]+/,
                    {
                        cases: {
                            '@keywords': 'keyword',
                            '@default': 'identifier',
                        },
                    },
                ],

                // Directive
                [
                    /%[_a-z]*/,
                    {
                        cases: {
                            '@keywords': 'keyword',
                            '@default': 'identifier',
                        },
                    },
                ],

                // CodeExpr
                [/\{\}/, 'meta.content', '@push'],

                // numbers
                [/-?[0-9]+/, 'number'],

                // delimiters and operators
                [/[{}()[\]]/, '@brackets'],
                [
                    '@delimsymbols',
                    {
                        cases: {
                            '@delims': 'delimiter',
                            '@default': 'invalid',
                        },
                    },
                ],
                [
                    '@opsymbols',
                    {
                        cases: {
                            '@operators': 'operator',
                            '@default': 'invalid',
                        },
                    },
                ],

                // strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/"/, {token: 'string.quote', bracket: '@open', next: '@string'}],

                // characters
                [/'[^\\']'/, 'string'],
                [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                [/'/, 'string.invalid'],
            ],

            comment: [
                [/[^/*]+/, 'comment'],
                [/\/\*/, 'comment', '@push'],
                ['\\*/', 'comment', '@pop'],
                [/[/*]/, 'comment'],
            ],

            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, {token: 'string.quote', bracket: '@close', next: '@pop'}],
            ],
        },
    };
}

const def = definition();
monaco.languages.register({id: 'pgen'});
monaco.languages.setMonarchTokensProvider('pgen', def);

export = def;
