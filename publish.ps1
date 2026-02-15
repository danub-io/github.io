param (
    [Parameter(Mandatory=$true)] [string]$Filename,
    [Parameter(Mandatory=$true)] [string]$Title,
    [Parameter(Mandatory=$true)] [string]$Category,
    [Parameter(Mandatory=$true)] [string]$Summary,
    [Parameter(Mandatory=$true)] [string]$Content
)
$date = Get-Date -Format "dd MMM yyyy"
$filePath = "posts/$Filename.html"
if (!(Test-Path "posts")) { New-Item -ItemType Directory -Path "posts" }

# Salva o arquivo HTML
$Content | Out-File -FilePath $filePath -Encoding utf8

# Atualiza o posts.json
$jsonPath = "posts.json"
$newPost = [PSCustomObject]@{
    titulo    = $Title
    resumo    = $Summary
    url       = $filePath
    categoria = $Category
    data      = $date
}
if (Test-Path $jsonPath) {
    $currentJson = Get-Content $jsonPath | ConvertFrom-Json
    $updatedJson = @($newPost) + $currentJson
} else {
    $updatedJson = @($newPost)
}
$updatedJson | ConvertTo-Json -Depth 10 | Out-File $jsonPath -Encoding utf8

# Envia para o GitHub
git add .
git commit -m "Post: $Title"
git push
Write-Host "🚀 PUBLICAÇÃO CONCLUÍDA: $Title já está no ar!" -ForegroundColor Cyan
