# Nargo

`nargo` is a command line tool for interacting with Noir programs (e.g. compiling, proving, verifying and more).

Alternatively, the interactions can also be performed in [TypeScript](typescript.md).

## Installation

There are two approaches to install Nargo:

- [Option 1: Binaries](#option-1-binaries)
- [Option 2: Compile from Source](#option-2-compile-from-source)

Optionally you can also install [Noir VS Code extension] for syntax highlighting.

### Option 1: Binaries

#### Step 1

Paste and run the following in the terminal to extract and install the binary:

> **macOS / Linux:** If you are prompted with `Permission denied` when running commands, prepend `sudo` and re-run it.

##### macOS (Apple Silicon)

```bash
mkdir -p $HOME/.nargo/bin && \
curl -o $HOME/.nargo/bin/nargo-aarch64-apple-darwin.tar.gz -L https://github.com/noir-lang/noir/releases/download/nightly/nargo-aarch64-apple-darwin.tar.gz && \
tar -xvf $HOME/.nargo/bin/nargo-aarch64-apple-darwin.tar.gz -C $HOME/.nargo/bin/ && \
mkdir -p "$HOME/Library/Application Support/noir-lang" && \
cp -R $HOME/.nargo/bin/noir-lang/* "$HOME/Library/Application Support/noir-lang/" && \
echo '\nexport PATH=$PATH:$HOME/.nargo/bin' >> ~/.zshrc && \
source ~/.zshrc
```

##### macOS (Intel)

```bash
mkdir -p $HOME/.nargo/bin && \
curl -o $HOME/.nargo/bin/nargo-x86_64-apple-darwin.tar.gz -L https://github.com/noir-lang/noir/releases/download/nightly/nargo-x86_64-apple-darwin.tar.gz && \
tar -xvf $HOME/.nargo/bin/nargo-x86_64-apple-darwin.tar.gz -C $HOME/.nargo/bin/ && \
mkdir -p "$HOME/Library/Application Support/noir-lang" && \
cp -R $HOME/.nargo/bin/noir-lang/* "$HOME/Library/Application Support/noir-lang/" && \
echo '\nexport PATH=$PATH:$HOME/.nargo/bin' >> ~/.zshrc && \
source ~/.zshrc
```

##### Windows (PowerShell)

Open PowerShell as Administrator and run:

```sh
mkdir -f -p "$env:USERPROFILE\.nargo\bin\"; `
Invoke-RestMethod -Method Get -Uri https://github.com/noir-lang/noir/releases/download/nightly/nargo-x86_64-pc-windows-msvc.zip -Outfile "$env:USERPROFILE\.nargo\bin\nargo-x86_64-pc-windows-msvc.zip"; `
Expand-Archive -Path "$env:USERPROFILE\.nargo\bin\nargo-x86_64-pc-windows-msvc.zip" -DestinationPath "$env:USERPROFILE\.nargo\bin\"; `
mkdir -f -p "$env:APPDATA\noir-lang"; `
cp -R "$env:USERPROFILE\.nargo\bin\noir-lang\*" "$env:APPDATA\noir-lang\"; `
$Reg = "Registry::HKLM\System\CurrentControlSet\Control\Session Manager\Environment"; `
$OldPath = (Get-ItemProperty -Path "$Reg" -Name PATH).Path; `
$NewPath = $OldPath + ’;’ + "$env:USERPROFILE\.nargo\bin\"; `
Set-ItemProperty -Path "$Reg" -Name PATH –Value "$NewPath"; `
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

##### Linux (Bash)

See [GitHub Releases](https://github.com/noir-lang/noir/releases/tag/nightly) for additional platform specific binaries.

```bash
mkdir -p $HOME/.nargo/bin && \
curl -o $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -L https://github.com/noir-lang/noir/releases/download/nightly/nargo-x86_64-unknown-linux-gnu.tar.gz && \
tar -xvf $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -C $HOME/.nargo/bin/ && \
mkdir -p $HOME/.config/noir-lang
cp -r $HOME/.nargo/bin/noir-lang/* "$HOME/.config/noir-lang/"
echo '\nexport PATH=$PATH:$HOME/.nargo/bin' >> ~/.bashrc && \
source ~/.bashrc
```

#### Step 2

Check if the installation was successful by running `nargo --help`.

> **macOS:** If you are prompted with an OS alert, right-click and open the _nargo_ executable from Finder. Close the new terminal popped up and `nargo` should now be accessible.

For a successful installation, you should see something similar to the following after running the command:

```
$ nargo --help
nargo 0.1
Kevaundray Wedderburn <kevtheappdev@gmail.com>
Noir's package manager

USAGE:
   nargo [SUBCOMMAND]

FLAGS:
   -h, --help       Prints help information
   -V, --version    Prints version information

SUBCOMMANDS:
   build       Builds the constraint system
   compile     Compile the program and its secret execution trace into ACIR format
   contract    Creates the smart contract code for circuit
   gates       Counts the occurences of different gates in circuit
   help        Prints this message or the help of the given subcommand(s)
   new         Create a new binary project
   prove       Create proof for this program
   verify      Given a proof and a program, verify whether the proof is valid
```

### Option 2: Compile from Source

#### Setup

1. Install [Git] and [Rust].

2. Download Noir's source code from Github by running:

   ```bash
   git clone git@github.com:noir-lang/noir.git
   ```

3. Change directory into the Noir project by running:

   ```bash
   cd noir
   ```

There are then two approaches to proceed, differing in how the proving backend is installed:

#### Option 2.1: Install Executable with WASM backend

4. Install Nargo by running:

   ```bash
   cargo install --locked --path=crates/nargo --no-default-features --features plonk_bn254_wasm
   ```

#### Option 2.2: Install Executable with Native Backend

The [barretenberg] proving backend is written in C++, hence compiling it from source would first require certain dependencies to be installed.

4. Install [CMake], [LLVM] and [OpenMP]:

##### macOS

   Installing through [Homebrew] is recommended:

   ```bash
   brew install cmake llvm libomp
   ```

##### Ubuntu (Linux)

   ```bash
   sudo apt update && sudo apt install clang lld cmake libomp-dev
   ```

   Other variants of Linux will need to adjust the commands for their package manager.

##### Windows

   ```sh
   TBC
   ```

5. Install Nargo by running:

   ```bash
   cargo install --locked --path=crates/nargo
   ```

#### Verify Installation

6. Check if the installation was successful by running `nargo --help`:

   ```
   $ nargo --help
   nargo 0.1
   Kevaundray Wedderburn <kevtheappdev@gmail.com>
   Noir's package manager

   USAGE:
      nargo [SUBCOMMAND]

   FLAGS:
      -h, --help       Prints help information
      -V, --version    Prints version information

   SUBCOMMANDS:
      build       Builds the constraint system
      compile     Compile the program and its secret execution trace into ACIR format
      contract    Creates the smart contract code for circuit
      gates       Counts the occurences of different gates in circuit
      help        Prints this message or the help of the given subcommand(s)
      new         Create a new binary project
      prove       Create proof for this program
      verify      Given a proof and a program, verify whether the proof is valid
   ```

[git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[rust]: https://www.rust-lang.org/tools/install
[noir vs code extension]: https://marketplace.visualstudio.com/items?itemName=noir-lang.noir-programming-language-syntax-highlighter
[barretenberg]: https://github.com/AztecProtocol/aztec-connect/tree/master/barretenberg
[homebrew]: https://brew.sh/
[cmake]: https://cmake.org/install/
[llvm]: https://llvm.org/docs/GettingStarted.html
[openmp]: https://openmp.llvm.org/
