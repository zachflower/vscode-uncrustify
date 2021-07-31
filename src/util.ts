import * as path from 'path';
import * as vsc from 'vscode';

const DEFAULT_CONFIG_FILE_NAME = 'uncrustify.cfg';
const DEFAULT_PATH = 'uncrustify';
const DEFAULT_MODES = [
    'c',
    'cpp',
    'csharp',
    'd',
    'java',
    'objective-c',
    'pawn',
    'pde',
    'vala'
];

const SUPPORTED_PLATFORM_NAMES = {
    'linux': '.linux',
    'darwin': '.osx',
    'win32': '.windows'
};

/**
 * Retrieves the uncrustify language settings.
 *
 * @return Array of default language modes and any configured overrides.
 */
export function modes() : Array<string> {
    const config = getExtensionConfig();
    const overrides = config.get<Record<string, unknown>>('langOverrides', {});

    return DEFAULT_MODES.concat(Object.getOwnPropertyNames(overrides));
}

/**
 * Retrieves the configured path to the `uncrustify` configuration file.
 *
 * @return An absolute path to an `uncrustify` configuration file.
 */
export function configPath() : string {
    const folderUri = getWorkspacePath();
    const config = getExtensionConfig(folderUri);

    let p = config.get<string>(`configPath${getPlatformSuffix()}`, DEFAULT_CONFIG_FILE_NAME);

    // interpret environment variables
    p = p.replace(/(%\w+%)|(\$\w+)/g, variable => {
        const end = variable.startsWith('%') ? 2 : 1;
        return process.env[variable.substr(1, variable.length - end)];
    });

    // interpret ${workspaceFolder} variable
    p = p.replace(/\$\{workspaceFolder\}/, (_, name) => {
        return folderUri.fsPath;
    });

    // interpret ${workspaceFolder:<folder>} variables
    p = p.replace(/\$\{workspaceFolder:(.*?)\}/, (_, name) => {
        return vsc.workspace.workspaceFolders.find(wf => wf.name == name).uri.fsPath;
    });

    // prefix relative paths with the detected workspace folder
    if (!path.isAbsolute(p)) {
        p = path.join(folderUri.fsPath, p);
    }

    return p;
}

/**
 * Retrieves the configured `uncrustify` executable path.
 *
 * @return The path or name of the `uncrustify` executable.
 */
export function executablePath() : string {
    const folderUri = getWorkspacePath();
    const config = getExtensionConfig(folderUri);
        
    let execPath = config.get<string>(`executablePath${getPlatformSuffix()}`, DEFAULT_PATH);
    
    execPath = execPath.replace(/\$\{workspaceFolder\}/, (_, name) => {
        return folderUri.fsPath;
    });

    // interpret ${workspaceFolder:<folder>} variables
    execPath = execPath.replace(/\$\{workspaceFolder:(.*?)\}/, (_, name) => {
        return vsc.workspace.workspaceFolders.find(wf => wf.name == name).uri.fsPath;
    });

    // prefix relative paths with the detected workspace folder
    if (!path.isAbsolute(execPath)) {
        execPath = path.join(folderUri.fsPath, execPath);
    }

    return execPath;
}

/**
 * Determines the workspace path relative to the currently open document, or the
 * first workspace found.
 *
 * @return A workspace folder.
 */
export function getWorkspacePath() : vsc.Uri {
    let folderUri: vsc.Uri;
    const workspaces = vsc.workspace.workspaceFolders || [];
    const textEditors = [vsc.window.activeTextEditor];

    if (workspaces.length === 0) {
        return folderUri;
    }

    textEditors.push(...vsc.window.visibleTextEditors);

    // if there is a document open in the editor, use its workspace folder
    for (const textEditor of textEditors.filter(e => e)) {
        const workspace: vsc.WorkspaceFolder = vsc.workspace.getWorkspaceFolder(textEditor.document.uri);

        if (workspace) {
            return workspace.uri;
        }
    }

    return workspaces[0].uri;
}

/**
 * Retrieves the extension configuration object for the `uncrustify` extension
 *
 * @param folderUri A scope for which the configuration is asked for.
 *
 * @return The `uncrustify` extension configuration object
 */
export function getExtensionConfig(folderUri?: vsc.Uri) : vsc.WorkspaceConfiguration {
    return vsc.workspace.getConfiguration('uncrustify', folderUri ?? getWorkspacePath());
}

/**
 * Retrieves the configuration suffix for the current platform
 *
 * @param platform The platform to retrieve the platform suffix for
 *
 * @return The platform configuration suffix
 */
export function getPlatformSuffix(platform?: string) : string {
    return SUPPORTED_PLATFORM_NAMES[platform ?? process.platform];
}
