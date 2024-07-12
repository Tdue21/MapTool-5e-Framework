Param([Parameter(Mandatory=$true)][String]$name)

# Setting up variables
$libraryPath = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\source\")
$releasePath = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\release\")
$version = "0.0.1"

# Create add-on file contents
[hashtable]$library = @{
    name = $name
    version = $version
    website = ""
    gitUrl = ""
    authors = @([System.Environment]::UserName)
    license = "MIT/GPL/etc"
    namespace = "org.maptool.$([System.Environment]::UserName).$name"
    description = "A longer description of your add-on library"
    shortDescription = "A short description of your add-on library"
    allowsUriAccess = $true
    licenseFile = "license.txt"
    readMeFile = "readme.md"
}

[hashtable]$events = @{
    events = @(
        @{ 
            name = "onFirstInit" 
            mts = "onFirstInit"
        }, 
        @{
            name = "onInit"
            mts = "onInit"
        })
    legacyEvents = @()
}
New-Item -ItemType Directory -Path $libraryPath\$name\library\mtscript\events,$libraryPath\$name\library\mtscript\public,$libraryPath\$name\library\public
New-Item -ItemType File -Path $libraryPath\$name\library\mtscript\events\onInit.mts,$libraryPath\$name\library\mtscript\events\onFirstInit.mts
New-Item -ItemType File -Path $libraryPath\$name\events.json -Value ($events | ConvertTo-Json)
New-Item -ItemType File -Path $libraryPath\$name\library.json -Value ($library | ConvertTo-Json)

# Writing version to latest file
$version | Out-File -FilePath $releasePath\$name-latest.txt 
