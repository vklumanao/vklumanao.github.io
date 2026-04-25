param(
  [string]$SourceBranch,
  [string]$TargetBranch = "main",
  [switch]$SkipNpmCi,
  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step([string]$message) {
  Write-Host "[deploy-live] $message"
}

function Stop-LockingProcesses {
  Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
  Get-Process -Name vite -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
}

$repoRoot = (Resolve-Path -LiteralPath ".").Path
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$tempDir = Join-Path $env:TEMP "vklumanao-deploy-$timestamp"
$deployBranch = "deploy-pages-$timestamp"
$stashName = "temp: deploy-live-$timestamp"
$stashCreated = $false
$deployBranchCreated = $false
$originalBranch = $null
$sourceToUse = $null

try {
  Write-Step "Checking repository status"
  $originalBranch = (git branch --show-current).Trim()
  if ([string]::IsNullOrWhiteSpace($originalBranch)) {
    throw "Unable to determine current branch."
  }

  if ([string]::IsNullOrWhiteSpace($SourceBranch)) {
    $sourceToUse = $originalBranch
  } else {
    $sourceToUse = $SourceBranch
  }

  $hasChanges = (git status --porcelain=v1)
  if (-not [string]::IsNullOrWhiteSpace(($hasChanges -join ""))) {
    Write-Step "Stashing local changes"
    git stash push -u -m $stashName | Out-Null
    $stashCreated = $true
  }

  if ($sourceToUse -ne $originalBranch) {
    Write-Step "Switching to source branch '$sourceToUse'"
    git checkout $sourceToUse | Out-Null
  }

  $viteCmdPath = ".\node_modules\.bin\vite.cmd"
  if (-not (Test-Path -LiteralPath $viteCmdPath)) {
    if ($SkipNpmCi) {
      Write-Step "Fast mode requested, but vite is missing. Installing dependencies (npm ci)"
    } else {
      Write-Step "Installing dependencies (npm ci)"
    }
    npm ci
  } elseif (-not $SkipNpmCi) {
    Write-Step "Dependencies already present, skipping npm ci"
  }

  Write-Step "Building production files"
  npm run build

  if (-not (Test-Path -LiteralPath ".\dist\index.html")) {
    throw "Build failed: dist/index.html not found."
  }

  Write-Step "Staging build artifacts"
  New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
  Copy-Item -Path ".\dist\*" -Destination $tempDir -Recurse -Force

  if (-not (Test-Path -LiteralPath (Join-Path $tempDir "index.html"))) {
    throw "Failed to copy build artifacts."
  }

  Write-Step "Fetching remote branches"
  git fetch origin --prune

  Write-Step "Creating deploy branch from origin/$TargetBranch"
  git switch -c $deployBranch "origin/$TargetBranch" | Out-Null
  $deployBranchCreated = $true

  Stop-LockingProcesses
  Start-Sleep -Milliseconds 300

  Write-Step "Replacing branch content with built files"
  Get-ChildItem -LiteralPath $repoRoot -Force |
    Where-Object { $_.Name -ne ".git" } |
    Remove-Item -Recurse -Force

  Get-ChildItem -LiteralPath $tempDir -Force |
    Copy-Item -Destination $repoRoot -Recurse -Force

  New-Item -Path ".\.nojekyll" -ItemType File -Force | Out-Null

  git add -A
  $staged = git diff --cached --name-only
  if ([string]::IsNullOrWhiteSpace(($staged -join ""))) {
    Write-Step "No deploy changes detected (already up to date)"
    return
  }

  $message = "deploy: publish latest portfolio build"
  Write-Step "Committing deploy snapshot"
  git commit -m $message | Out-Null

  if ($DryRun) {
    Write-Step "Dry run enabled: skipping push to origin/$TargetBranch"
  } else {
    Write-Step "Pushing deploy commit to origin/$TargetBranch"
    git push origin "HEAD:$TargetBranch"
  }

  Write-Step "Deploy completed successfully"
}
finally {
  if (-not [string]::IsNullOrWhiteSpace($originalBranch)) {
    try {
      if ((git branch --show-current).Trim() -ne $originalBranch) {
        git checkout $originalBranch | Out-Null
      }
    } catch {}
  }

  if ($stashCreated) {
    try {
      $stashList = git stash list
      if (($stashList | Select-String -SimpleMatch $stashName)) {
        git stash pop | Out-Null
      }
    } catch {}
  }

  if ($deployBranchCreated -and $deployBranch -ne $originalBranch) {
    try {
      $existing = git branch --list $deployBranch
      if (-not [string]::IsNullOrWhiteSpace(($existing -join ""))) {
        git branch -D $deployBranch | Out-Null
      }
    } catch {}
  }

  if (Test-Path -LiteralPath $tempDir) {
    try {
      Remove-Item -LiteralPath $tempDir -Recurse -Force
    } catch {}
  }
}
