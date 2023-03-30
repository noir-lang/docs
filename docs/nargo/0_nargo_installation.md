---
title: Installation
description:
  nargo is a command line tool for interacting with Noir programs (e.g. compiling, proving,
  verifying and more). Learn how to install and use Nargo for your projects with this comprehensive
  guide.
keywords: [Nargo, command line tool, Noir programs, installation guide, how to use Nargo]
---

# Installation

We'll download Nargo through `noirup`, a command line tool for managing Noir versions and associated tools. You'll need an internet connection for the download.

> Note: `noirup` currently only supports Linux and macOS. If you're using Windows, please see the section TODO

Optionally you can also install [Noir VS Code extension] for syntax highlighting.

## Installing `noirup` on Linux or macOS

If you’re using Linux or macOS, open a terminal and enter the following command:

```bash
curl -L https://github.com/noir-lang/noirup/releases/download/v0.1.1/noirup | bash
```

The command downloads a script and starts the installation of the `noirup` tool. If the install is successful, the following line will appear:

```
Detected your preferred shell is bash and added noirup to PATH. Run 'source /home/user/.bashrc' or start a new terminal session to use noirup.
Then, simply run 'noirup' to install Nargo.
```

The installation of `noirup` can be verified by running the command

```bash
$ noirup --help
The installer for Nargo.
Update or revert to a specific Nargo version with ease.
USAGE:
    noirup <OPTIONS>
OPTIONS:
    -h, --help      Print help information
    -v, --version   Install a specific version
    -b, --branch    Install a specific branch
    -P, --pr        Install a specific Pull Request
    -C, --commit    Install a specific commit
    -r, --repo      Install from a remote GitHub repo (uses default branch if no other options are set)
    -p, --path      Install a local repository
```

## Installing Nargo

Once `noirup` has been installed there are two approaches of installing Nargo. Either installing one of the prebuilt binaries distributed by the Noir team or building from source.

Prebuilt binaries are much easier to install however the backend runs within WASM which impacts performance. Building from source runs the backend natively and so is recommended in performance critical scenarios.

## Prebuilt Binaries

Noirup allows installation of prebuilt binaries for stable releases of Noir. For example, you can install the `0.3.2` release of Nargo by running the command

```bash
noirup -v 0.3.2
```

See [GitHub Releases](https://github.com/noir-lang/noir/releases/) to see other versions which can be installed.

### Updating Nargo

Once Nargo is installed via `noirup`, updating to a newly released version is easy. From your shell, run the same command again with the version of Nargo you wish to install.

```bash
noirup -v 0.4.0
```

## Compilation from Source

### Installing dependencies

In order to compile Nargo `noirup` requires access to [Git] and [Rust] so these must be installed. As well as the dependencies for Nargo you must install the dependencies for the [Barretenberg] proving backend.

#### macOS

Installing through [Homebrew] is recommended:

```bash
brew install cmake llvm libomp
```

#### Ubuntu (Linux)

```bash
sudo apt update && sudo apt install clang lld cmake libomp-dev
```

Other variants of Linux will need to adjust the commands for their package manager.

### Compilation

Once all of Nargo's and Barretenberg's dependencies are installed, you can compile Nargo by calling

```bash
noirup -c 29b1f7d  # Commit hash of 0.3.2 release
```

### Verifying installation

Check if the installation was successful by running `nargo --help`.

> **macOS:** If you are prompted with an OS alert, right-click and open the _nargo_ executable from Finder. Close the new terminal popped up and `nargo` should now be accessible.

For a successful installation, you should see something similar to the following after running the command:

```
$ nargo --help
nargo 0.3.2

Usage: nargo <COMMAND>

Commands:
   check             Checks the constraint system for errors
   codegen-verifier  Generates a Solidity verifier smart contract for the program
   compile           Compile the program and its secret execution trace into ACIR format
   new               Create a new binary project
   execute           Executes a circuit to calculate its return value
   prove             Create proof for this program. The proof is returned as a hex encoded string
   verify            Given a proof and a program, verify whether the proof is valid
   test              Run the tests for this program
   gates             Counts the occurrences of different gates in circuit
   help              Print this message or the help of the given subcommand(s)
```

## Installing on Windows

While it's not possible to install Nargo using `noirup` on Windows, the Noir team does distribute prebuilt binaries on Windows.

In order to install the latest version of Nargo, open PowerShell as Administrator and run:

```sh
mkdir -f -p "$env:USERPROFILE\.nargo\bin\"; `
Invoke-RestMethod -Method Get -Uri https://github.com/noir-lang/noir/releases/download/nightly/nargo-x86_64-pc-windows-msvc.zip -Outfile "$env:USERPROFILE\.nargo\bin\nargo-x86_64-pc-windows-msvc.zip"; `
Expand-Archive -Path "$env:USERPROFILE\.nargo\bin\nargo-x86_64-pc-windows-msvc.zip" -DestinationPath "$env:USERPROFILE\.nargo\bin\"; `
$Reg = "Registry::HKLM\System\CurrentControlSet\Control\Session Manager\Environment"; `
$OldPath = (Get-ItemProperty -Path "$Reg" -Name PATH).Path; `
$NewPath = $OldPath + ’;’ + "$env:USERPROFILE\.nargo\bin\"; `
Set-ItemProperty -Path "$Reg" -Name PATH –Value "$NewPath"; `
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

[git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[rust]: https://www.rust-lang.org/tools/install
[noir vs code extension]: https://marketplace.visualstudio.com/items?itemName=noir-lang.noir-programming-language-syntax-highlighter
[barretenberg]: https://github.com/AztecProtocol/barretenberg
[homebrew]: https://brew.sh/
