mssqlbackup
===========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mssqlbackup.svg)](https://npmjs.org/package/mssqlbackup)
[![Downloads/week](https://img.shields.io/npm/dw/mssqlbackup.svg)](https://npmjs.org/package/mssqlbackup)
[![License](https://img.shields.io/npm/l/mssqlbackup.svg)](https://github.com/Desktop/https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mssqlbackup
$ mssqlbackup COMMAND
running command...
$ mssqlbackup (-v|--version|version)
mssqlbackup/1.1.3 win32-x64 node-v10.16.2
$ mssqlbackup --help [COMMAND]
USAGE
  $ mssqlbackup COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mssqlbackup activate-service`](#mssqlbackup-activate-service)
* [`mssqlbackup create`](#mssqlbackup-create)
* [`mssqlbackup deactivate-service`](#mssqlbackup-deactivate-service)
* [`mssqlbackup delete`](#mssqlbackup-delete)
* [`mssqlbackup edit`](#mssqlbackup-edit)
* [`mssqlbackup help [COMMAND]`](#mssqlbackup-help-command)
* [`mssqlbackup prepare`](#mssqlbackup-prepare)
* [`mssqlbackup restart`](#mssqlbackup-restart)
* [`mssqlbackup show`](#mssqlbackup-show)

## `mssqlbackup activate-service`

activates the windows service feature

```
USAGE
  $ mssqlbackup activate-service

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\activate-service.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\activate-service.js)_

## `mssqlbackup create`

creates a new config file

```
USAGE
  $ mssqlbackup create

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\create.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\create.js)_

## `mssqlbackup deactivate-service`

deactivates the windows service feature

```
USAGE
  $ mssqlbackup deactivate-service

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\deactivate-service.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\deactivate-service.js)_

## `mssqlbackup delete`

activates the windows service feature

```
USAGE
  $ mssqlbackup delete

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\delete.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\delete.js)_

## `mssqlbackup edit`

edits a conf file

```
USAGE
  $ mssqlbackup edit

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\edit.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\edit.js)_

## `mssqlbackup help [COMMAND]`

display help for mssqlbackup

```
USAGE
  $ mssqlbackup help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src\commands\help.ts)_

## `mssqlbackup prepare`

prepares the server

```
USAGE
  $ mssqlbackup prepare

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\prepare.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\prepare.js)_

## `mssqlbackup restart`

restarts the windows service feature

```
USAGE
  $ mssqlbackup restart

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\restart.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\restart.js)_

## `mssqlbackup show`

shows all config files installed

```
USAGE
  $ mssqlbackup show

OPTIONS
  -n, --name=name  name to print
```

_See code: [src\commands\show.js](https://github.com/AlexanderGaussAG/Node-Backup-Server/blob/v1.1.3/src\commands\show.js)_
<!-- commandsstop -->
