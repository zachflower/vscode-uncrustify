import {ok} from 'assert';
import { before, describe, it } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as util from '../../util';

describe('utility functions', () => {
    describe('get platform suffixes', () => {
        it('should properly parse each context', () => {
            ok(util.getPlatformSuffix('linux') === '.linux');
            ok(util.getPlatformSuffix('darwin') === '.osx');
            ok(util.getPlatformSuffix('win32') === '.windows');
            ok(util.getPlatformSuffix('unknown') === undefined);
        });
    });

    describe('get extension config', () => {
        describe('default workspace folder', () => {
            let config;

            before(() => {
                config = util.getExtensionConfig();
            });

            it('should retrieve the linux config', () => {
                ok(config.get("configPath.linux") === 'uncrustify.linux.cfg');
            });

            it('should fall back to the workspace config', () => {
                ok(config.get("configPath.windows") === 'uncrustify.cfg');
            });
        });

        describe('passed workspace folder', () => {
            let config;

            before(() => {
                const workspaceFolder = vscode.workspace.workspaceFolders.find((folder) => {
                    return folder.name === "windows";
                });

                config = util.getExtensionConfig(workspaceFolder.uri);
            });

            it('should retreve the windows config', () => {
                ok(config.get("configPath.windows") === 'uncrustify.windows.cfg');
            });

            it('should fall back to the workspace config', () => {
                ok(config.get("configPath.linux") === 'uncrustify.cfg');
            });
        });
    });
});
