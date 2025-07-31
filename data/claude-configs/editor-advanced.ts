import { ClaudeMdConfig } from '../types';

export const editorAdvancedConfigs: ClaudeMdConfig[] = [
  {
    id: 'neovim-lsp-ultimate',
    title: 'Neovim LSP Ultimate Setup',
    slug: 'neovim-lsp-ultimate-configuration',
    description: 'Comprehensive Neovim configuration with LSP, Treesitter, Telescope, and advanced productivity features for power users and developers seeking the ultimate text editing experience.',
    category: 'Claude.md Configurations',
    tags: ['neovim', 'lsp', 'treesitter', 'telescope', 'lua', 'editor', 'productivity'],
    difficulty: 'ADVANCED',
    language: 'Lua',
    framework: 'Neovim + LSP',
    content: `# Claude.md - Neovim LSP Ultimate Setup

## Project Overview

This is an advanced Neovim configuration designed for power users and developers who demand the ultimate text editing experience. It features comprehensive LSP support, advanced Treesitter parsing, fuzzy finding with Telescope, and a highly optimized workflow for maximum productivity.

## Development Philosophy

### Neovim Advantages
1. **Performance**: Lightning-fast startup and operation
2. **Extensibility**: Lua-based configuration and plugins
3. **LSP Integration**: Native Language Server Protocol support
4. **Asynchronous**: Non-blocking operations for smooth experience
5. **Customization**: Complete control over every aspect
6. **Vim Compatibility**: All Vim knowledge transfers

### Advanced Features
- Multi-language LSP with zero-config setup
- Intelligent code completion and diagnostics
- Advanced syntax highlighting with Treesitter
- Fuzzy finding for files, buffers, and symbols
- Git integration with signs and blame
- File explorer with icons and previews
- Terminal integration and floating windows
- Session management and workspace persistence
- Custom keybindings and leader key shortcuts

## Technology Stack

- **Editor**: Neovim 0.9+
- **Configuration Language**: Lua
- **Plugin Manager**: lazy.nvim
- **LSP**: Mason + nvim-lspconfig
- **Completion**: nvim-cmp with multiple sources
- **Syntax**: nvim-treesitter
- **Fuzzy Finding**: telescope.nvim
- **File Explorer**: nvim-tree.lua
- **Git Integration**: gitsigns.nvim
- **Status Line**: lualine.nvim

## Project Structure

\`\`\`
~/.config/nvim/
├── init.lua                    # Main configuration entry point
├── lua/
│   ├── core/                   # Core Neovim settings
│   │   ├── options.lua         # Vim options and settings
│   │   ├── keymaps.lua         # Key mappings and shortcuts
│   │   ├── autocmds.lua        # Auto commands and events
│   │   └── utils.lua           # Utility functions
│   ├── plugins/                # Plugin configurations
│   │   ├── init.lua            # Plugin manager setup
│   │   ├── lsp/                # LSP configurations
│   │   │   ├── mason.lua       # LSP installer
│   │   │   ├── lspconfig.lua   # LSP server configs
│   │   │   ├── handlers.lua    # LSP handlers
│   │   │   └── servers/        # Individual server configs
│   │   ├── completion/         # Completion setup
│   │   │   ├── nvim-cmp.lua    # Main completion engine
│   │   │   └── snippets.lua    # Snippet configurations
│   │   ├── ui/                 # UI enhancements
│   │   │   ├── telescope.lua   # Fuzzy finder
│   │   │   ├── nvim-tree.lua   # File explorer
│   │   │   ├── lualine.lua     # Status line
│   │   │   └── bufferline.lua  # Buffer tabs
│   │   ├── editor/             # Editor enhancements
│   │   │   ├── treesitter.lua  # Syntax highlighting
│   │   │   ├── gitsigns.lua    # Git integration
│   │   │   ├── comment.lua     # Smart commenting
│   │   │   └── autopairs.lua   # Auto bracket pairing
│   │   └── tools/              # Development tools
│   │       ├── terminal.lua    # Terminal integration
│   │       ├── debugger.lua    # DAP debugging
│   │       └── testing.lua     # Test integration
│   └── themes/                 # Color schemes
│       ├── catppuccin.lua      # Catppuccin theme
│       └── tokyonight.lua      # Tokyo Night theme
└── snippets/                   # Custom snippets
    ├── typescript.json         # TypeScript snippets
    ├── python.json             # Python snippets
    └── go.json                 # Go snippets
\`\`\`

## Core Configuration

### Main Init File
\`\`\`lua
-- ~/.config/nvim/init.lua
-- Bootstrap lazy.nvim plugin manager
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- Load core configuration
require("core.options")
require("core.keymaps")
require("core.autocmds")

-- Setup plugins
require("plugins")

-- Set colorscheme
vim.cmd.colorscheme("catppuccin-mocha")
\`\`\`

### Core Options
\`\`\`lua
-- ~/.config/nvim/lua/core/options.lua
local opt = vim.opt

-- General
opt.mouse = "a"                 -- enable mouse support
opt.clipboard = "unnamedplus"   -- use system clipboard
opt.swapfile = false           -- disable swap files
opt.completeopt = "menu,menuone,noselect"

-- UI
opt.number = true              -- show line numbers
opt.relativenumber = true      -- show relative line numbers
opt.cursorline = true          -- highlight current line
opt.termguicolors = true       -- true color support
opt.background = "dark"        -- dark background
opt.signcolumn = "yes"         -- always show sign column
opt.cmdheight = 1             -- command line height
opt.scrolloff = 8             -- keep 8 lines above/below cursor
opt.sidescrolloff = 8         -- keep 8 columns left/right of cursor

-- Splitting
opt.splitright = true         -- vertical splits to the right
opt.splitbelow = true         -- horizontal splits below

-- Search
opt.ignorecase = true         -- ignore case in search
opt.smartcase = true          -- case sensitive if uppercase present
opt.hlsearch = false          -- don't highlight search results
opt.incsearch = true          -- incremental search

-- Indentation
opt.expandtab = true          -- use spaces instead of tabs
opt.shiftwidth = 2            -- shift 2 spaces when tab
opt.tabstop = 2               -- 1 tab == 2 spaces
opt.softtabstop = 2           -- 2 spaces for editing
opt.smartindent = true        -- autoindent new lines

-- Performance
opt.updatetime = 250          -- faster completion (4000ms default)
opt.timeoutlen = 500         -- time to wait for mapped sequence
opt.redrawtime = 10000       -- allow more time for loading syntax on large files
opt.synmaxcol = 180          -- max column for syntax highlight

-- Backup and undo
opt.backup = false            -- don't create backup files
opt.writebackup = false       -- don't create backup before overwriting
opt.undofile = true           -- persistent undo
opt.undodir = vim.fn.expand("~/.config/nvim/undo")

-- Create undo directory if it doesn't exist
local undo_dir = vim.fn.expand("~/.config/nvim/undo")
if vim.fn.isdirectory(undo_dir) == 0 then
  vim.fn.mkdir(undo_dir, "p")
end

-- Folding
opt.foldmethod = "expr"
opt.foldexpr = "nvim_treesitter#foldexpr()"
opt.foldenable = false        -- don't fold by default

-- Window
opt.winwidth = 30
opt.winminwidth = 10
opt.equalalways = false

-- Wild menu
opt.wildmenu = true
opt.wildmode = "longest:full,full"
opt.wildignore:append({ "*.o", "*.obj", ".git", "*.rbc", "*.pyc", "__pycache__" })

-- Neovim specific
if vim.fn.has("nvim-0.8") == 1 then
  opt.backup = false
  opt.cmdheight = 0
  opt.laststatus = 3
end
\`\`\`

### Key Mappings
\`\`\`lua
-- ~/.config/nvim/lua/core/keymaps.lua
local keymap = vim.keymap.set
local opts = { noremap = true, silent = true }

-- Set leader key
vim.g.mapleader = " "
vim.g.maplocalleader = " "

-- General keymaps
keymap("n", "<leader>w", ":w<CR>", opts)
keymap("n", "<leader>q", ":q<CR>", opts)
keymap("n", "<leader>x", ":x<CR>", opts)

-- Better window navigation
keymap("n", "<C-h>", "<C-w>h", opts)
keymap("n", "<C-j>", "<C-w>j", opts)
keymap("n", "<C-k>", "<C-w>k", opts)
keymap("n", "<C-l>", "<C-w>l", opts)

-- Resize windows
keymap("n", "<C-Up>", ":resize -2<CR>", opts)
keymap("n", "<C-Down>", ":resize +2<CR>", opts)
keymap("n", "<C-Left>", ":vertical resize -2<CR>", opts)
keymap("n", "<C-Right>", ":vertical resize +2<CR>", opts)

-- Buffer navigation
keymap("n", "<S-l>", ":bnext<CR>", opts)
keymap("n", "<S-h>", ":bprevious<CR>", opts)
keymap("n", "<leader>bd", ":bdelete<CR>", opts)

-- Better indenting
keymap("v", "<", "<gv", opts)
keymap("v", ">", ">gv", opts)

-- Move text up and down
keymap("v", "<A-j>", ":m .+1<CR>==", opts)
keymap("v", "<A-k>", ":m .-2<CR>==", opts)
keymap("v", "p", '"_dP', opts)

-- Visual Block mode
keymap("x", "J", ":move '>+1<CR>gv-gv", opts)
keymap("x", "K", ":move '<-2<CR>gv-gv", opts)
keymap("x", "<A-j>", ":move '>+1<CR>gv-gv", opts)
keymap("x", "<A-k>", ":move '<-2<CR>gv-gv", opts)

-- Stay in the center
keymap("n", "<C-d>", "<C-d>zz", opts)
keymap("n", "<C-u>", "<C-u>zz", opts)
keymap("n", "n", "nzzzv", opts)
keymap("n", "N", "Nzzzv", opts)

-- Clear search highlighting
keymap("n", "<leader>h", ":nohlsearch<CR>", opts)

-- Quick fix list
keymap("n", "<C-k>", "<cmd>cnext<CR>zz", opts)
keymap("n", "<C-j>", "<cmd>cprev<CR>zz", opts)
keymap("n", "<leader>k", "<cmd>lnext<CR>zz", opts)
keymap("n", "<leader>j", "<cmd>lprev<CR>zz", opts)

-- Telescope
keymap("n", "<leader>ff", "<cmd>Telescope find_files<cr>", opts)
keymap("n", "<leader>fg", "<cmd>Telescope live_grep<cr>", opts)
keymap("n", "<leader>fb", "<cmd>Telescope buffers<cr>", opts)
keymap("n", "<leader>fh", "<cmd>Telescope help_tags<cr>", opts)
keymap("n", "<leader>fs", "<cmd>Telescope lsp_document_symbols<cr>", opts)
keymap("n", "<leader>fr", "<cmd>Telescope lsp_references<cr>", opts)

-- LSP
keymap("n", "gD", vim.lsp.buf.declaration, opts)
keymap("n", "gd", vim.lsp.buf.definition, opts)
keymap("n", "K", vim.lsp.buf.hover, opts)
keymap("n", "gi", vim.lsp.buf.implementation, opts)
keymap("n", "<C-k>", vim.lsp.buf.signature_help, opts)
keymap("n", "<leader>rn", vim.lsp.buf.rename, opts)
keymap("n", "<leader>ca", vim.lsp.buf.code_action, opts)
keymap("n", "gr", vim.lsp.buf.references, opts)
keymap("n", "<leader>f", function()
  vim.lsp.buf.format({ async = true })
end, opts)

-- Diagnostics
keymap("n", "<leader>e", vim.diagnostic.open_float, opts)
keymap("n", "[d", vim.diagnostic.goto_prev, opts)
keymap("n", "]d", vim.diagnostic.goto_next, opts)
keymap("n", "<leader>dl", vim.diagnostic.setloclist, opts)

-- NvimTree
keymap("n", "<leader>e", ":NvimTreeToggle<CR>", opts)

-- Terminal
keymap("n", "<leader>t", ":ToggleTerm<CR>", opts)
keymap("t", "<esc>", [[<C-\\><C-n>]], opts)

-- Git
keymap("n", "<leader>gg", ":LazyGit<CR>", opts)
keymap("n", "<leader>gb", ":Gitsigns blame_line<CR>", opts)
keymap("n", "<leader>gp", ":Gitsigns preview_hunk<CR>", opts)
keymap("n", "<leader>gr", ":Gitsigns reset_hunk<CR>", opts)
keymap("n", "<leader>gs", ":Gitsigns stage_hunk<CR>", opts)

-- Sessions
keymap("n", "<leader>ss", ":SessionSave<CR>", opts)
keymap("n", "<leader>sr", ":SessionRestore<CR>", opts)
\`\`\`

## Plugin Configuration

### Plugin Manager Setup
\`\`\`lua
-- ~/.config/nvim/lua/plugins/init.lua
require("lazy").setup({
  -- LSP Configuration
  { import = "plugins.lsp" },
  
  -- Completion
  { import = "plugins.completion" },
  
  -- UI Enhancements
  { import = "plugins.ui" },
  
  -- Editor Features
  { import = "plugins.editor" },
  
  -- Development Tools
  { import = "plugins.tools" },
  
  -- Themes
  { import = "themes" },
}, {
  checker = {
    enabled = true,
    notify = false,
  },
  change_detection = {
    notify = false,
  },
})
\`\`\`

### LSP Configuration
\`\`\`lua
-- ~/.config/nvim/lua/plugins/lsp/mason.lua
return {
  {
    "williamboman/mason.nvim",
    cmd = "Mason",
    keys = { { "<leader>cm", "<cmd>Mason<cr>", desc = "Mason" } },
    build = ":MasonUpdate",
    opts = {
      ensure_installed = {
        "stylua",
        "shellcheck",
        "shfmt",
        "flake8",
        "black",
        "isort",
        "prettier",
        "eslint_d",
        "typescript-language-server",
        "pyright",
        "lua-language-server",
        "gopls",
        "rust-analyzer",
        "json-lsp",
        "yaml-language-server",
        "dockerfile-language-server",
        "bash-language-server",
        "html-lsp",
        "css-lsp",
        "tailwindcss-language-server",
      },
    },
    config = function(_, opts)
      require("mason").setup(opts)
      local mr = require("mason-registry")
      mr:on("package:install:success", function()
        vim.defer_fn(function()
          require("lazy.core.handler.event").trigger({
            event = "FileType",
            buf = vim.api.nvim_get_current_buf(),
          })
        end, 100)
      end)
      local function ensure_installed()
        for _, tool in ipairs(opts.ensure_installed) do
          local p = mr.get_package(tool)
          if not p:is_installed() then
            p:install()
          end
        end
      end
      if mr.refresh then
        mr.refresh(ensure_installed)
      else
        ensure_installed()
      end
    end,
  },
  
  {
    "williamboman/mason-lspconfig.nvim",
    dependencies = { "mason.nvim" },
    opts = {
      automatic_installation = true,
    },
  },
}
\`\`\`

### Advanced LSP Handlers
\`\`\`lua
-- ~/.config/nvim/lua/plugins/lsp/handlers.lua
local M = {}

M.setup = function()
  local signs = {
    { name = "DiagnosticSignError", text = "" },
    { name = "DiagnosticSignWarn", text = "" },
    { name = "DiagnosticSignHint", text = "" },
    { name = "DiagnosticSignInfo", text = "" },
  }

  for _, sign in ipairs(signs) do
    vim.fn.sign_define(sign.name, { texthl = sign.name, text = sign.text, numhl = "" })
  end

  vim.diagnostic.config({
    virtual_text = {
      prefix = "●",
      source = "if_many",
    },
    signs = true,
    update_in_insert = false,
    underline = true,
    severity_sort = true,
    float = {
      focusable = true,
      style = "minimal",
      border = "rounded",
      source = "always",
      header = "",
      prefix = "",
    },
  })

  vim.lsp.handlers["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, {
    border = "rounded",
    width = 60,
  })

  vim.lsp.handlers["textDocument/signatureHelp"] = vim.lsp.with(vim.lsp.handlers.signature_help, {
    border = "rounded",
    width = 60,
  })
end

local function lsp_keymaps(bufnr)
  local opts = { noremap = true, silent = true }
  local keymap = vim.api.nvim_buf_set_keymap
  keymap(bufnr, "n", "gD", "<cmd>lua vim.lsp.buf.declaration()<CR>", opts)
  keymap(bufnr, "n", "gd", "<cmd>lua vim.lsp.buf.definition()<CR>", opts)
  keymap(bufnr, "n", "K", "<cmd>lua vim.lsp.buf.hover()<CR>", opts)
  keymap(bufnr, "n", "gI", "<cmd>lua vim.lsp.buf.implementation()<CR>", opts)
  keymap(bufnr, "n", "gr", "<cmd>lua vim.lsp.buf.references()<CR>", opts)
  keymap(bufnr, "n", "gl", "<cmd>lua vim.diagnostic.open_float()<CR>", opts)
  keymap(bufnr, "n", "<leader>lf", "<cmd>lua vim.lsp.buf.format{ async = true }<cr>", opts)
  keymap(bufnr, "n", "<leader>li", "<cmd>LspInfo<cr>", opts)
  keymap(bufnr, "n", "<leader>lI", "<cmd>LspInstallInfo<cr>", opts)
  keymap(bufnr, "n", "<leader>la", "<cmd>lua vim.lsp.buf.code_action()<cr>", opts)
  keymap(bufnr, "n", "<leader>lj", "<cmd>lua vim.diagnostic.goto_next({buffer=0})<cr>", opts)
  keymap(bufnr, "n", "<leader>lk", "<cmd>lua vim.diagnostic.goto_prev({buffer=0})<cr>", opts)
  keymap(bufnr, "n", "<leader>lr", "<cmd>lua vim.lsp.buf.rename()<cr>", opts)
  keymap(bufnr, "n", "<leader>ls", "<cmd>lua vim.lsp.buf.signature_help()<CR>", opts)
  keymap(bufnr, "n", "<leader>lq", "<cmd>lua vim.diagnostic.setloclist()<CR>", opts)
end

M.on_attach = function(client, bufnr)
  lsp_keymaps(bufnr)
  
  if client.supports_method("textDocument/documentHighlight") then
    vim.api.nvim_create_augroup("lsp_document_highlight", {})
    vim.api.nvim_create_autocmd({ "CursorHold", "CursorHoldI" }, {
      group = "lsp_document_highlight",
      buffer = bufnr,
      callback = vim.lsp.buf.document_highlight,
    })
    vim.api.nvim_create_autocmd("CursorMoved", {
      group = "lsp_document_highlight",
      buffer = bufnr,
      callback = vim.lsp.buf.clear_references,
    })
  end

  if client.supports_method("textDocument/inlayHint") then
    vim.lsp.inlay_hint.enable(bufnr, true)
  end
end

local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true
capabilities.textDocument.completion.completionItem.resolveSupport = {
  properties = {
    "documentation",
    "detail",
    "additionalTextEdits",
  },
}
capabilities.textDocument.foldingRange = {
  dynamicRegistration = false,
  lineFoldingOnly = true,
}

local status_ok, cmp_nvim_lsp = pcall(require, "cmp_nvim_lsp")
if status_ok then
  capabilities = cmp_nvim_lsp.default_capabilities(capabilities)
end

M.capabilities = capabilities

return M
\`\`\`

### Telescope Configuration
\`\`\`lua
-- ~/.config/nvim/lua/plugins/ui/telescope.lua
return {
  "nvim-telescope/telescope.nvim",
  tag = "0.1.4",
  dependencies = {
    "nvim-lua/plenary.nvim",
    { "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
    "nvim-telescope/telescope-ui-select.nvim",
    "nvim-tree/nvim-web-devicons",
  },
  keys = {
    { "<leader>ff", "<cmd>Telescope find_files<cr>", desc = "Find Files" },
    { "<leader>fg", "<cmd>Telescope live_grep<cr>", desc = "Live Grep" },
    { "<leader>fb", "<cmd>Telescope buffers<cr>", desc = "Buffers" },
    { "<leader>fh", "<cmd>Telescope help_tags<cr>", desc = "Help Tags" },
    { "<leader>fs", "<cmd>Telescope lsp_document_symbols<cr>", desc = "Document Symbols" },
    { "<leader>fr", "<cmd>Telescope lsp_references<cr>", desc = "References" },
    { "<leader>fd", "<cmd>Telescope diagnostics<cr>", desc = "Diagnostics" },
    { "<leader>fc", "<cmd>Telescope commands<cr>", desc = "Commands" },
    { "<leader>fk", "<cmd>Telescope keymaps<cr>", desc = "Keymaps" },
  },
  config = function()
    local telescope = require("telescope")
    local actions = require("telescope.actions")

    telescope.setup({
      defaults = {
        prompt_prefix = " ",
        selection_caret = " ",
        path_display = { "truncate" },
        file_ignore_patterns = { ".git/", "node_modules" },
        
        mappings = {
          i = {
            ["<C-n>"] = actions.cycle_history_next,
            ["<C-p>"] = actions.cycle_history_prev,
            ["<C-j>"] = actions.move_selection_next,
            ["<C-k>"] = actions.move_selection_previous,
            ["<CR>"] = actions.select_default,
            ["<C-x>"] = actions.select_horizontal,
            ["<C-v>"] = actions.select_vertical,
            ["<C-t>"] = actions.select_tab,
            ["<C-u>"] = actions.preview_scrolling_up,
            ["<C-d>"] = actions.preview_scrolling_down,
            ["<PageUp>"] = actions.results_scrolling_up,
            ["<PageDown>"] = actions.results_scrolling_down,
            ["<Tab>"] = actions.toggle_selection + actions.move_selection_worse,
            ["<S-Tab>"] = actions.toggle_selection + actions.move_selection_better,
            ["<C-q>"] = actions.send_to_qflist + actions.open_qflist,
            ["<M-q>"] = actions.send_selected_to_qflist + actions.open_qflist,
            ["<C-l>"] = actions.complete_tag,
            ["<C-_>"] = actions.which_key,
          },
          n = {
            ["<esc>"] = actions.close,
            ["<CR>"] = actions.select_default,
            ["<C-x>"] = actions.select_horizontal,
            ["<C-v>"] = actions.select_vertical,
            ["<C-t>"] = actions.select_tab,
            ["<Tab>"] = actions.toggle_selection + actions.move_selection_worse,
            ["<S-Tab>"] = actions.toggle_selection + actions.move_selection_better,
            ["<C-q>"] = actions.send_to_qflist + actions.open_qflist,
            ["<M-q>"] = actions.send_selected_to_qflist + actions.open_qflist,
            ["j"] = actions.move_selection_next,
            ["k"] = actions.move_selection_previous,
            ["H"] = actions.move_to_top,
            ["M"] = actions.move_to_middle,
            ["L"] = actions.move_to_bottom,
            ["<Down>"] = actions.move_selection_next,
            ["<Up>"] = actions.move_selection_previous,
            ["gg"] = actions.move_to_top,
            ["G"] = actions.move_to_bottom,
            ["<C-u>"] = actions.preview_scrolling_up,
            ["<C-d>"] = actions.preview_scrolling_down,
            ["<PageUp>"] = actions.results_scrolling_up,
            ["<PageDown>"] = actions.results_scrolling_down,
            ["?"] = actions.which_key,
          },
        },
      },
      
      pickers = {
        find_files = {
          theme = "dropdown",
          previewer = false,
          hidden = true,
        },
        live_grep = {
          theme = "dropdown",
        },
        buffers = {
          theme = "dropdown",
          previewer = false,
          initial_mode = "normal",
        },
      },
      
      extensions = {
        fzf = {
          fuzzy = true,
          override_generic_sorter = true,
          override_file_sorter = true,
          case_mode = "smart_case",
        },
        ["ui-select"] = {
          require("telescope.themes").get_dropdown({}),
        },
      },
    })

    telescope.load_extension("fzf")
    telescope.load_extension("ui-select")
  end,
}
\`\`\`

## Advanced Features

### Treesitter Configuration
- **Syntax Highlighting**: Advanced syntax highlighting for 40+ languages
- **Code Folding**: Smart folding based on syntax structure
- **Text Objects**: Custom text objects for functions, classes, etc.
- **Incremental Selection**: Smart selection expansion
- **Context**: Show current function/class in status line

### Completion System
- **Sources**: LSP, buffer, path, snippets, emoji
- **Intelligent Ranking**: Context-aware completion ranking
- **Snippet Support**: LuaSnip integration with custom snippets
- **Auto-imports**: Automatic import statements
- **Documentation**: Inline documentation in completion menu

### Git Integration
- **Signs**: Line-by-line git status indicators
- **Blame**: Inline git blame information
- **Hunks**: Stage, unstage, and preview hunks
- **Branches**: Branch switching and management
- **LazyGit**: Full-featured git interface

### Terminal Integration
- **Floating Terminal**: Toggle floating terminal
- **Multiple Terminals**: Named terminal instances
- **Persistent Terminals**: Terminals survive session restarts
- **Send to Terminal**: Send code selections to terminal

## Performance Optimizations

### Startup Time
- **Lazy Loading**: Plugins load only when needed
- **Compiled Loader**: Faster module loading
- **Minimal Core**: Only essential plugins at startup
- **Cached Modules**: Module caching for repeated loads

### Runtime Performance
- **Treesitter**: Efficient syntax highlighting
- **LSP Optimizations**: Debounced diagnostics and formatting
- **Buffer Management**: Automatic buffer cleanup
- **Memory Usage**: Optimized memory consumption

### File Handling
- **Large Files**: Special handling for files > 1MB
- **Binary Files**: Automatic detection and handling
- **Encoding**: Proper UTF-8 and multi-byte support
- **Line Endings**: Cross-platform line ending handling

## Customization Guide

### Adding Language Servers
1. Add server to Mason ensure_installed list
2. Create server configuration in servers/ directory
3. Add server-specific keybindings if needed
4. Configure completion sources
5. Add snippets for the language

### Custom Keybindings
- Use \`<leader>\` prefix for custom commands
- Group related commands with consistent prefixes
- Provide which-key descriptions
- Test for conflicts with existing bindings

### Theme Customization
- Override highlight groups in theme files
- Create custom color schemes
- Configure transparent backgrounds
- Adjust contrast and saturation

This ultimate Neovim setup provides a powerful, efficient, and highly customizable development environment that rivals any modern IDE while maintaining the speed and flexibility that Vim users love.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];