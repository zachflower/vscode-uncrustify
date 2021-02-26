import * as assert from 'assert';
import { before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as util from '../../util';

suite('utility functions', () => {
    test('get platform suffix', () => {
        assert.strictEqual(util.getPlatformSuffix('linux'), '.linux');
        assert.strictEqual(util.getPlatformSuffix('darwin'), '.osx');
        assert.strictEqual(util.getPlatformSuffix('win32'), '.windows');
        assert.strictEqual(util.getPlatformSuffix('unknown'), undefined);
    });
});
