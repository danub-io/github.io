param (
    [Parameter(Mandatory=$true)] [string]$Filename,
    [Parameter(Mandatory=$true)] [string]$Title,
    [Parameter(Mandatory=$true)] [string]$Category,
    [Parameter(Mandatory=$true)] [string]$Summary,
    [Parameter(Mandatory=$true)] [string]$Content
)
$date = Get-Date -Format "dd MMM yyyy"
$filePath = "posts/$Filename.html"
$Content | Out-File -FilePath $filePath -Encoding utf8
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
git add .
git commit -m "Novo post: $Title"
git push
Write-Host "✅ Sucesso! Post '$Title' publicado." -ForegroundColor Green
