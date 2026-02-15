param ($Filename, $Title, $Category, $Summary, $Content, $ImageUrl = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000")
$date = Get-Date -Format "dd MMM, yyyy"
$filePath = "posts/$Filename.html"
$postHtml = @"
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$Title | GospelReads</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #01AD9F; --dark: #152035; --text: #747577; }
        body { font-family: 'Mulish', sans-serif; color: var(--text); background: #fff; }
        .content h1, .content h2, .content h3 { color: var(--dark); font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
        .content p { margin-bottom: 1.25rem; line-height: 1.8; }
        .container-post { max-width: 800px; margin: 0 auto; padding: 0 1.5rem; }
    </style>
</head>
<body>
    <header class="py-6 border-b border-gray-100 bg-white sticky top-0 z-50">
        <div class="container-post flex items-center justify-between">
            <a href="../index.html" class="text-2xl font-bold text-[#152035]">Gospel<span class="text-[#01AD9F]">Reads</span></a>
            <a href="../index.html" class="font-bold text-[#152035] hover:text-[#01AD9F]">Início</a>
        </div>
    </header>
    <main class="container-post py-16">
        <article>
            <img src="$ImageUrl" class="w-full h-[450px] object-cover rounded-2xl mb-10 shadow-sm">
            <div class="flex items-center space-x-3 mb-6 text-xs font-bold uppercase tracking-widest text-[#01AD9F]">
                <span>$Category</span> <span class="text-gray-300">•</span> <span class="text-gray-400">$date</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-[#152035] mb-10 leading-tight">$Title</h1>
            <div class="content text-lg">$Content</div>
        </article>
    </main>
    <footer class="bg-[#152035] py-16 mt-20 text-center text-white/60 text-sm">
        <div class="container-post">
            <p>Copyright © 2026 GospelReads. Design fiel ao Bookworm.</p>
        </div>
    </footer>
</body>
</html>
"@
if (!(Test-Path "posts")) { New-Item -ItemType Directory -Path "posts" }
$postHtml | Out-File -FilePath $filePath -Encoding utf8
$newPost = [PSCustomObject]@{titulo=$Title; resumo=$Summary; url=$filePath; categoria=$Category; data=$date; imagem=$ImageUrl}
$jsonPath = "posts.json"
if (Test-Path $jsonPath) {
    $raw = Get-Content $jsonPath -Raw
    $updated = if ([string]::IsNullOrWhiteSpace($raw) -or $raw -eq "[]") { @($newPost) } else { @($newPost) + ($raw | ConvertFrom-Json) }
} else { $updated = @($newPost) }
$updated | ConvertTo-Json -Depth 10 | Out-File $jsonPath -Encoding utf8
git add .
git commit -m "Update design and publish script"
git push origin main
Write-Host "🚀 SUCESSO! O código foi enviado para o GitHub." -ForegroundColor Green
