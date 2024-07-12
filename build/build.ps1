Param(
    [Parameter(Mandatory=$true)][String]$name,
    [Parameter(Mandatory=$false)][String]$version
    )

# Setting up variables
$libraryPath      = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\source\$name\")
$releasePath      = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\release\")
$zipDestination   = Join-Path -Path $releasePath -ChildPath "$name.zip"
$finalDestination = Join-Path -Path $releasePath -ChildPath "$name.mtlib"

if(($null -eq $version) -Or ("" -eq $version)) {
    if(!(Test-Path -Path $releasePath\$name-latest.txt)) {
        "0.0.1" | Out-File -FilePath $releasePath\$name-latest.txt         
    }
    $version = Get-Content -Path $releasePath\$name-latest.txt
}

# Setting version
if(($null -ne $version) -And ("" -ne $version)) {
    $library = Get-Content -Path "$libraryPath\library.json" -Raw | ConvertFrom-Json
    $library.version = $version
    $library | ConvertTo-Json | Set-Content -Path "$libraryPath\library.json"
}

# Packing library
Compress-Archive -Path $libraryPath\* -DestinationPath "$zipDestination" -Force

if(Test-Path -Path "$finalDestination") {
    Remove-Item -Path "$finalDestination"
}

# Finalizing
Rename-Item -Path "$zipDestination" -NewName $finalDestination -Force

# Writing version to latest file
$version | Out-File -FilePath $releasePath\$name-latest.txt 
