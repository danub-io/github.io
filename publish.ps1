param ($Filename, $Title, $Category, $Summary, $Content, $ImageUrl = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000")
$date = Get-Date -Format "dd MMM, yyyy"
$filePath = "posts/$Filename.html"
$html = @"
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$Title | GospelReads</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Mulish', sans-serif; color: #747577; }</style>
</head>
<body class="bg-white text-gray-800">
    <header class="py-6 border-b border-gray-100 mb-12"><div class="container mx-auto px-4 max-w-[800px]"><a href="../index.html" class="text-2xl font-bold text-[#152035]">Gospel<span class="text-[#01AD9F]">Reads</span></a></div></header>
    <article class="container mx-auto px-4 max-w-[800px]">
        <img src="$ImageUrl" class="w-full h-96 object-cover rounded-xl mb-10">
        <div class="flex items-center space-x-3 mb-6 text-xs font-bold uppercase text-[#01AD9F]"><span>$Category</span> <span>•</span> <span>$date</span></div>
        <h1 class="text-4xl font-bold text-[#152035] mb-8 leading-tight">$Title</h1>
        <div class="prose prose-lg max-w-none leading-relaxed text-[#747577]">$Content</div>
    </article>
    <footer class="bg-[#152035] py-12 mt-20 text-center text-white/50 text-sm"><p>GospelReads © 2026</p></footer>
</body>
</html>
"@
if (!(Test-Path "posts")) { New-Item -ItemType Directory -Path "posts" }
$html | Out-File -FilePath $filePath -Encoding utf8
$newPost = [PSCustomObject]@{titulo=$Title; resumo=$Summary; url=$filePath; categoria=$Category; data=$date; imagem=$ImageUrl}
$jsonPath = "posts.json"
if (Test-Path $jsonPath) { $raw = Get-Content $jsonPath -Raw; $updated = if ([string]::IsNullOrWhiteSpace($raw) -or $raw -eq "[]") { @($newPost) } else { @($newPost) + ($raw | ConvertFrom-Json) } } else { $updated = @($newPost) }
$updated | ConvertTo-Json -Depth 10 | Out-File $jsonPath -Encoding utf8
Write-Host "✅ Post gerado localmente. Execute o comando de envio ao GitHub agora." -ForegroundColor Green
