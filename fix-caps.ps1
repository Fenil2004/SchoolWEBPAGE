Get-ChildItem -Path . -Recurse -Include *.jsx,*.js -File | Where-Object { $_.FullName -notmatch 'node_modules|\.next' } | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'angelsschooldeesa') {
        $newContent = $content `
            -replace '(?<![a-zA-Z])angelsschooldeesa(?![a-zA-Z])', 'AngelsSchooldeesa' `
            -replace '@angelsschooldeesa\.co\.in', '@angelsschooldeesa.co.in'
        
        if ($newContent -ne $content) {
            Set-Content -Path $_.FullName -Value $newContent -NoNewline
            Write-Host "Fixed: $($_.FullName)"
        }
    }
}
Write-Host "Done!"
