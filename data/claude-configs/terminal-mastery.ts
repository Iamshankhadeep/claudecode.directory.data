import { ClaudeMdConfig } from '../types';

export const terminalMasteryConfigs: ClaudeMdConfig[] = [
  {
    id: 'terminal-mastery-zsh-tmux',
    title: 'Terminal Mastery: Zsh + Tmux + Productivity',
    slug: 'terminal-mastery-zsh-tmux-productivity-tools',
    description: 'Master-level terminal configuration with Zsh, Oh My Zsh, Tmux, and advanced productivity tools for power users who live in the command line and demand maximum efficiency.',
    category: 'Claude.md Configurations',
    tags: ['terminal', 'zsh', 'tmux', 'productivity', 'cli', 'shell', 'automation'],
    difficulty: 'ADVANCED',
    language: 'Shell',
    framework: 'Zsh + Tmux + CLI Tools',
    content: `# Claude.md - Terminal Mastery: Zsh + Tmux + Productivity

## Project Overview

This is an advanced terminal configuration designed for power users who spend most of their time in the command line. It provides a highly optimized, productive, and visually appealing terminal environment with Zsh, Tmux, and a carefully curated selection of productivity tools that transform the terminal into a powerful development workspace.

## Development Philosophy

### Terminal-First Approach
1. **Efficiency**: Every action optimized for speed and minimal keystrokes
2. **Consistency**: Unified experience across all terminal sessions
3. **Persistence**: Sessions survive reboots and disconnections
4. **Multiplexing**: Multiple projects and contexts in organized windows
5. **Customization**: Tailored to individual workflow preferences
6. **Integration**: Seamless integration with development tools

### Power User Benefits
- **Session Management**: Persistent sessions with automatic restoration
- **Window Multiplexing**: Multiple panes and windows in organized layouts
- **Advanced History**: Intelligent command history with fuzzy search
- **Auto-completion**: Context-aware completions for commands and arguments
- **Git Integration**: Visual git status and advanced git operations
- **Performance Monitoring**: Real-time system and process information
- **Quick Navigation**: Instant directory jumping and file finding

## Technology Stack

- **Shell**: Zsh with Oh My Zsh framework
- **Multiplexer**: Tmux with advanced session management
- **Terminal**: Alacritty/Kitty/iTerm2 with GPU acceleration
- **Prompt**: Powerlevel10k with Git integration
- **File Manager**: lf/ranger with preview support
- **Search**: fzf with fd and ripgrep integration
- **Version Control**: Delta for Git diffs, lazygit for Git UI
- **System Monitoring**: htop, btop, glances

## Project Structure

\`\`\`
terminal-mastery-config/
├── zsh/                           # Zsh configuration
│   ├── .zshrc                     # Main Zsh configuration
│   ├── .zshenv                    # Environment variables
│   ├── .zprofile                  # Login shell configuration
│   ├── aliases.zsh                # Command aliases
│   ├── functions.zsh              # Custom functions
│   ├── exports.zsh                # Environment exports
│   └── plugins/                   # Custom plugins
│       ├── git-extras.zsh         # Git helper functions
│       ├── docker-helpers.zsh     # Docker utilities
│       └── dev-tools.zsh          # Development shortcuts
├── tmux/                          # Tmux configuration
│   ├── .tmux.conf                 # Main Tmux configuration
│   ├── scripts/                   # Tmux scripts
│   │   ├── session-manager.sh     # Session management
│   │   ├── window-layouts.sh      # Window layout presets
│   │   └── status-bar.sh          # Custom status bar
│   └── plugins/                   # Tmux plugins
├── alacritty/                     # Alacritty terminal config
│   └── alacritty.yml              # Terminal configuration
├── tools/                         # CLI tool configurations
│   ├── .gitconfig                 # Git configuration
│   ├── .vimrc                     # Vim configuration
│   ├── lf/                        # lf file manager config
│   │   ├── lfrc                   # lf configuration
│   │   └── preview.sh             # File preview script
│   └── scripts/                   # Utility scripts
│       ├── fzf-git.sh            # FZF Git integration
│       ├── tmux-sessionizer.sh    # Session creation
│       └── system-info.sh         # System information
├── fonts/                         # Nerd Fonts for icons
├── themes/                        # Color schemes
│   ├── catppuccin-mocha.conf      # Catppuccin theme
│   └── tokyo-night.conf           # Tokyo Night theme
└── install/                       # Installation scripts
    ├── install.sh                 # Main installation script
    ├── macos-setup.sh             # macOS specific setup
    ├── linux-setup.sh             # Linux specific setup
    └── tools-install.sh           # CLI tools installation
\`\`\`

## Zsh Configuration

### Main Zsh Configuration
\`\`\`bash
# ~/.zshrc - Master Zsh Configuration

# Oh My Zsh installation path
export ZSH="$HOME/.oh-my-zsh"

# Theme configuration
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins (loaded in optimal order)
plugins=(
    # Core functionality
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
    zsh-completions
    
    # Development tools
    docker
    docker-compose
    kubectl
    terraform
    aws
    gcloud
    
    # Utilities
    fzf
    fd
    ripgrep
    tmux
    ssh-agent
    gpg-agent
    
    # Language specific
    node
    npm
    yarn
    python
    pip
    golang
    rust
    
    # Custom plugins
    git-extras
    docker-helpers
    dev-tools
)

# Load Oh My Zsh
source $ZSH/oh-my-zsh.sh

# Load custom configurations
[[ -f ~/.config/zsh/exports.zsh ]] && source ~/.config/zsh/exports.zsh
[[ -f ~/.config/zsh/aliases.zsh ]] && source ~/.config/zsh/aliases.zsh
[[ -f ~/.config/zsh/functions.zsh ]] && source ~/.config/zsh/functions.zsh

# Powerlevel10k instant prompt
if [[ -r "\${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-\${(%):-%n}.zsh" ]]; then
  source "\${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-\${(%):-%n}.zsh"
fi

# History configuration
HISTFILE=~/.zsh_history
HISTSIZE=50000
SAVEHIST=50000
setopt EXTENDED_HISTORY          # Write timestamps to history
setopt INC_APPEND_HISTORY        # Append to history immediately
setopt SHARE_HISTORY             # Share history between sessions
setopt HIST_IGNORE_DUPS          # Don't record duplicates
setopt HIST_IGNORE_ALL_DUPS      # Remove older duplicates
setopt HIST_FIND_NO_DUPS         # Don't show duplicates in search
setopt HIST_IGNORE_SPACE         # Don't record commands starting with space
setopt HIST_SAVE_NO_DUPS         # Don't save duplicates
setopt HIST_REDUCE_BLANKS        # Remove extra blanks
setopt HIST_VERIFY               # Show command before executing from history

# Completion configuration
autoload -Uz compinit
compinit -d ~/.zcompdump

# Case-insensitive completion
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'
zstyle ':completion:*' menu select
zstyle ':completion:*' list-colors "\${(s.:.)LS_COLORS}"
zstyle ':completion:*' squeeze-slashes true
zstyle ':completion:*' complete-options true
zstyle ':completion:*' use-cache true
zstyle ':completion:*' cache-path ~/.zcompcache

# Directory navigation
setopt AUTO_CD                   # Auto cd when typing directory name
setopt AUTO_PUSHD                # Push directories to stack
setopt PUSHD_IGNORE_DUPS         # Don't push duplicates
setopt PUSHD_SILENT              # Don't print directory stack

# FZF integration
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# Custom FZF configuration
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND='fd --type d --hidden --follow --exclude .git'

# FZF colors (Catppuccin Mocha)
export FZF_DEFAULT_OPTS="
  --color=bg+:#313244,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8
  --color=fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc
  --color=marker:#f5e0dc,fg+:#cdd6f4,prompt:#cba6f7,hl+:#f38ba8
  --height 40% --layout=reverse --border
  --bind 'ctrl-y:execute-silent(echo -n {} | pbcopy)'
  --bind 'ctrl-e:execute(echo {} | xargs -o vim)'
  --bind 'ctrl-r:reload(eval $FZF_DEFAULT_COMMAND)'
"

# Key bindings
bindkey -e  # Emacs key bindings
bindkey '^R' fzf-history-widget
bindkey '^T' fzf-file-widget
bindkey '^[c' fzf-cd-widget
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down

# Load Powerlevel10k configuration
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
\`\`\`

### Custom Aliases and Functions
\`\`\`bash
# ~/.config/zsh/aliases.zsh - Power User Aliases

# Enhanced basic commands
alias ls='eza --icons --group-directories-first'
alias ll='eza -la --icons --group-directories-first --git'
alias la='eza -la --icons --group-directories-first --git'
alias lt='eza --tree --level=2 --icons'
alias cat='bat --style=plain'
alias catn='bat --style=numbers'
alias less='bat --paging=always --style=plain'

# Modern replacements
alias find='fd'
alias grep='rg'
alias du='dust'
alias df='duf'
alias ps='procs'
alias top='btop'
alias ping='prettyping --nolegend'

# Directory navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ~='cd ~'
alias -- -='cd -'

# Git shortcuts (enhanced)
alias g='git'
alias ga='git add'
alias gaa='git add --all'
alias gc='git commit -v'
alias gcm='git commit -m'
alias gca='git commit -am'
alias gco='git checkout'
alias gcb='git checkout -b'
alias gd='git diff'
alias gds='git diff --staged'
alias gl='git log --oneline --decorate --graph'
alias gla='git log --oneline --decorate --graph --all'
alias gp='git push'
alias gpl='git pull'
alias gs='git status -sb'
alias gst='git stash'
alias gstp='git stash pop'
alias gstl='git stash list'

# Git with FZF integration
alias gbr='git branch | fzf | xargs git checkout'
alias gco-fzf='git branch -a | fzf | sed "s/remotes\\/origin\\///" | xargs git checkout'
alias glog='git log --oneline --decorate --graph | fzf --ansi --preview "git show {1}"'

# Docker shortcuts
alias d='docker'
alias dc='docker-compose'
alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias dcl='docker-compose logs -f'
alias dps='docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"'
alias dimg='docker images --format "table {{.Repository}}\\t{{.Tag}}\\t{{.Size}}"'

# Kubernetes shortcuts
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgs='kubectl get services'
alias kgd='kubectl get deployments'
alias kdp='kubectl describe pod'
alias kds='kubectl describe service'
alias kdd='kubectl describe deployment'
alias kl='kubectl logs'
alias klf='kubectl logs -f'

# System utilities
alias reload='source ~/.zshrc'
alias zshconfig='vim ~/.zshrc'
alias tmuxconfig='vim ~/.tmux.conf'
alias path='echo -e \${PATH//:/\\n}'
alias myip='curl -s https://httpbin.org/ip | jq -r .origin'
alias ports='netstat -tuln'
alias sizeof='du -sh'

# Development shortcuts
alias serve='python -m http.server 8000'
alias json='python -m json.tool'
alias urlencode='python -c "import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1]))"'
alias urldecode='python -c "import sys, urllib.parse; print(urllib.parse.unquote(sys.argv[1]))"'

# Quick edits
alias hosts='sudo vim /etc/hosts'
alias sshconfig='vim ~/.ssh/config'
alias gitconfig='vim ~/.gitconfig'

# System monitoring
alias cpu='top -o cpu'
alias mem='top -o rsize'
alias network='netstat -i'
alias disk='df -h'

# Quick directory access
alias projects='cd ~/Projects'
alias downloads='cd ~/Downloads'
alias desktop='cd ~/Desktop'
alias documents='cd ~/Documents'
\`\`\`

### Custom Functions
\`\`\`bash
# ~/.config/zsh/functions.zsh - Productivity Functions

# Smart cd with fuzzy finding
function cd() {
    if [[ "$#" != 0 ]]; then
        builtin cd "$@";
        return
    fi
    while true; do
        local lsd=\$(find . -maxdepth 1 -type d -name '[^.]*' | sort)
        local dir="\$(printf '%s\\n' "\${lsd[@]}" |
            fzf --reverse --preview '
                __cd_nxt="{}"
                __cd_path="\$(echo \$__cd_nxt | sed "s;//;/;g")"
                echo \$__cd_path
                echo
                ls -la \$__cd_path
        ')"
        [[ \${#dir} != 0 ]] || return 0
        builtin cd "\$dir" &> /dev/null
    done
}

# Create directory and cd into it
function mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Extract archives
function extract() {
    if [ -f "$1" ]; then
        case "$1" in
            *.tar.bz2)   tar xjf "$1"     ;;
            *.tar.gz)    tar xzf "$1"     ;;
            *.bz2)       bunzip2 "$1"     ;;
            *.rar)       unrar e "$1"     ;;
            *.gz)        gunzip "$1"      ;;
            *.tar)       tar xf "$1"      ;;
            *.tbz2)      tar xjf "$1"     ;;
            *.tgz)       tar xzf "$1"     ;;
            *.zip)       unzip "$1"       ;;
            *.Z)         uncompress "$1"  ;;
            *.7z)        7z x "$1"        ;;
            *)           echo "'$1' cannot be extracted via extract()" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}

# Find and kill process
function fkill() {
    local pid
    pid=\$(ps -ef | sed 1d | fzf -m | awk '{print \$2}')
    if [ "x\$pid" != "x" ]; then
        echo "\$pid" | xargs kill -"\${1:-9}"
    fi
}

# Git commit with conventional format
function gccm() {
    local type=\$(echo "feat\\nfix\\ndocs\\nstyle\\nrefactor\\ntest\\nchore\\nci\\nbuild\\nperf" | fzf --prompt="Select commit type: ")
    local scope
    read "scope?Enter scope (optional): "
    local message
    read "message?Enter commit message: "
    
    if [[ -n \$scope ]]; then
        git commit -m "\${type}(\${scope}): \${message}"
    else
        git commit -m "\${type}: \${message}"
    fi
}

# Project opener with fuzzy finding
function proj() {
    local project_dir=\$(find ~/Projects -maxdepth 2 -type d | fzf --preview 'ls -la {}')
    if [[ -n \$project_dir ]]; then
        cd "\$project_dir"
        if [[ -f "package.json" ]]; then
            echo "📦 Node.js project detected"
        elif [[ -f "Cargo.toml" ]]; then
            echo "🦀 Rust project detected"
        elif [[ -f "go.mod" ]]; then
            echo "🐹 Go project detected"
        elif [[ -f "requirements.txt" ]] || [[ -f "pyproject.toml" ]]; then
            echo "🐍 Python project detected"
        fi
    fi
}

# Docker container shell
function dsh() {
    local container
    container=\$(docker ps --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}" | fzf --header-lines=1 | awk '{print \$1}')
    if [[ -n \$container ]]; then
        docker exec -it "\$container" /bin/bash || docker exec -it "\$container" /bin/sh
    fi
}

# Weather function
function weather() {
    local location=\${1:-""}
    curl -s "https://wttr.in/\${location}?format=3"
}

# QR code generator
function qr() {
    echo "\$1" | qrencode -t UTF8
}

# File backup
function backup() {
    cp "\$1" "\$1.backup.\$(date +%Y%m%d_%H%M%S)"
    echo "Backup created: \$1.backup.\$(date +%Y%m%d_%H%M%S)"
}

# Port checker
function port() {
    lsof -i :\$1
}

# Quick note taker
function note() {
    local note_file="$HOME/notes/\$(date +%Y%m%d).md"
    mkdir -p "$HOME/notes"
    echo "\$(date '+%H:%M') - \$*" >> "\$note_file"
    echo "Note added to \$note_file"
}
\`\`\`

## Tmux Configuration

### Main Tmux Configuration
\`\`\`bash
# ~/.tmux.conf - Master Tmux Configuration

# General settings
set -g default-terminal "tmux-256color"
set -ag terminal-overrides ",xterm-256color:RGB"
set -g mouse on
set -g history-limit 50000
set -g display-time 4000
set -g status-interval 5
set -g default-command "\${SHELL}"
set -g focus-events on
set -g aggressive-resize on

# Change prefix key to Ctrl-a
unbind C-b
set -g prefix C-a
bind-key C-a send-prefix

# Reload configuration
bind r source-file ~/.tmux.conf \\; display-message "Config reloaded!"

# Split panes with more intuitive keys
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
unbind '"'
unbind %

# Smart pane switching with awareness of Vim splits
is_vim="ps -o state= -o comm= -t '#{pane_tty}' \\
    | grep -iqE '^[^TXZ ]+ +(\\\\S+\\\\/)?g?(view|n?vim?x?)(diff)?\$'"
bind-key -n 'C-h' if-shell "\$is_vim" 'send-keys C-h'  'select-pane -L'
bind-key -n 'C-j' if-shell "\$is_vim" 'send-keys C-j'  'select-pane -D'
bind-key -n 'C-k' if-shell "\$is_vim" 'send-keys C-k'  'select-pane -U'
bind-key -n 'C-l' if-shell "\$is_vim" 'send-keys C-l'  'select-pane -R'

# Pane resizing
bind -n M-H resize-pane -L 2
bind -n M-L resize-pane -R 2
bind -n M-K resize-pane -U 2
bind -n M-J resize-pane -D 2

# Window navigation
bind -n S-Left previous-window
bind -n S-Right next-window

# Copy mode enhancements
setw -g mode-keys vi
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "pbcopy"
bind-key -T copy-mode-vi C-v send-keys -X rectangle-toggle

# Session management
bind C-s display-popup -E "tmux list-sessions | sed 'E s/:.*$//' | fzf --reverse | xargs tmux switch-client -t"
bind C-n new-session

# Window and pane creation
bind c new-window -c "#{pane_current_path}"
bind C-c new-window

# Pane synchronization
bind y setw synchronize-panes

# Status bar configuration
set -g status-position top
set -g status-justify left
set -g status-style 'bg=#1e1e2e fg=#cdd6f4'
set -g status-left-length 100
set -g status-right-length 100

# Left status: session name and window info
set -g status-left '#[bg=#89b4fa,fg=#1e1e2e,bold] #S #[bg=#1e1e2e,fg=#89b4fa]#[bg=#1e1e2e] '

# Right status: system info, git, and time
set -g status-right '#[bg=#1e1e2e,fg=#f38ba8]#[bg=#f38ba8,fg=#1e1e2e] #{cpu_percentage} #[bg=#1e1e2e,fg=#a6e3a1]#[bg=#a6e3a1,fg=#1e1e2e] #{ram_percentage} #[bg=#1e1e2e,fg=#fab387]#[bg=#fab387,fg=#1e1e2e] %H:%M #[bg=#1e1e2e,fg=#cba6f7]#[bg=#cba6f7,fg=#1e1e2e] %d-%m-%Y '

# Window status
setw -g window-status-format '#[bg=#313244,fg=#cdd6f4] #I:#W '
setw -g window-status-current-format '#[bg=#89b4fa,fg=#1e1e2e,bold] #I:#W '

# Pane borders
set -g pane-border-style 'fg=#585b70'
set -g pane-active-border-style 'fg=#89b4fa'

# Message style
set -g message-style 'bg=#f38ba8 fg=#1e1e2e bold'

# Copy mode style
setw -g mode-style 'bg=#f9e2af fg=#1e1e2e'

# Plugin manager
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @plugin 'tmux-plugins/tmux-cpu'
set -g @plugin 'tmux-plugins/tmux-battery'
set -g @plugin 'christoomey/vim-tmux-navigator'
set -g @plugin 'tmux-plugins/tmux-yank'

# Plugin settings
set -g @resurrect-capture-pane-contents 'on'
set -g @resurrect-strategy-vim 'session'
set -g @continuum-restore 'on'
set -g @continuum-boot 'on'

# Initialize TMUX plugin manager (keep this line at the very bottom)
run '~/.tmux/plugins/tpm/tpm'
\`\`\`

### Tmux Session Manager Script
\`\`\`bash
#!/bin/bash
# ~/.config/tmux/scripts/session-manager.sh - Advanced Session Management

set -e

SESSIONS_DIR="$HOME/.tmux-sessions"
mkdir -p "$SESSIONS_DIR"

# Function to create a new development session
create_dev_session() {
    local session_name="$1"
    local project_path="$2"
    
    if tmux has-session -t "$session_name" 2>/dev/null; then
        echo "Session '$session_name' already exists"
        tmux attach-session -t "$session_name"
        return
    fi
    
    # Create new session detached
    tmux new-session -d -s "$session_name" -c "$project_path"
    
    # Window 1: Editor
    tmux rename-window -t "$session_name:1" "editor"
    tmux send-keys -t "$session_name:1" "nvim ." Enter
    
    # Window 2: Terminal
    tmux new-window -t "$session_name" -n "terminal" -c "$project_path"
    
    # Window 3: Git
    tmux new-window -t "$session_name" -n "git" -c "$project_path"
    tmux send-keys -t "$session_name:git" "lazygit" Enter
    
    # Window 4: Server (if applicable)
    tmux new-window -t "$session_name" -n "server" -c "$project_path"
    if [[ -f "package.json" ]]; then
        tmux send-keys -t "$session_name:server" "npm run dev" Enter
    elif [[ -f "Cargo.toml" ]]; then
        tmux send-keys -t "$session_name:server" "cargo run" Enter
    elif [[ -f "go.mod" ]]; then
        tmux send-keys -t "$session_name:server" "go run ." Enter
    fi
    
    # Window 5: Monitoring
    tmux new-window -t "$session_name" -n "monitoring" -c "$project_path"
    tmux split-window -t "$session_name:monitoring" -h
    tmux send-keys -t "$session_name:monitoring.0" "htop" Enter
    tmux send-keys -t "$session_name:monitoring.1" "docker stats" Enter
    
    # Select first window and attach
    tmux select-window -t "$session_name:1"
    tmux attach-session -t "$session_name"
}

# Function to save session configuration
save_session() {
    local session_name="$1"
    if ! tmux has-session -t "$session_name" 2>/dev/null; then
        echo "Session '$session_name' does not exist"
        return 1
    fi
    
    local config_file="$SESSIONS_DIR/$session_name.conf"
    
    # Save session layout
    tmux list-windows -t "$session_name" -F "#{window_index}:#{window_name}:#{pane_current_path}" > "$config_file"
    echo "Session '$session_name' configuration saved to $config_file"
}

# Function to restore session from configuration
restore_session() {
    local session_name="$1"
    local config_file="$SESSIONS_DIR/$session_name.conf"
    
    if [[ ! -f "$config_file" ]]; then
        echo "No configuration found for session '$session_name'"
        return 1
    fi
    
    if tmux has-session -t "$session_name" 2>/dev/null; then
        echo "Session '$session_name' already exists"
        tmux attach-session -t "$session_name"
        return
    fi
    
    # Read configuration and create session
    local first_line=true
    while IFS=':' read -r window_index window_name window_path; do
        if $first_line; then
            tmux new-session -d -s "$session_name" -c "$window_path"
            tmux rename-window -t "$session_name:$window_index" "$window_name"
            first_line=false
        else
            tmux new-window -t "$session_name" -n "$window_name" -c "$window_path"
        fi
    done < "$config_file"
    
    tmux attach-session -t "$session_name"
}

# Function to list and select sessions with fzf
select_session() {
    local sessions
    sessions=\$(tmux list-sessions -F "#{session_name}: #{session_windows} windows (created #{session_created_string})" 2>/dev/null)
    
    [[ -z "$sessions" ]] && echo "No tmux sessions found" && return 1
    
    local selected
    selected=\$(echo "$sessions" | fzf --height=40% --reverse --prompt="Select session: ")
    
    [[ -z "$selected" ]] && return 1
    
    local session_name
    session_name=\$(echo "$selected" | cut -d':' -f1)
    tmux attach-session -t "$session_name"
}

# Function to kill session with confirmation
kill_session() {
    local session_name="$1"
    
    if [[ -z "$session_name" ]]; then
        # Interactive selection
        local sessions
        sessions=\$(tmux list-sessions -F "#{session_name}" 2>/dev/null)
        [[ -z "$sessions" ]] && echo "No sessions to kill" && return 1
        
        session_name=\$(echo "$sessions" | fzf --height=40% --reverse --prompt="Select session to kill: ")
        [[ -z "$session_name" ]] && return 1
    fi
    
    if ! tmux has-session -t "$session_name" 2>/dev/null; then
        echo "Session '$session_name' does not exist"
        return 1
    fi
    
    echo -n "Kill session '$session_name'? [y/N] "
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        tmux kill-session -t "$session_name"
        echo "Session '$session_name' killed"
    fi
}

# Main function
main() {
    case "${1:-}" in
        "new"|"create")
            if [[ -z "$2" ]]; then
                echo "Usage: tmux-session new <session-name> [project-path]"
                exit 1
            fi
            create_dev_session "$2" "${3:-$(pwd)}"
            ;;
        "save")
            save_session "${2:-$(tmux display-message -p '#S')}"
            ;;
        "restore")
            if [[ -z "$2" ]]; then
                echo "Usage: tmux-session restore <session-name>"
                exit 1
            fi
            restore_session "$2"
            ;;
        "list"|"ls")
            select_session
            ;;
        "kill")
            kill_session "$2"
            ;;
        "help"|"-h"|"--help")
            echo "Tmux Session Manager"
            echo ""
            echo "Usage: tmux-session <command> [arguments]"
            echo ""
            echo "Commands:"
            echo "  new <name> [path]    Create new development session"
            echo "  save [name]          Save session configuration"
            echo "  restore <name>       Restore session from configuration"
            echo "  list                 List and select sessions"
            echo "  kill [name]          Kill session"
            echo "  help                 Show this help"
            ;;
        *)
            select_session
            ;;
    esac
}

main "$@"
\`\`\`

## Advanced CLI Tools Integration

### FZF Git Integration
\`\`\`bash
#!/bin/bash
# ~/.config/tools/scripts/fzf-git.sh - Enhanced Git with FZF

# Git log with preview
fzf_git_log() {
    git log --oneline --color=always --decorate | 
    fzf --ansi --no-sort --reverse --tiebreak=index \
        --preview='git show --color=always {1}' \
        --bind='ctrl-s:toggle-sort' \
        --bind='ctrl-m:execute:
            (grep -o "[a-f0-9]\\{7\\}" | head -1 |
            xargs -I % sh -c "git show --color=always % | less -R") << FZF-EOF
            {}
            FZF-EOF'
}

# Git branch checkout with fuzzy search
fzf_git_branch() {
    local branches
    branches=\$(git branch --all | grep -v HEAD | sed "s/.* //" | sed "s#remotes/[^/]*/##" | sort -u)
    local branch
    branch=\$(echo "$branches" | fzf +s --tac --preview="git log --oneline --graph --date=short --color=always --pretty='format:%C(auto)%cd %h%d %s' {} | head -200")
    if [[ -n "$branch" ]]; then
        git checkout "$branch"
    fi
}

# Git stash with preview
fzf_git_stash() {
    local stash
    stash=\$(git stash list | fzf --reverse --preview='git stash show -p {1}' | cut -d: -f1)
    if [[ -n "$stash" ]]; then
        git stash pop "$stash"
    fi
}

# Git file add with preview
fzf_git_add() {
    git status -s | fzf -m --reverse --preview='
        if [[ {1} == "M" ]] || [[ {1} == "MM" ]]; then
            git diff --color=always {2}
        elif [[ {1} == "A" ]] || [[ {1} == "AM" ]]; then
            git diff --cached --color=always {2}
        else
            bat --color=always {2}
        fi
    ' | awk '{print \$2}' | xargs -r git add
}

# Git commit browser
fzf_git_commit() {
    git log --oneline --color=always | 
    fzf --ansi --no-sort --reverse --tiebreak=index \
        --preview='git show --color=always {1}' \
        --bind='enter:execute:git show {1} | less -R'
}

# Export functions for use in aliases
alias glog='fzf_git_log'
alias gbr='fzf_git_branch'
alias gst-fzf='fzf_git_stash'
alias ga-fzf='fzf_git_add'
alias gc-fzf='fzf_git_commit'
\`\`\`

## Installation and Setup

### Main Installation Script
\`\`\`bash
#!/bin/bash
# install/install.sh - Terminal Mastery Installation

set -e

echo "🚀 Installing Terminal Mastery Configuration..."

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
else
    echo "❌ Unsupported operating system: $OSTYPE"
    exit 1
fi

# Create directories
mkdir -p ~/.config/{zsh,tmux,alacritty}
mkdir -p ~/.tmux/plugins

# Install package manager if not exists
if [[ "$OS" == "macos" ]] && ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install essential tools
echo "🛠️  Installing essential tools..."
if [[ "$OS" == "macos" ]]; then
    brew install zsh tmux fzf fd ripgrep bat eza dust duf procs prettyping git-delta lazygit htop btop
    brew install --cask alacritty font-hack-nerd-font
elif [[ "$OS" == "linux" ]]; then
    # Ubuntu/Debian
    if command -v apt &> /dev/null; then
        sudo apt update
        sudo apt install -y zsh tmux fzf fd-find ripgrep bat exa dust duf git curl wget
    # Arch Linux
    elif command -v pacman &> /dev/null; then
        sudo pacman -S zsh tmux fzf fd ripgrep bat exa dust duf procs git
    fi
fi

# Install Oh My Zsh
if [[ ! -d "$HOME/.oh-my-zsh" ]]; then
    echo "🐚 Installing Oh My Zsh..."
    sh -c "\$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
fi

# Install Powerlevel10k
if [[ ! -d "$HOME/.oh-my-zsh/custom/themes/powerlevel10k" ]]; then
    echo "⚡ Installing Powerlevel10k..."
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/.oh-my-zsh/custom/themes/powerlevel10k
fi

# Install Zsh plugins
echo "🔌 Installing Zsh plugins..."
[[ ! -d ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions ]] && 
    git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions

[[ ! -d ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting ]] && 
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

[[ ! -d ~/.oh-my-zsh/custom/plugins/zsh-completions ]] && 
    git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions

# Install TPM (Tmux Plugin Manager)
if [[ ! -d "$HOME/.tmux/plugins/tpm" ]]; then
    echo "📦 Installing Tmux Plugin Manager..."
    git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
fi

# Copy configuration files
echo "📄 Installing configuration files..."
cp -r zsh/* ~/.config/zsh/
cp tmux/.tmux.conf ~/
cp alacritty/alacritty.yml ~/.config/alacritty/
cp tools/.gitconfig ~/
cp -r tools/scripts ~/.config/

# Make scripts executable
chmod +x ~/.config/scripts/*.sh
chmod +x ~/.config/tmux/scripts/*.sh

# Set Zsh as default shell
if [[ "$SHELL" != "$(which zsh)" ]]; then
    echo "🐚 Setting Zsh as default shell..."
    chsh -s "\$(which zsh)"
fi

# Install FZF key bindings
if command -v fzf &> /dev/null; then
    \$(brew --prefix)/opt/fzf/install --all 2>/dev/null || 
    /usr/share/doc/fzf/examples/install --all 2>/dev/null || 
    ~/.fzf/install --all
fi

echo ""
echo "✅ Terminal Mastery installation completed!"
echo ""
echo "📋 Next steps:"
echo "   1. Restart your terminal or run: source ~/.zshrc"
echo "   2. Run: tmux and press Ctrl-a + I to install tmux plugins"
echo "   3. Configure Powerlevel10k: p10k configure"
echo "   4. Install Nerd Font for your terminal emulator"
echo ""
echo "🎉 Enjoy your supercharged terminal experience!"
\`\`\`

## Performance Tips and Optimizations

### Startup Performance
- **Lazy Loading**: Plugins load only when needed
- **Async Loading**: Non-critical plugins load asynchronously  
- **Minimal Core**: Only essential tools in startup path
- **Compiled Configs**: Pre-compiled Zsh configurations

### Memory Optimization
- **History Management**: Optimized history size and deduplication
- **Plugin Cleanup**: Regular cleanup of unused plugins
- **Cache Management**: Intelligent caching of completions
- **Resource Monitoring**: Built-in resource usage monitoring

### Network Efficiency
- **Connection Reuse**: SSH connection multiplexing
- **Compression**: Enabled compression for remote connections
- **Caching**: Cached remote completions and data
- **Timeout Management**: Optimized timeout settings

This terminal mastery configuration transforms your command-line experience into a powerful, efficient, and visually appealing development environment that rivals any modern IDE while maintaining the speed and flexibility that power users demand.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];