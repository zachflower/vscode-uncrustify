# VSCode uncrustify

[![.github/workflows/vscode.yml](https://github.com/zachflower/vscode-uncrustify/actions/workflows/vscode.yml/badge.svg)](https://github.com/zachflower/vscode-uncrustify/actions/workflows/vscode.yml)

[Uncrustify](https://github.com/uncrustify/uncrustify) is a highly configurable source code beautifier for C, C++, C#, ObjectiveC, D, Java, Pawn and VALA.

## Installing uncrustify

- Linux : Uncrustify is available in most distributions as a package in the official repositories (`sudo apt/yum install uncrustify` or equivalent)
- macOS : Uncrustify is available through Homebrew (`brew install uncrustify` or see http://macappstore.org/uncrustify)
- Windows : Prebuilt binaries are available on [sourceforge](https://sourceforge.net/projects/uncrustify/files). You will need to put the executable in your `PATH` variable and you will have to update it manually

If the executable is not in the PATH environment variable, you must set its path in the settings explicitly.

## Uncrustify configuration

A default config file can automatically be created (see the [commands](#extension-commands) below).

## Extension commands

* `Uncrustify: Create default config file` (`uncrustify.create`): Creates a default `uncrustify.cfg` file and puts it at the root of the current workspace.
* `Uncrustify: Open config file` (`uncrustify.open`): Opens the configuration file that is currently set in the extension settings.

## Extension settings

* `uncrustify.executablePath.[linux|osx|windows]` (`string`): Path to the uncrustify executable if it's not already in the PATH environment variable.
* `uncrustify.configPath.[linux|osx|windows]` (`string`): Path to the uncrustify configuration file. Environment variables can be used with either a Windows or a bash syntax (examples: `%SOME_PATH%/dev/uncrustify.cfg`, `$SOME_PATH/dev/uncrustify.cfg`). A relative path will be automatically prefixed with the current workspace path.
* `uncrustify.graphicalConfig` (`boolean`): Toggles the graphical config editor when opening an uncrustify config file.
* `uncrustify.debug` (`boolean`): Activates logs for debugging the extension. Logs should appear in the uncrustify output channel.
* `uncrustify.langOverrides` (`object`): Overrides the language used by uncrustify.

## Acknowledgements

This extension was originally created and maintained by [@LaurentTreguier](https://github.com/LaurentTreguier). While it has since been archived and removed from the extension marketplace, I have relied heavily on it over the past few years and have chosen to resurrect it. To that end, any of the good stuff in this extension undoubtedly comes from the original maintainer's hard work, and I will do my best to honor that.
