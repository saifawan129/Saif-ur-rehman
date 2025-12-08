$ErrorActionPreference = "Stop"

# 1. Setup Java 17
$javaRoot = "C:\Program Files\Microsoft\jdk-17.0.17.10-hotspot"
if (-not (Test-Path $javaRoot)) {
    Write-Error "Java 17 not found at: $javaRoot"
    exit 1
}

$env:JAVA_HOME = $javaRoot
$env:Path = "$javaRoot\bin;$env:Path"

Write-Host "Using Java: $($env:JAVA_HOME)"
java -version

# 2. Setup Maven
$mvnPath = "C:\Users\warri\.maven\apache-maven-3.9.6\bin\mvn.cmd"
if (-not (Test-Path $mvnPath)) {
    Write-Error "Maven not found at: $mvnPath"
    exit 1
}

Write-Host "Starting Backend..."
Set-Location "backend"

# 3. Run
& $mvnPath spring-boot:run
