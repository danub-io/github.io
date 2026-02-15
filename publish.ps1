param ($Filename, $Title, $Category, $Summary, $Content, $ImageUrl = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000")
$date = Get-Date -Format "dd MMM, yyyy"
$filePath = "posts/$Filename.html"
if (!(Test-Path "posts")) { New-Item -ItemType Directory -Path "posts" }
$Content | Out-File -FilePath $filePath -Encoding utf8
$newPost = [PSCustomObject]@{titulo=$Title; resumo=$Summary; url=$filePath; categoria=$Category; data=$date; imagem=$ImageUrl}
$jsonPath = "posts.json"
if (Test-Path $jsonPath) {
    $raw = Get-Content $jsonPath -Raw
    $updated = if ([string]::IsNullOrWhiteSpace($raw) -or $raw -eq "[]") { @($newPost) } else { @($newPost) + ($raw | ConvertFrom-Json) }
} else { $updated = @($newPost) }
$updated | ConvertTo-Json -Depth 10 | Out-File $jsonPath -Encoding utf8
git add .
git commit -m "Design Bookworm ativado"
git push origin main
Write-Host "✅ TUDO PRONTO E NO GITHUB!" -ForegroundColor Green
